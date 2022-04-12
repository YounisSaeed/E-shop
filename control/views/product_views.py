from itertools import product
from math import prod
from unicodedata import category
from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from control.models import Product
from control.serializer import ProductSerializer 

from rest_framework import status


    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_product(request,pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.category = data['category']
    product.countinStock=data['countinStock']
    product.description = data['description']
    
    product.save()
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    products_serializer = ProductSerializer(products , many = True)
    return Response(products_serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    product_serializer = ProductSerializer(product , many=False)
    return Response(product_serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_product(request,pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response(' product was deleted ')


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countinStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)
