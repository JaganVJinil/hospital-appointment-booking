from adminapp import views
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token



urlpatterns = [
    path('', views.adminlogin, name="adminlogin"),
    path('appointments/', views.appointments, name="appointments"),
    path('doctorlist/', views.doctorlist, name="doctorlist"),
    path('reportspage/', views.reportspage, name="reportspage"),
    path('adddoctor/', views.adddoctor, name="adddoctor"),
    path('deletedoctor/<int:id>/', views.deletedoctor, name='deletedoctor'),
    path('doctorview/<int:id>/', views.doctorview, name="doctorview"),
    path('editdoctor/<int:id>/', views.editdoctor, name="editdoctor"),
    path('patientlist/', views.patientlist, name="patientlist"),
    path('patientview/<int:id>/', views.patientview, name='patientview'),
    path('history/<int:patient_id>/', views.history, name="history"),
    path('logout/', views.Logout, name='logout'),

    
    
    
    path('signup/', views.Signup, name="signup"),
    path('login/', views.Login, name="login"),
    path('changepassword/', views.change_password, name="change_password"),
    path('logout/', views.Logout, name='logout'),
    path('list_doctors/', views.list_doctors, name='retrievedoctors'),
    path('add_doctor/', views.add_doctor, name='add_doctor'),
    path('book-appointment/', views.book_appointment, name='book_appointment'),
    path('list_appointment/', views.list_appointment, name='retrieveappointment'),
    path('cancel_appointment/<int:id>/', views.CancelAppointment, name='cancel_appointment'),
    path('profile/', views.user_profile, name='user-profile'),]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
