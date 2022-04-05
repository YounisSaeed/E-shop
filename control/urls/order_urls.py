from django.urls import path
from control.views import order_views as views
urlpatterns = [

    path('add/',views.addOrderItem,name='create-oreder'),
    path('<str:pk>/',views.getOrderById,name='order_id'),
    path('<str:pk>/pay/',views.upate_order_paid,name='pay'),
]