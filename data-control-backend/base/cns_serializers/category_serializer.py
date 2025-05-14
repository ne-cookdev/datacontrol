from rest_framework import serializers

from .sharing_serializers import _ProductCardInfoSerializer
from ..models import Category


class CategorySerializer(serializers.ModelSerializer):
    products = _ProductCardInfoSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        extra_kwargs = {'name': {'required': True}, }

    def create(self, validated_data):
        category = Category.objects.create(**validated_data)
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance
