from datetime import datetime
from multiprocessing import managers
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from control.models import Order , Product, OrderItem , ShippingAddress
from control.serializer import   OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItem(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) create order
        order = Order.objects.create(
            user = user,
            paymentMethod = data['paymentMethod'],
            taxPrice = data['taxPrice'],
            shippingPrice = data['shippingPrice'],
            totalPrice = data['totalPrice'],

        )
        # (2) create shipping address
        shipping = ShippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalCode =data['shippingAddress']['postalcode'],
            country=data['shippingAddress']['country'],
            )
        # (3) create order items and set order to orderitems relationship
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            # (4) Update stock after order
            product.countinStock -= item.qty
            product.save()

        serializer = OrderSerializer(order , many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serilizer = OrderSerializer(orders , many=True)
    return Response(serilizer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def allOrders(request):
    orders = Order.objects.all()
    serilizer = OrderSerializer(orders , many=True)
    return Response(serilizer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user==user:
            serializer = OrderSerializer(order , many=False)
            return Response(serializer.data)
        else:
            return Response({'detail':'Not authorized to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order Does Not Exists'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def upate_order_paid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order Was Paid')

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def upate_order_deliver(request,pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()
    return Response('Order Was Delivered')