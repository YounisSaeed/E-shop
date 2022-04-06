from django.urls import path
from control.views import user_views as views

urlpatterns = [

    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.getUserProfile,name='users-profile'),
    path('delete/<str:pk>/',views.delete_user,name='delete-user'),
    path('profile/update/',views.UpadateUserProfile,name='users-profile-update'),
    path('register/',views.registerUser,name='register'),
    path('<str:pk>/',views.getUserByid,name='get-user'),
    path('update/<str:pk>/',views.UpadateUser,name='update-user'),
    path('',views.getUsers,name='users'),


]