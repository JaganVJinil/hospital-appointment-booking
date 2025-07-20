from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse
from .models import User  # Your custom user model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from adminapp.models import DoctorList, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from datetime import date
# ---------------------------------------------------------------------------------------------
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Appointment  
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import DoctorList
from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from adminapp.models import DoctorList
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from .models import Appointment
from django.shortcuts import get_object_or_404, render
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import Appointment
from django.shortcuts import render
from django.db.models import Count
from .models import Appointment
from datetime import datetime


def adminlogin(request):
    error = ""
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None and user.is_admin:
            login(request, user)
            return redirect('appointments')
        else:
            error = "Invalid credentials or not a superuser"
    return render(request, 'adminlogin.html', {'error': error})



from django.contrib.auth import logout
from django.shortcuts import redirect


def Logout(request):
    logout(request)
    return redirect('adminlogin')  # redirect to your login page or any page you want

# ---------------------------------------------------------------------------------------------


@login_required(login_url='adminlogin')
@never_cache
def appointments(request):
    date_filter = request.GET.get('dateFilter')
    if date_filter:
        appointments = Appointment.objects.filter(date=date_filter)
    else:
        appointments = Appointment.objects.all()

    context = {
        'appointments': appointments
    }
    return render(request, 'appointments.html', context)

# ---------------------------------------------------------------------------------------------


@login_required(login_url='adminlogin')
@never_cache
def doctorlist(request):
    department_filter = request.GET.get('department', '')
    doctors = DoctorList.objects.all()

    if department_filter:
        doctors = doctors.filter(department=department_filter)

    doctors = doctors.order_by('id')  
    paginator = Paginator(doctors, 5) 
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    departments = DoctorList.objects.values_list('department', flat=True).distinct()

    return render(request, 'doctorlist.html', {
        'page_obj': page_obj,
        'departments': departments,
        'selected_department': department_filter,
    })

# ---------------------------------------------------------------------------------------------




@login_required(login_url='adminlogin')
@never_cache
def reportspage(request):
    selected_month = request.GET.get('monthFilter')  # e.g., "January"
    appointments = Appointment.objects.all()

    if selected_month:
        try:
            month_number = datetime.strptime(selected_month, "%B").month
            appointments = appointments.filter(date__month=month_number)
        except ValueError:
            pass

    doctor_report = (
        appointments.values('doctor__name')
        .annotate(count=Count('id'))
        .order_by('-count')
    )

    months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]

    context = {
        'doctor_report': doctor_report,
        'selected_month': selected_month,
        'months': months
    }

    return render(request, 'reportspage.html', context)


# ---------------------------------------------------------------------------------------------



def adddoctor(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        department = request.POST.get('department')
        qualification = request.POST.get('qualification')
        experience = request.POST.get('experience')
        image = request.FILES.get('image')

        DoctorList.objects.create(
            name=name,
            department=department,
            qualification=qualification,
            experience=experience,
            image=image
        )
        return redirect('doctorlist')  

    return render(request, 'adddoctor.html')


# ---------------------------------------------------------------------------------------------



@login_required
def doctorview(request, id):
    doctor = get_object_or_404(DoctorList, id=id)
    return render(request, 'doctorview.html', {'doctor': doctor})

# ---------------------------------------------------------------------------------------------




@login_required
def editdoctor(request, id):
    doctor = get_object_or_404(DoctorList, id=id)

    if request.method == 'POST':
        name = request.POST.get('name')
        department = request.POST.get('department')
        qualification = request.POST.get('qualification')
        experience = request.POST.get('experience')
        image = request.FILES.get('image')

      
        doctor.name = name
        doctor.department = department
        doctor.qualification = qualification
        doctor.experience = experience

        if image:
            doctor.image = image  

        doctor.save()
        return redirect('doctorview', id=doctor.id)

    context = {
        'doctor': doctor
    }
    return render(request, 'editdoctor.html', context)
# ---------------------------------------------------------------------------------------------


@login_required
def patientlist(request):
    patients = User.objects.filter(is_admin=False)
    context = {'patients': patients}
    return render(request, 'patientlist.html', context)

# ---------------------------------------------------------------------------------------------



from django.shortcuts import get_object_or_404, render
from .models import Appointment, User

def patientview(request, id):
    # Get the patient object or show 404 if not found
    patient = get_object_or_404(User, id=id)  # Removed is_patient filter

    # Get all appointments for this patient
    appointments = Appointment.objects.filter(user=patient).order_by('-date', '-time')
    # Assuming Appointment model links to User via 'user' field

    context = {
        'patient': patient,
        'appointments': appointments
    }
    return render(request, 'patientview.html', context)





# ---------------------------------------------------------------------------------------------





User = get_user_model()

@login_required
def history(request, patient_id):
    # Get the specific user (patient)
    patient = get_object_or_404(User, id=patient_id)

    now = timezone.now().date()

    # Filter appointments for that user
    upcoming_appointments = Appointment.objects.filter(user=patient, date__gte=now).order_by('date', 'time')
    past_appointments = Appointment.objects.filter(user=patient, date__lt=now).order_by('-date', '-time')

    context = {
        'patient': patient,
        'upcoming_appointments': upcoming_appointments,
        'past_appointments': past_appointments,
    }

    return render(request, 'history.html', context)



# ---------------------------------------------------------------------------------------------



def deletedoctor(request, id):
    doctor = get_object_or_404(DoctorList, id=id)
    if request.method == "POST":
        doctor.delete()
        return redirect('doctorlist')
    return render(request, 'deletedoctor.html', {'doctor': doctor})

# ---------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------

#Signup

@csrf_exempt
@api_view(['POST'])
@permission_classes((AllowAny,))
def Signup(request):
    
    email = request.data.get("email")
    password = request.data.get("password")
    name = request.data.get("name")
    dob = request.data.get("dob")             
    gender = request.data.get("gender")
    address = request.data.get("address")
    contact_no = request.data.get("contact_no")
    
    print(email, password, name, dob, gender, address, contact_no)
    
    if not all([email, password, name, dob, gender, address, contact_no]):
        return Response({'message': 'All fields are required'}, status=400)


    
    if User.objects.filter(email=email).exists():
        return JsonResponse({'message': 'Email already exists'}, status=400)

    
    user = User.objects.create_user(email=email, password=password)
    user.name = name
    user.dob = dob
    user.gender = gender
    user.address = address
    user.contact_no = contact_no
    user.save()

    return JsonResponse({'message': 'User created successfully'}, status=200)

#Login

@api_view(['POST'])
@permission_classes((AllowAny,))
def Login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'message': 'Email and password are required'}, status=400)

    
    user = authenticate(request, email=email, password=password)

    if user is None:
        return Response({'message': 'Invalid email or password'}, status=401)

    if not user.is_active:
        return Response({'message': 'User account is disabled'}, status=403)
    
    token, created = Token.objects.get_or_create(user=user)

    
    return JsonResponse({
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'token': token.key,
            'name' : user.name,
            'email': user.email
        }
    }, status=200)
    
    
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import authenticate

