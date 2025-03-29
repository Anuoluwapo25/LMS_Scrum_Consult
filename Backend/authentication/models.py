from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.utils import timezone
import random
import string
from django.db import models


class CustomUser(AbstractUser):
    first_name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=50)
    email=models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


    def __str__(self):
        return self.email



class EmailVerification(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    
    def generate_otp(self):
        """Generate a 6-digit OTP"""
        self.otp = ''.join(random.choices(string.digits, k=6))
        self.created_at = timezone.now()
        self.is_verified = False
        self.save()
        return self.otp
    
    def is_otp_valid(self):
        """Check if OTP is still valid (15 minutes)"""
        if self.is_verified:
            return False
        
        time_elapsed = timezone.now() - self.created_at
        return time_elapsed.total_seconds() < 900  # 15 minutes
    

    
