from django.urls import path,re_path
from . import views

urlpatterns = [
    path('dirs/', views.getDirs),
    path('getStreamToken/', views.getToken),
    path('streamCompleted/<slug:unique_id>/', views.deleteToken),
    path('stream/<slug:unique_id>/', views.getFile),

    path('downloadFile/', views.downloadFile),
    path('downloadDir/', views.downloadDirectory),
]