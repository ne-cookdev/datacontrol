from rest_framework import serializers

from .product_serializer import ProductSerializer
from .warehouse_serializer import WarehouseSerializer
from ..models import Warehouse, Product, Stock


class StockSerializer(serializers.ModelSerializer):
    warehouse_id = serializers.PrimaryKeyRelatedField(
        queryset=Warehouse.objects.all(), source='warehouse', write_only=True
    )
    warehouse = WarehouseSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Stock
        fields = '__all__'
        extra_kwargs = {'quantity': {'required': True}, }
