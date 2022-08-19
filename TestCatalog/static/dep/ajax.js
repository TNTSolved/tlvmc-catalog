
// JavaScript Document
function questAjax(url, parameters, objName, method, runAfter) {	

  if(!method){
	method="POST";  
  }
  ajaxRequest = false;
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
	 ajaxRequest = new XMLHttpRequest();
	 if (ajaxRequest.overrideMimeType) {
		// set type accordingly to anticipated content type
		//ajaxRequest.overrideMimeType('text/xml');
		ajaxRequest.overrideMimeType('text/html');
	 }
  } else if (window.ActiveXObject) { // IE
	 try {
		ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
	 } catch (e) {
		try {
		   ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
	 }
  }
  if (!ajaxRequest) {
	 alert('Cannot create XMLHTTP instance');
	 return false;
  }
  
  ajaxRequest.onreadystatechange = function(){
	  
	  if (ajaxRequest.readyState == 1) {
		if(objName){
		  //document.getElementById(objName).innerHTML = "מעלה מידע...";
		}
	  }
	  
	  if (ajaxRequest.readyState == 2) {
		if(objName){
		  //document.getElementById(objName).innerHTML = "מידע התעדכן";
		}
	  }
	  
	  if (ajaxRequest.readyState == 3) {
		if(objName){
		  //document.getElementById(objName).innerHTML = "אינטראקטיבי";
		}
	  }	  
	  
	  if (ajaxRequest.readyState == 4) {
		 if (ajaxRequest.status == 200) {
			if(objName){
				result = ajaxRequest.responseText;
				document.getElementById(objName).innerHTML = result;            
			}
		 } else {
			if(objName){
				document.getElementById(objName).innerHTML = "Error recieving data: "+ajaxRequest.status+" - "+ajaxRequest.statusText;
			}
		 }
		
		
		
		if(runAfter){
			eval(runAfter);
		}

	  }		  
	  
  };
  
  if(method=="GET"){
	  ajaxRequest.open('GET', url+"?"+parameters, true);
	  ajaxRequest.send(null);
  }else{
	  ajaxRequest.open('POST', url, true);
	  ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  ajaxRequest.setRequestHeader("Content-length", parameters.length);
	  ajaxRequest.setRequestHeader("Connection", "close");
	  ajaxRequest.send(parameters);
  }
}


function getQuestPage(page, poststr, method){
	questAjax(page, poststr, 'questionairDiv', method);
}

function openCloseLayer(page, poststr, objName){
	if(document.getElementById(objName).innerHTML==''){
		questAjax(page, poststr, objName);
	}else{
		document.getElementById(objName).innerHTML='';
	}
}

function submitAjaxForm(formObj, postTo, objName){

	if(!ajaxFormCheckFields(formObj)){
		return false;
	}

	var parameters="";
	for(i=0;i<formObj.elements.length;i++){
		if(i>0){
			parameters+="&";	
		}
		parameters+=formObj.elements[i].name+"="+formObj.elements[i].value;
		
	}

	questAjax(postTo, parameters, objName);

	return false;
}

function submitAjaxCommentForm(formObj, postTo, objName, runAfter){

	if(!ajaxCommentFormCheckFields(formObj)){
		return false;
	}

	var parameters="";
	for(i=0;i<formObj.elements.length;i++){
		if(i>0){
			parameters+="&";	
		}
		parameters+=formObj.elements[i].name+"="+formObj.elements[i].value;
		
	}

	questAjax(postTo, parameters, objName, 'post', runAfter);

	return false;
}
