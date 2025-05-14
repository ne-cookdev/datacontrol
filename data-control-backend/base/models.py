from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.db import models

User = get_user_model()


class Carrier(models.Model):
    name = models.TextField(default="CARRIER_NAME", null=False, blank=False)

    class Meta:
        db_table = 'carrier'
        verbose_name = 'carrier'
        verbose_name_plural = 'carriers'

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=45, default="CATEGORY_NAME", null=False, blank=False)

    class Meta:
        db_table = 'category'
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Order(models.Model):
    class Status(models.IntegerChoices):
        CREATED = 1, _("Создан")
        ON_THE_WAY = 2, _("В пути")
        SHIPPED = 3, _("Доставлен")

    number = models.IntegerField(primary_key=True)
    order_date = models.DateTimeField(auto_now_add=True, blank=False)
    status = models.IntegerField(choices=Status.choices, default=Status.CREATED, null=False, blank=False)
    address = models.TextField(default="USER_ADDRESS", null=False, blank=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="order_user", null=False, blank=False)

    class Meta:
        db_table = 'order'
        verbose_name = 'order'
        verbose_name_plural = 'orders'

    def __str__(self):
        return f"Order №{self.number}"


class OrderDetails(models.Model):
    order = models.ForeignKey(to="Order", on_delete=models.CASCADE,
                              related_name="order_details", null=False, blank=False)
    product = models.ForeignKey(to="Product", on_delete=models.CASCADE,
                                related_name="order_details", null=False, blank=False)
    quantity = models.IntegerField(default=0, null=False, blank=False)
    price_at_order = models.FloatField(default=0.0, null=False, blank=False)

    class Meta:
        db_table = 'order_details'
        verbose_name = 'order details'
        verbose_name_plural = 'order details'

    def __str__(self):
        return f"Order details of {self.order}"


class Product(models.Model):
    name = models.CharField(max_length=45, default="PRODUCT_NAME", null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    price = models.FloatField(default=0.0, null=False, blank=False)
    weight = models.FloatField(default=0.0, null=False, blank=False)
    width = models.FloatField(default=0.0, null=False, blank=False)
    height = models.FloatField(default=0.0, null=False, blank=False)
    length = models.FloatField(default=0.0, null=False, blank=False)
    image_ref = models.TextField(null=True, blank=True)
    category = models.ForeignKey(to="Category", on_delete=models.CASCADE,
                                 related_name="products", null=False, blank=False)
    orders = models.ManyToManyField(to="Order", through="OrderDetails", related_name="products")
    warehouses = models.ManyToManyField(to="Warehouse", through="Stock", related_name="products")

    class Meta:
        db_table = 'product'
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.name


class Shipment(models.Model):
    class Status(models.IntegerChoices):
        ON_THE_WAY = 1, _("В пути")
        SHIPPED = 2, _("Доставлен")

    order = models.OneToOneField(to="Order", on_delete=models.CASCADE,
                                 related_name="shipment")
    carrier = models.ForeignKey(to="Carrier", on_delete=models.CASCADE,
                                related_name="shipments", null=False, blank=False)
    tracking_number = models.IntegerField(primary_key=True)
    status = models.IntegerField(choices=Status.choices, default=Status.ON_THE_WAY, null=False, blank=False)

    class Meta:
        db_table = 'shipment'
        verbose_name = 'shipment'
        verbose_name_plural = 'shipments'

    def __str__(self):
        return f"Shipment for {self.order} by {self.carrier}"


class Stock(models.Model):
    warehouse = models.ForeignKey(to="Warehouse", on_delete=models.CASCADE,
                                  related_name="stocks", null=False, blank=False)
    product = models.ForeignKey(to="Product", on_delete=models.CASCADE,
                                related_name="stocks", null=False, blank=False)
    quantity = models.IntegerField(default=0, null=False, blank=False)

    class Meta:
        db_table = 'stock'
        verbose_name = 'stock'
        verbose_name_plural = 'stocks'

    def __str__(self):
        return f"{self.quantity} {self.product}s remained in {self.warehouse}"


class Warehouse(models.Model):
    name = models.CharField(max_length=45, default="WAREHOUSE_NAME", null=False, blank=False)
    location = models.TextField(default="WAREHOUSE_LOCATION", null=False, blank=False)

    class Meta:
        db_table = 'warehouse'
        verbose_name = 'warehouse'
        verbose_name_plural = 'warehouses'

    def __str__(self):
        return self.name
