from cProfile import label
from imghdr import tests
from django.shortcuts import redirect, render
from requests import session
from .models import Test, Lab
from django.views.generic import View
from django.db.models.functions import Lower
import csv
from django.http import HttpResponse


class Session:
    testss = Test.objects.all()
    
    @classmethod
    def displayedTest(self,ts = None):
        if(ts != None):
            Session.testss = ts
        return Session.testss
      





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

def export_tests_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="tests.csv"'

    writer = csv.writer(response)
    writer.writerow(['מס׳','קוד בדיקה','שם בדיקה','שמות נוספים','פירוט בדיקות המשך','הכנת החולה לפני הדיגום','סוג הדגימה','מגבלות הבדיקה','כלי קיבול לדגימה ','צבע פקק ','נפח דגימה מינימלי נדרש','נפח דם נדרש למקבצי בדיקות שונים','תנאי לקיחה ושימור טרם שינוע','תנאי שינוע','זמן מירבי מדיגום עד הגעה למעבדה','מען למשלוח בדיקות','מטרת הבדיקה','מידע קליני','שיטת ביצוע הבדיקה','משך הזמן מקבלת הדגימה ועד הפצת תשובה ','האם הבדיקה מבוצעת גם בערבים וסופ"ש? ','בקרת איכות חיצונית','קוד מחיר משרד הבריאות','הערות','מעבדה מבצעת'])

    x = Session.displayedTest()
    tests = x.values_list('id','testcode', 'name', 'addnames','posttests','preparment','kind','limitations','vessel','color','volume','bloodamount','pretransportconditions','transportconditions','maxtime','addressee','testpurpose','clinicalinfo','method','processingtime','specialdays','outtermonitoring','pricecode','comments')

    for test in tests:
        assigner = list(test) 
        assigner.append(x.get(id = test[0]).lab)
        tuple(assigner)
        writer.writerow(assigner)

    return response

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