from django.urls import path, include
from rest_framework import routers

from .views import (CarrierViewSet, CategoryViewSet, ProductViewSet, StockViewSet,
                    WarehouseViewSet, OrderViewSet, ShipmentViewSet)


router = routers.DefaultRouter()
router.register(r'carriers', CarrierViewSet, basename="carriers")
router.register(r'categories', CategoryViewSet, basename="categories")
router.register(r'products', ProductViewSet, basename="products")
router.register(r'stocks', StockViewSet, basename="stocks")
router.register(r'warehouses', WarehouseViewSet, basename="warehouses")
router.register(r'orders', OrderViewSet, basename="orders")
router.register(r'shipments', ShipmentViewSet, basename="shipments")

urlpatterns = [
    path('', include(router.urls))
]
