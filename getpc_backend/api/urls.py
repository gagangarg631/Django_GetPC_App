from django.urls import path,re_path
from . import views

urlpatterns = [
    path('dirs/', views.getDirs),
    # path('dirs/<slug:dirPath>/', views.getDirs),
]