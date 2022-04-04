from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from control.models import Order , Product, OrderItem , shippingAddress
from control.serializer import  UserSerializer ,UserSerializerWithToken , OrderSerializer
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
        shipping = shippingAddress.objects.create(
            order = order,
            address = data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postalcode =data['shippingAddress']['postalcode'],
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

    serializer = OrderSerializer(order , many=True)
    return Response(serializer.data)