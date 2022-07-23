from cProfile import label
from cgi import test
from imghdr import tests
from django.shortcuts import redirect, render
from .models import Test, Lab
from django.views.generic import View
from django.db.models.functions import Lower
import csv
from django.http import HttpResponse
from django.utils import encoding
import urllib.parse
import xlwt


class Session:
    testss = Test.objects.all()
    
    @classmethod
    def displayedTest(self,ts = None):
        if(ts != None):
            Session.testss = ts
        return Session.testss
      



def getTestName(test):
    if Test.objects.get(id = test.id).name:
        return Test.objects.get(id = test.id).name
    else:
        return ""


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
        
        unified.sort(key = getTestName)
        
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

def export_tests_xslx(request):
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="tests.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Tests')

    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['מס׳','קוד בדיקה','שם בדיקה','שמות נוספים','פירוט בדיקות המשך','הכנת החולה לפני הדיגום','סוג הדגימה','מגבלות הבדיקה','כלי קיבול לדגימה ','צבע פקק ','נפח דגימה מינימלי נדרש','נפח דם נדרש למקבצי בדיקות שונים','תנאי לקיחה ושימור טרם שינוע','תנאי שינוע','זמן מירבי מדיגום עד הגעה למעבדה','מען למשלוח בדיקות','מטרת הבדיקה','מידע קליני','שיטת ביצוע הבדיקה','משך הזמן מקבלת הדגימה ועד הפצת תשובה ','האם הבדיקה מבוצעת גם בערבים וסופ"ש? ','בקרת איכות חיצונית','קוד מחיר משרד הבריאות','הערות','מעבדה מבצעת']


    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()
    x = Session.displayedTest()
    tests = x.values_list('id','testcode', 'name', 'addnames','posttests','preparment','kind','limitations','vessel','color','volume','bloodamount','pretransportconditions','transportconditions','maxtime','addressee','testpurpose','clinicalinfo','method','processingtime','specialdays','outtermonitoring','pricecode','comments')
    
    for test in tests:
        row_num += 1

        assigner = list(test)
        try:
            labname = x.get(id = test[0]).lab.name
        except: 
            labname = None
       

        assigner.append(labname)

        tuple(assigner)
        for col_num in range(len(assigner)):
            ws.write(row_num, col_num, assigner[col_num], font_style)

    ws.cols_right_to_left = True
    wb.save(response)
    return response




class searchView(View):
    
    def get(self,request,letter=""):
        letter = urllib.parse.unquote(letter,'windows-1255')
        template = "search.html"
        message = None
        labs = Lab.objects.all()
        if(letter != ""):
            tests = getdistinct(Test.objects.filter(name__startswith=encoding.smart_str(letter, encoding='utf-8', strings_only=False, errors='strict')))
          
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
    text = urllib.parse.unquote(text,'windows-1255')

    tests = Test.objects.filter(name__icontains = text)
    labs = Lab.objects.all()
    
    try:
        tests |= Test.objects.filter(lab = Lab.objects.get(name = text))
    except:
            pass
    try:
        tests |= Test.objects.filter(addnames__icontains = text)
    except:
            pass
    try:
        tests |= Test.objects.filter(paneldetails__icontains = text)
    except:
            pass
    try:
        tests |= Test.objects.filter(clinicalinfo__icontains = text)
    except:
            pass


    tests = getdistinct(tests.distinct())


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
        test1 = Test.objects.get(id = id)
        if(test1.testcode !=  "הבדיקה אינה ממוחשבת" and test1.testcode != ""):
            panel = Test.objects.filter(testcode = test1.testcode)
            if(len(panel) == 1):
                panel = None
        else:
            panel = None
       
            
       
        
        
       
        context = {
            "test" : test1,
            "panel" : panel
            }

        return render(request,self.template,context)