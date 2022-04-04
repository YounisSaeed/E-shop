from django.urls import path
from control.views import product_views as views

urlpatterns = [

    path('',views.getProducts,name='Products'),
    path('<str:pk>/',views.getProduct,name='Product'),

]