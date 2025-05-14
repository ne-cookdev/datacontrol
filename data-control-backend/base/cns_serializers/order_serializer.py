import random

from rest_framework import serializers

from .sharing_serializers import _ProductCardInfoSerializer, _UserSerializer
from ..models import Order, OrderDetails, Product


class _OrderDetailsInOrderSerializer(serializers.ModelSerializer):
    product = _ProductCardInfoSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = OrderDetails
        exclude = ['id', 'order']


class OrderSerializer(serializers.ModelSerializer):
    order_details = _OrderDetailsInOrderSerializer(many=True, required=True)
    user = _UserSerializer(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        extra_kwargs = {
            'number': {'required': True, 'read_only': True},
            'address': {'required': True},
            'order_date': {'read_only': True},
        }

    def create(self, validated_data):
        products_list = validated_data.pop('order_details', [])
        if not products_list:
            raise serializers.ValidationError({"ValidationError": "Order must have at least 1 product."})
        filtered_product_list = [
            (p['product'], p['quantity']) for p in products_list if 'product' in p and 'quantity' in p
        ]
        number = random.randint(1000, 999999)
        order = Order.objects.create(number=number, **validated_data)
        od_entries = [
            OrderDetails(
                order=order,
                product=p,
                quantity=q,
                price_at_order=p.price
            ) for p, q in filtered_product_list
        ]
        OrderDetails.objects.bulk_create(od_entries)
        return order

    def update(self, instance, validated_data):
        products_list = validated_data.pop('order_details', None)
        if products_list is not None:
            if not products_list:
                raise serializers.ValidationError({"ValidationError": "Order must have at least 1 product."})
            filtered_product_list = [
                (p['product'], p['quantity']) for p in products_list if 'product' in p and 'quantity' in p
            ]
            OrderDetails.objects.filter(order=instance).delete()
            od_entries = [
                OrderDetails(
                    order=instance,
                    product=p,
                    quantity=q,
                    price_at_order=p.price
                ) for p, q in filtered_product_list
            ]
            OrderDetails.objects.bulk_create(od_entries)
        instance.status = validated_data.get('status', instance.status)
        instance.address = validated_data.get('address', instance.address)

        instance.save()
        return instance
