from rest_framework import serializers

from .product_serializer import ProductSerializer
from ..models import Warehouse, Product, Stock


class _SetProductsInWarehouse(serializers.Serializer):
    product_id = serializers.PrimaryKeyRelatedField(required=True, queryset=Product.objects.all(), source='product')
    quantity = serializers.IntegerField(required=True, min_value=0)


class _StockSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Stock
        fields = ['product', 'quantity']


class WarehouseSerializer(serializers.ModelSerializer):
    stocks = _StockSerializer(read_only=True, many=True)
    products_list = _SetProductsInWarehouse(required=False, write_only=True, many=True)

    class Meta:
        model = Warehouse
        fields = '__all__'
        extra_kwargs = {
            'name': {'required': True},
            'location': {'required': True},
        }

    def create(self, validated_data):
        products_list = validated_data.pop('products_list', [])
        warehouse = Warehouse.objects.create(**validated_data)
        stock_entries = [
            Stock(
                warehouse=warehouse,
                product=p['product'],
                quantity=p['quantity'],
            ) for p in products_list
        ]
        Stock.objects.bulk_create(stock_entries)
        return warehouse

    def update(self, instance, validated_data):
        products_list = validated_data.pop('products_list', None)
        if products_list is not None:
            filtered_product_list = [
                (p['product'], p['quantity']) for p in products_list if 'product' in p and 'quantity' in p
            ]
            Stock.objects.filter(warehouse=instance).delete()
            stock_entries = [
                Stock(
                    warehouse=instance,
                    product=product,
                    quantity=quantity,
                ) for product, quantity in filtered_product_list
            ]
            Stock.objects.bulk_create(stock_entries)
        instance.name = validated_data.get('name', instance.name)
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance
