from rest_framework import serializers

from ..models import OrderDetails


class OrderDetailsSerializer(serializers.ModelSerializer):
    quantity = serializers.IntegerField(required=True, min_value=0)

    class Meta:
        model = OrderDetails
        fields = '__all__'
        extra_kwargs = {
            'name': {'read_only': True},
            'price_at_order': {'read_only': True},
        }
