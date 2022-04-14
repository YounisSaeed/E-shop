from django.urls import path
from control.views import product_views as views

urlpatterns = [
    path('create/',views.createProduct,name='create-product'),
    path('upload/',views.upload_image,name='upload-image'),
    path('',views.getProducts,name='Products'),
    path('<str:pk>/',views.getProduct,name='Product'),
    path('<str:pk>/reviews/',views.createProductReview,name='create-reviews'),

    
    path('update/<str:pk>/',views.update_product, name='update-product'),
    path('delete/<str:pk>/',views.delete_product,name='delete-product'),

]