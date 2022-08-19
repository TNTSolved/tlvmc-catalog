from django.contrib import admin
from .models import Lab, Test

# Register your models here.


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ('name', 'lab', 'testcode')
    list_filter = ('lab',)
    search_fields = ['name']


    fieldsets = (
        ('Lab', {
            'fields': ('lab',)
        }),
        ('Test Information', {
            'fields': ('testcode', 'name','addnames','paneldetails','panelnames','posttests')
        }),
        ('Sampling & Transportation', {
            'fields': ('preparment', 'kind','limitations','vessel','color','volume','bloodamount','pretransportconditions','transportconditions','maxtime','addressee')
        }),
        ('Clinical Info', {
            'fields': ('testpurpose', 'clinicalinfo')
        }),
        ('Method of conduction', {
            'fields': ('method', 'processingtime','specialdays')
        }),
        ('Additional Info', {
            'fields': ('outtermonitoring', 'pricecode','comments')
        }),
        
    )


@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
    pass
    