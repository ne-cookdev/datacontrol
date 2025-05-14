import logging.config

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import (Carrier, Category, Order, OrderDetails, Product, Shipment, Stock, Warehouse)
from .cns_serializers import (
    carrier_serializer, category_serializer, order_serializer, order_details_serializer,
    product_serializer, shipment_serializer, stock_serializer, warehouse_serializer
)

logger = logging.getLogger(__name__)


class CarrierViewSet(viewsets.ModelViewSet):
    queryset = Carrier.objects.all()
    serializer_class = carrier_serializer.CarrierSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = category_serializer.CategorySerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = order_serializer.OrderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class OrderDetailsViewSet(viewsets.ModelViewSet):
    queryset = OrderDetails.objects.all()
    serializer_class = order_details_serializer.OrderDetailsSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = product_serializer.ProductSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = shipment_serializer.ShipmentSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = stock_serializer.StockSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]


class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = warehouse_serializer.WarehouseSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny(), ]
        return [IsAuthenticated(), ]
