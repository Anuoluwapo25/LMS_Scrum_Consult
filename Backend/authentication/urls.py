from django.urls import path
from .views import UserRegistrationView, SendOTPView, VerifyOTPView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('send-otp/', SendOTPView.as_view(), name='send-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
]