#channge_password

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user  

    current_password = request.data.get('old_password')
    new_password = request.data.get('new_password')
    confirm_password = request.data.get('confirm_password')
    print(current_password,new_password,confirm_password)

    
    if not current_password or not new_password or not confirm_password:
        return Response({'message': 'All fields are required'}, status=400)

    
    if not user.check_password(current_password):
        return Response({'message': 'Current password is incorrect'}, status=400)

    
    if new_password != confirm_password:
        return Response({'message': 'New passwords do not match'}, status=400)

    
    user.set_password(new_password)
    user.save()

    return Response({'message': 'Password changed successfully'}, status=200)

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

#Logout

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Logout(request):
    try:
        # Delete the user's token to log them out
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'}, status=200)
    except Exception as e:
        return Response({'message': 'Error during logout'}, status=500)
    
    
    


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def list_doctors(request):
    doctors = DoctorList.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def book_appointment(request):
    doctor_id = request.data.get('doctor')
    user_id = request.data.get('user')
    date = request.data.get('date')
    time = request.data.get('time')

    if not all([doctor_id, user_id, date, time]):
        return Response({'message': 'All fields are required'}, status=400)

    try:
        doctor = DoctorList.objects.get(id=doctor_id)
        user = User.objects.get(id=user_id)
    except (DoctorList.DoesNotExist, User.DoesNotExist):
        return Response({'message': 'Doctor or User not found'}, status=404)

    appointment = Appointment.objects.create(
        doctor=doctor,
        user=user,
        date=date,
        time=time
    )

    return Response({'message': 'Appointment booked successfully', 'appointment_id': appointment.id}, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_appointment(request):
    appointment_type = request.query_params.get('type', 'upcoming')  

    if appointment_type == 'past':
        appointments = Appointment.objects.filter(user=request.user, date__lt=date.today()).order_by('-date')
    else:
        appointments = Appointment.objects.filter(user=request.user, date__gte=date.today()).order_by('date')

    serializer = AppointmentSerializer(appointments, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def add_doctor(request):
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Doctor added successfully', 'doctor': serializer.data}, status=201)
    return Response(serializer.errors, status=400)


@csrf_exempt
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CancelAppointment(request, id):
    user = request.user

    try:
        appointment = Appointment.objects.get(id=id, user=user)
    except Appointment.DoesNotExist:
        return JsonResponse({'message': 'Appointment not found for this user'}, status=404)

    appointment.delete()
    return JsonResponse({'message': 'Appointment cancelled successfully'}, status=200)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    data = {
        'id': user.id,
        'username': user.email,  # since email is USERNAME_FIELD
        'email': user.email,
        'name': user.name,  # your custom name field
        'dob': user.dob,
        'gender': user.gender,
        'contact_no': user.contact_no,
        'address': user.address,
    }
    return Response(data)







