from django.contrib.auth import get_user_model
from rest_framework import serializers

from base.models import Product, Stock


User = get_user_model()


class _ProductCardInfoSerializer(serializers.ModelSerializer):
    all_quantity = serializers.SerializerMethodField(read_only=True, method_name='get_all_quantity')

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'image_ref', 'all_quantity']
        extra_kwargs = {
            'name': {'read_only': True},
            'description': {'read_only': True},
            'image_ref': {'read_only': True},
        }

    def get_all_quantity(self, product_obj):
        all_quantity = sum([s.quantity for s in Stock.objects.filter(product=product_obj)])
        return all_quantity


class _UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email']
