from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser, EmailVerification
from django.contrib.auth import get_user_model


class UserRegSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email',  'password', 'password2')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "password fields didn't match"}

            )
        return attrs
    

    def create(self, validated_data):
        validated_data.pop('password2')
        
        user = CustomUser.objects.create_user(
            username=validated_data['email'], 
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user
    


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    
    def validate(self, data):
        try:
            user = get_user_model().objects.get(email=data['email'])
            verification = EmailVerification.objects.get(user=user)
            
            if not verification.is_otp_valid():
                raise serializers.ValidationError("OTP has expired")
            
            if verification.otp != data['otp']:
                raise serializers.ValidationError("Invalid OTP")
            
            return data
        except get_user_model().DoesNotExist:
            raise serializers.ValidationError("User not found")
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("No OTP request found")