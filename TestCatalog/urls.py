from django.urls import path
from .views import TestDetailView, export_tests_csv, searchView, searchViewLab, searchViewText, export_tests_csv, export_tests_xslx

urlpatterns = [
    path('search/', searchView.as_view()),
    path('', searchView.as_view()),
    path('search/text/', searchView.as_view()),
    path('search/<letter>', searchView.as_view()),
    path('search/text/<path:text>', searchViewText),
    path('search/lab/<lab>', searchViewLab),
    path('export/csv/', export_tests_xslx),  
    path('test/<int:id>', TestDetailView.as_view())


]
