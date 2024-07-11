from django.urls import path
from .views import ItemList
from .views import LoginView

urlpatterns = [
    path('api/items/', ItemList.as_view(), name='item-list'),
     path('api/login/', LoginView.as_view(), name='login'),
]
