# populate.py
import os
import django
from django_xlspopulator.populator import Populator
os.environ.setdefault('DJANGO_SETTINGS_MODULE','mysite.settings')
django.setup()
from TestCatalog.models import Test

pop = Populator('/Users/roeeharel/Documents/DEV/tlvmc-catalog/testsRaw.xlsx', Test)
pop.populate()