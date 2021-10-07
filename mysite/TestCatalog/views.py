from django.shortcuts import redirect, render
from .models import Test
from django.views.generic import View

 
# Create your views here.
def LabView(request,*args, **kwargs):
    link = kwargs['link']
    return redirect()


class searchView(View):
    
    def get(self,request,letter=""):
        template = "search.html"
        message = None
        if(letter != ""):
            tests = Test.objects.filter(name__startswith=letter)
            if(letter == "all"):
                tests = Test.objects.all()
        else:
            tests = None
            

       

        context = {

            "tests" : tests
        }
    
        return render(request,template,context)
    
def searchViewText(request,text):
    return render(request,"search.html",context={"tests" : Test.objects.filter(name__icontains = text)})

class TestDetailView(View):

    template = "testView.html"

    def get(self,request,id):
        test = Test.objects.filter(id = id)
        context = {
            "test" : test,}


        
    
        return render(request,self.template,context)