from django.shortcuts import redirect, render
from .models import Test, Lab
from django.views.generic import View
from django.db.models.functions import Lower

 
# Create your views here.
def LabView(request,*args, **kwargs):
    link = kwargs['link']
    return redirect()


class searchView(View):
    
    def get(self,request,letter=""):
        template = "search.html"
        message = None
        if(letter != ""):
            tests = Test.objects.filter(name__startswith=letter).order_by(Lower('name').asc()).distinct()
            if(letter == "all"):
                tests = Test.objects.all().order_by(Lower('name').asc()).distinct()
        else:
            tests = None

       

        context = {

            "session" : "search",
            "tests" : tests
        }
    
        return render(request,template,context)
    
def searchViewText(request,text):
    tests = Test.objects.filter(name__icontains = text)
    try:
        tests |= Test.objects.filter(lab = Lab.objects.get(name = text))
        tests |= Test.objects.filter(addnames__icontains = text)
        tests |= Test.objects.filter(paneldetails__icontains = text)
        tests |= Test.objects.filter(clinicalinfo__icontains = text)
        tests = tests.distinct()
    except:
        pass

    context={"tests" : tests}
    return render(request,"search.html",context)

class TestDetailView(View):

    template = "testView.html"

    def get(self,request,id):
        test = Test.objects.get(id = id)
        context = {
            
            "session" : "search",

            "test" : test
            }


        
    
        return render(request,self.template,context)