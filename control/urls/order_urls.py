from django.urls import path
from control.views import order_views as views
urlpatterns = [

    path('',views.allOrders,name='orders'),

    path('add/',views.addOrderItem,name='create-oreder'),
    path('myorders/',views.MyOrders,name='my_orders'),


    path('<str:pk>/',views.getOrderById,name='order_id'),
    path('<str:pk>/pay/',views.upate_order_paid,name='pay'),
    path('<str:pk>/deliver/',views.upate_order_deliver,name='order-deliver'),
]