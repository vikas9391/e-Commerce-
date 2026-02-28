from .models import Category, Product, Review, ContactMessage, FAQ


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    list_editable = ('status',)
    ordering = ('-created_at',)

    fieldsets = (
        ('Sender Info', {'fields': ('name', 'email')}),
        ('Message',     {'fields': ('subject', 'message')}),
        ('Status',      {'fields': ('status', 'created_at')}),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order', 'is_active', 'created_at')
    list_filter = ('category', 'is_active')
    search_fields = ('question', 'answer')
    list_editable = ('order', 'is_active')
    ordering = ('category', 'order')