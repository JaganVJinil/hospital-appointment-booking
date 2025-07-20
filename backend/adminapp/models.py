from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):  # user_side
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):  # admin_side
        user = self.create_user(email, password)
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):  # adding more fields
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    
    # ✅ New Fields
    dob = models.DateField(null=True, blank=True)  # Date of Birth
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], null=True, blank=True)
    contact_no = models.CharField(max_length=15, null=True, blank=True)  # Phone number
    address = models.TextField(null=True, blank=True)  # User's address

    # Permissions and status
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

class DoctorList(models.Model):
    name = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    qualification = models.CharField(max_length=255)
    image = models.FileField(upload_to='images/', null=True, blank=True)
    experience = models.IntegerField()

    def __str__(self):
        return self.name
    
class Appointment(models.Model):
    doctor = models.ForeignKey(DoctorList, on_delete=models.CASCADE, related_name='appointments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments')
    date = models.DateTimeField()
    time = models.TimeField()
    
    def __str__(self):
        return f"Appointment with Dr. {self.doctor.name} on {self.date} at {self.time}"
    

    

