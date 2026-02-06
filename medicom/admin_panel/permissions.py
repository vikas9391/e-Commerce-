from typing import Any
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.views import APIView


class IsSuperUserOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow superusers or staff members to access admin panel.
    """
    
    def has_permission(self, request: Request, view: APIView) -> bool:
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_superuser or request.user.is_staff)
        )


class IsSuperUserOnly(permissions.BasePermission):
    """
    Custom permission to only allow superusers.
    """
    
    def has_permission(self, request: Request, view: APIView) -> bool:
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.is_superuser
        )