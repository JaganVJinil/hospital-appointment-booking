from rest_framework import serializers
from adminapp.models import DoctorList, Appointment

class DoctorSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = DoctorList
        fields = ['id', 'name', 'department', 'qualification', 'experience', 'image']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url'):
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'date', 'time', 'doctor', 'user']
