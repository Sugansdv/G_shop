import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):

    # ✅ PRICE RANGE
    price_min = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="gte"
    )

    price_max = django_filters.NumberFilter(
        field_name="price",
        lookup_expr="lte"
    )

    # ✅ RATING RANGE
    rating_range = django_filters.CharFilter(
        method="filter_rating"
    )

    # ✅ STOCK
    in_stock = django_filters.BooleanFilter(
        method="filter_stock"
    )

    class Meta:
        model = Product
        fields = ["category", "brand"]

    def filter_rating(self, queryset, name, value):
        ranges = {
            "5": (5, 5),
            "4": (4, 4.9),
            "3": (3, 3.9),
            "2": (2, 2.9),
            "1": (1, 1.9),
        }

        if value in ranges:
            low, high = ranges[value]
            return queryset.filter(
                rating__gte=low,
                rating__lte=high
            )
        return queryset

    def filter_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock__gt=0)
        return queryset.filter(stock=0)