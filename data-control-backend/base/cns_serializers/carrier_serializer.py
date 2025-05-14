from rest_framework import serializers

from ..models import Carrier


class CarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrier
        fields = '__all__'
        extra_kwargs = {'name': {'required': True}, }
