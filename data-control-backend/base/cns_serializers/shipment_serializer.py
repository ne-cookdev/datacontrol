import random

from rest_framework import serializers

from .carrier_serializer import CarrierSerializer
from .order_serializer import OrderSerializer
from ..models import Shipment, Order, Carrier


class ShipmentSerializer(serializers.ModelSerializer):
    order_id = serializers.PrimaryKeyRelatedField(
        queryset=Order.objects.all(), source='order', write_only=True
    )
    order = OrderSerializer(read_only=True)
    carrier_id = serializers.PrimaryKeyRelatedField(
        queryset=Carrier.objects.all(), source='carrier', write_only=True
    )
    carrier = CarrierSerializer(read_only=True)

    class Meta:
        model = Shipment
        fields = '__all__'
        extra_kwargs = {'tracking_number': {'read_only': True}, }

    def create(self, validated_data):
        order = validated_data.get('order')
        if Shipment.objects.filter(order=order).exists():
            raise serializers.ValidationError({"ValidationError": f"Shipment for {str(order)} already exist!"})

        tracking_number = random.randint(1000, 999999)
        shipment = Shipment.objects.create(tracking_number=tracking_number, **validated_data)
        order.status = Order.Status.ON_THE_WAY
        order.save()
        return shipment

    def update(self, instance, validated_data):
        status = validated_data.get('status', None)
        if status is not None:
            if status == 1:
                instance.order.status = Order.Status.ON_THE_WAY
            if status == 2:
                instance.order.status = Order.Status.SHIPPED
        instance.status = validated_data.get('status', instance.status)
        instance.carrier = validated_data.get('carrier', instance.carrier)
        instance.save()
        return instance
