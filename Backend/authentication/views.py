from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .serializers import UserRegSerializer, OTPVerificationSerializer
from .models import EmailVerification
from django.contrib.auth import get_user_model

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        # Detailed validation
        if not serializer.is_valid():
            print("Validation Errors:", serializer.errors)
            return Response({
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save()
        return Response({
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }, status=status.HTTP_201_CREATED)

class SendOTPView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        
        try:
            user = get_user_model().objects.get(email=email)
            
            verification, created = EmailVerification.objects.get_or_create(user=user)
            otp = verification.generate_otp()
            
            send_mail(
                'Email Verification OTP',
                f'Your OTP is: {otp}. It will expire in 15 minutes.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({
                'message': 'OTP sent successfully',
                'email': email
            }, status=status.HTTP_200_OK)
        
        except get_user_model().DoesNotExist:
            return Response({
                'error': 'User with this email does not exist'
            }, status=status.HTTP_404_NOT_FOUND)

class VerifyOTPView(generics.CreateAPIView):
    serializer_class = OTPVerificationSerializer
    permission_classes = [AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = get_user_model().objects.get(email=email)
            
            verification = EmailVerification.objects.get(user=user)
            verification.is_verified = True
            verification.save()
            
            return Response({
                'message': 'Email verified successfully'
            }, status=status.HTTP_200_OK)
        
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )