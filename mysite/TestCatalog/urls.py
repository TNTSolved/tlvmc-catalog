from django.urls import path
from .views import TestDetailView, searchView, searchViewText

urlpatterns = [
    path('search/', searchView.as_view()),
    path('search/<letter>', searchView.as_view()),
    path('search/text/<text>', searchViewText),
    path('test/<int:id>', TestDetailView.as_view())


]
