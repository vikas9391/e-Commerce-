import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ExtractedMedicine {
  name: string;
  confidence: number;
}

const PrescriptionUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [extractedMedicines, setExtractedMedicines] = useState<ExtractedMedicine[]>([]);
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [notFoundMedicines, setNotFoundMedicines] = useState<string[]>([]);
  const [uploadStep, setUploadStep] = useState<'upload' | 'processing' | 'results'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (JPG, PNG, etc.)');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUploadStep('upload');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Simulated OCR function - In production, you'd use a real OCR service like Tesseract.js or a backend API
  const extractTextFromImage = async (file: File): Promise<string> => {
    // This is a simulation. In a real app, you would:
    // 1. Use Tesseract.js for client-side OCR
    // 2. Send to backend API that uses Google Vision API, AWS Textract, or Azure OCR
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated extracted text from prescription
        const simulatedText = `
          Dr. John Smith, M.D.
          Medical Center Hospital
          
          Patient: Jane Doe
          Date: ${new Date().toLocaleDateString()}
          
          Rx:
          1. Paracetamol 500mg - Take 1 tablet twice daily
          2. Amoxicillin 250mg - Take 1 capsule three times daily for 7 days
          3. Ibuprofen 400mg - Take as needed for pain
          4. Cetirizine 10mg - Take 1 tablet once daily
          5. Vitamin D3 1000IU - Take 1 tablet daily
          
          Signature: Dr. John Smith
        `;
        resolve(simulatedText);
      }, 2000);
    });
  };

  // Extract medicine names from text using pattern matching
  const extractMedicineNames = (text: string): ExtractedMedicine[] => {
    const medicinePatterns = [
      // Pattern 1: Medicine name followed by dosage
      /(\w+(?:\s+\w+)?)\s+\d+\s*(?:mg|mcg|g|ml|iu)/gi,
      // Pattern 2: Medicine names in numbered lists
      /\d+\.\s*([A-Z][a-z]+(?:\s+[A-Z]?\d*)?)/g,
    ];

    const medicines = new Set<string>();
    
    medicinePatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const medicineName = match[1].trim();
        // Filter out common non-medicine words
        if (medicineName.length > 2 && 
            !['Take', 'tablet', 'capsule', 'Patient', 'Date', 'Signature'].includes(medicineName)) {
          medicines.add(medicineName);
        }
      }
    });

    return Array.from(medicines).map(name => ({
      name,
      confidence: 0.85 + Math.random() * 0.15, // Simulated confidence score
    }));
  };

  // FIXED: Search for medicines in the database with better matching
  const searchMedicines = async (medicineNames: string[]) => {
    const found: Product[] = [];
    const notFound: string[] = [];

    for (const medicineName of medicineNames) {
      try {
        // Search in the products database - get more results to find better matches
        const response = await productsAPI.getAll({ 
          search: medicineName,
          page_size: 5  // Get up to 5 results to find best match
        });

        if (response.data.results && response.data.results.length > 0) {
          // Find the best matching product
          let bestMatch: Product | null = null;
          let bestMatchScore = 0;

          for (const product of response.data.results) {
            const productNameLower = product.name.toLowerCase();
            const medicineNameLower = medicineName.toLowerCase();

            // Calculate match score
            let score = 0;

            // Exact match gets highest score
            if (productNameLower === medicineNameLower) {
              score = 100;
            }
            // Product name starts with medicine name
            else if (productNameLower.startsWith(medicineNameLower)) {
              score = 90;
            }
            // Product name contains medicine name
            else if (productNameLower.includes(medicineNameLower)) {
              score = 80;
            }
            // Medicine name contains product name
            else if (medicineNameLower.includes(productNameLower)) {
              score = 70;
            }
            // Check word-by-word match
            else {
              const productWords = productNameLower.split(/\s+/);
              const medicineWords = medicineNameLower.split(/\s+/);
              const matchingWords = productWords.filter(word => 
                medicineWords.some(mWord => 
                  word.includes(mWord) || mWord.includes(word)
                )
              );
              score = (matchingWords.length / Math.max(productWords.length, medicineWords.length)) * 60;
            }

            // Update best match if this is better
            if (score > bestMatchScore && score >= 60) { // Minimum 60% match required
              bestMatchScore = score;
              bestMatch = product;
            }
          }

          // Add best match if found and not already in the list
          if (bestMatch && !found.find(p => p.id === bestMatch!.id)) {
            found.push(bestMatch);
          } else if (!bestMatch) {
            notFound.push(medicineName);
          }
        } else {
          notFound.push(medicineName);
        }
      } catch (error) {
        console.error(`Error searching for ${medicineName}:`, error);
        notFound.push(medicineName);
      }
    }

    return { found, notFound };
  };

  const handleProcessPrescription = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setUploadStep('processing');

    try {
      // Step 1: Extract text from image
      const text = await extractTextFromImage(selectedFile);
      setExtractedText(text);

      // Step 2: Extract medicine names from text
      const medicines = extractMedicineNames(text);
      setExtractedMedicines(medicines);

      // Step 3: Search for medicines in database
      const { found, notFound } = await searchMedicines(medicines.map(m => m.name));
      setFoundProducts(found);
      setNotFoundMedicines(notFound);

      setUploadStep('results');
    } catch (error) {
      console.error('Error processing prescription:', error);
      alert('Error processing prescription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedText('');
    setExtractedMedicines([]);
    setFoundProducts([]);
    setNotFoundMedicines([]);
    setUploadStep('upload');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-3 sm:mb-4">
            Upload Prescription
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Upload your prescription and we'll automatically find the medicines for you
          </p>
        </div>

        {/* Upload Section */}
        {uploadStep === 'upload' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              {/* File Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-blue-300 rounded-xl p-8 sm:p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-blue-50/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {previewUrl ? (
                  <div className="space-y-4">
                    <img
                      src={previewUrl}
                      alt="Prescription preview"
                      className="max-h-64 sm:max-h-96 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div>
                      <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        Drop your prescription here
                      </p>
                      <p className="text-sm sm:text-base text-gray-600">
                        or click to browse files
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Supports: JPG, PNG, JPEG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Process Button */}
              {selectedFile && (
                <div className="mt-6">
                  <button
                    onClick={handleProcessPrescription}
                    disabled={isProcessing}
                    className="w-full py-3 sm:py-4 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Find Medicines
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Upload Prescription</h3>
                    <p className="text-sm text-gray-600">Take a clear photo of your prescription or upload an existing image</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Automatic Detection</h3>
                    <p className="text-sm text-gray-600">Our system automatically reads and extracts medicine names from your prescription</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Find & Order</h3>
                    <p className="text-sm text-gray-600">Review available medicines and add them to your cart with one click</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing Section */}
        {uploadStep === 'processing' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="loading-spinner mx-auto mb-6"></div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-4">
                Processing Your Prescription
              </h2>
              <p className="text-gray-600">
                Extracting medicine names and searching our database...
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {uploadStep === 'results' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-heading font-bold text-base transition-all duration-300 hover:bg-blue-50"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Another
              </button>
              {foundProducts.length > 0 && (
                <Link
                  to="/cart"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-base transition-all duration-300 hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  View Cart
                </Link>
              )}
            </div>

            {/* Extracted Medicines */}
            {extractedMedicines.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-4">
                  Detected Medicines
                </h2>
                <div className="flex flex-wrap gap-2">
                  {extractedMedicines.map((med, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm"
                    >
                      {med.name}
                      <span className="text-xs opacity-75">
                        {(med.confidence * 100).toFixed(0)}%
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Found Products */}
            {foundProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">
                    Available Medicines ({foundProducts.length})
                  </h2>
                  <div className="flex items-center gap-2 text-green-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-semibold text-sm">In Stock</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {foundProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {/* Not Found Medicines */}
            {notFoundMedicines.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-2">
                      Not Available
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">
                      The following medicines were not found in our inventory. Please contact us for assistance.
                    </p>
                    <div className="space-y-2">
                      {notFoundMedicines.map((medicine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{medicine}</span>
                          <Link
                            to="/contact"
                            className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm whitespace-nowrap"
                          >
                            Contact Us
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {foundProducts.length === 0 && notFoundMedicines.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900 mb-2">
                  No Medicines Detected
                </h2>
                <p className="text-gray-600 mb-6">
                  We couldn't detect any medicines from the prescription. Please try uploading a clearer image.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-heading font-bold text-base transition-all duration-300 hover:shadow-lg"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Safety Notice */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-blue-900 mb-1">Important Notice</p>
                <p className="text-blue-800">
                  Always consult your healthcare provider before taking any medication. This service is for convenience only and does not replace professional medical advice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionUpload;