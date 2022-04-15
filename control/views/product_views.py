from itertools import product
from math import prod
from unicodedata import category
from django.shortcuts import render
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger
from control.models import Product, Review
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
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    products = Product.objects.filter(name__icontains=query)

    page = request.query_params.get('page')
    paginator = Paginator(products,4)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    
    if page == None:
        page = 1
    page = int(page)
    products_serializer = ProductSerializer(products , many = True)
    return Response({'products':products_serializer.data,'page':page,'pages':paginator.num_pages})

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


@api_view(['POST'])
def upload_image(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response(' image was uploaded ')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data
    already_exists = product.review_set.filter(user=user).exists()
    if already_exists:
        content = {'detail':'Product already reviewed'}
        return Response(content , status=status.HTTP_400_BAD_REQUEST)
    elif data['rating']==0:
        content = {'detail':'please select a rating'}
        return Response(content , status=status.HTTP_400_BAD_REQUEST)
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name = user.first_name,
            rating=data['rating'],
            comment=data['comment'],

        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)
        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()
        return Response({'detail':'Review Added'})


@api_view(['GET'])
def getTopProduct(request):
    producs = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(producs,many=True)
    return Response(serializer.data)