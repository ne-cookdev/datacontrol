from rest_framework import serializers

from ..models import Product, Category, Stock


class _CategoryInProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    category = _CategoryInProductSerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    all_quantity = serializers.SerializerMethodField(read_only=True, method_name='get_all_quantity')

    class Meta:
        model = Product
        exclude = ['orders', 'warehouses']
        extra_kwargs = {
            'name': {'required': True},
            'price': {'required': True},
            'weight': {'required': True},
            'width': {'required': True},
            'height': {'required': True},
            'length': {'required': True},
        }

    def get_all_quantity(self, product_obj):
        all_quantity = sum([s.quantity for s in Stock.objects.filter(product=product_obj)])
        return all_quantity
