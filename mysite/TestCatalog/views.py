from cProfile import label
from django.shortcuts import redirect, render
from .models import Test, Lab
from django.views.generic import View
from django.db.models.functions import Lower

 
def getdistinct(tests):
        tests = tests
        panel = ''
        divided = {}
        empties = list()
        for t in tests:
            if t.testcode != "" and t.testcode != "הבדיקה אינה ממוחשבת" and t.testcode != None:
                if(panel != t.testcode):
                    panel = t.testcode
                    divided[panel] =  list()
                    divided[panel].append(t)
                if(panel == t.testcode):
                    divided[panel].append(t)
            else:
             empties.append(t)
        
        unified = list()
        for p in divided:
            unified.append(divided[p][0])
            
        for p in empties:
            unified.append(p)
        
        return unified


# Create your views here.
def LabView(request,*args, **kwargs):
    link = kwargs['link']
    return redirect()


class searchView(View):
    
    def get(self,request,letter=""):
        template = "search.html"
        message = None
        labs = Lab.objects.all()
        if(letter != ""):
            tests = getdistinct(Test.objects.filter(name__startswith=letter))
            if(letter == "all"):
                tests = getdistinct(Test.objects.all())
        else:
            tests = None

       

        context = {

            "session" : "search",
            "tests" : tests,
            "labs" : labs
        }
    
        return render(request,template,context)
    
def searchViewText(request,text):
    tests = Test.objects.filter(name__icontains = text)
    labs = Lab.objects.all()
    print(labs)
    try:
        tests |= Test.objects.filter(lab = Lab.objects.get(name = text))
        tests |= Test.objects.filter(addnames__icontains = text)
        tests |= Test.objects.filter(paneldetails__icontains = text)
        tests |= Test.objects.filter(clinicalinfo__icontains = text)
        tests = getdistinct(tests.distinct())
    except:
        pass

    context={

        "session" : "search",
        "tests" : tests,
        "labs" : labs
    }
    return render(request,"search.html",context)


def searchViewLab(request,lab):
    labs = Lab.objects.all()
    labname = Lab.objects.get(id = lab)
    tests = Test.objects.none

    try:
        tests = Test.objects.filter(lab = Lab.objects.get(id = lab))
        print(tests)
        tests = getdistinct(tests.distinct())
    except:
        pass

    context={"tests" : tests,
    "labs" : labs,
    "lab":labname}

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