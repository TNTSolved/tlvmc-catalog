from django.db import models
from django.db.models.deletion import DO_NOTHING
from django.shortcuts import redirect
from django.urls import reverse


class Lab(models.Model):
    name = models.TextField(db_column='Name', blank=True, null=True)  # Field name made lowercase.
    link = models.TextField(db_column='Link', blank=True, null=True)  # Field name made lowercase.

    def __str__(self):
     return self.name

    def get_absolute_url(self):
        return reverse("labView", kwargs={"link": self.link})

class Test(models.Model):
    lab = models.ForeignKey(Lab,on_delete=DO_NOTHING,db_column='Lab_ID', blank=True, null=True)  # Field name made lowercase.
    testcode = models.TextField(db_column='TestCode', blank=True, null=True)  # Field name made lowercase.
    name = models.TextField(db_column='Name', blank=True, null=True)  # Field name made lowercase.
    addnames = models.TextField(db_column='AddNames', blank=True, null=True)  # Field name made lowercase.
    paneldetails = models.TextField(db_column='PanelDetails', blank=True, null=True)  # Field name made lowercase.
    panelnames = models.TextField(db_column='PanelNames', blank=True, null=True)  # Field name made lowercase.
    posttests = models.TextField(db_column='PostTests', blank=True, null=True)  # Field name made lowercase.
    preparment = models.TextField(db_column='Preparment', blank=True, null=True)  # Field name made lowercase.
    kind = models.TextField(db_column='Kind', blank=True, null=True)  # Field name made lowercase.
    limitations = models.TextField(db_column='Limitations', blank=True, null=True)  # Field name made lowercase.
    vessel = models.TextField(db_column='Vessel', blank=True, null=True)  # Field name made lowercase.
    color = models.TextField(db_column='Color', blank=True, null=True)  # Field name made lowercase.
    volume = models.TextField(db_column='Volume', blank=True, null=True)  # Field name made lowercase.
    bloodamount = models.TextField(db_column='BloodAmount', blank=True, null=True)  # Field name made lowercase.
    pretransportconditions = models.TextField(db_column='PreTransportConditions', blank=True, null=True)  # Field name made lowercase.
    transportconditions = models.TextField(db_column='TransportConditions', blank=True, null=True)  # Field name made lowercase.
    maxtime = models.TextField(db_column='MaxTime', blank=True, null=True)  # Field name made lowercase.
    addressee = models.TextField(db_column='Addressee', blank=True, null=True)  # Field name made lowercase.
    testpurpose = models.TextField(db_column='TestPurpose', blank=True, null=True)  # Field name made lowercase.
    clinicalinfo = models.TextField(db_column='ClinicalInfo', blank=True, null=True)  # Field name made lowercase.
    method = models.TextField(db_column='Method', blank=True, null=True)  # Field name made lowercase.
    processingtime = models.TextField(db_column='ProcessingTime', blank=True, null=True)  # Field name made lowercase.
    specialdays = models.TextField(db_column='SpecialDays', blank=True, null=True)  # Field name made lowercase.
    outtermonitoring = models.TextField(db_column='OutterMonitoring', blank=True, null=True)  # Field name made lowercase.
    pricecode = models.TextField(db_column='PriceCode', blank=True, null=True)  # Field name made lowercase.
    comments = models.TextField(db_column='Comments', blank=True, null=True)  # Field name made lowercase.

    def __str__(self):
     return self.name

    
    
   


