// JavaScript Document
var objAuto;
var strSTab = '＃＠＆＊※〓●▲◎☆★◆■▼㊣♀♂⊕⊙△◇□';
  //＃＠＆＊※〓●▲◎☆★◆■▼㊣♀♂⊕⊙△◇□ //○△◇□▽§№

function getElmID(xID){
  return document.getElementById(xID);
}
function ShowDiv(xID){
 var nDiv = getElmID(xID);
 if(nDiv.style.display=='none') { nDiv.style.display = ''; }
 else { nDiv.style.display = 'none'; } 
}
function setRadio(rad,val){
  for(var i=0;i<rad.length;i++){   
   if(rad[i].value==val){ rad[i].checked = true; }
   else { rad[i].checked = false; }
  } 
}
function getRadio(rad){
  for(var i=0;i<rad.length;i++){   
   if(rad[i].checked){
     return rad[i].value;
    }
  } 
}
function setHidden(sTabs){
  aTab = sTabs.split(",");
  for(var i = 0;i<aTab.length;i++){
	try{ getElmID('tab_'+aTab[i]).style.display = 'none'; }
	catch(e){}
  }
  getElmID('idShow').style.display = 'none';
}
function setAuto(func,auto){
  var fAuto = getElmID('aut').checked==true?'Y':'N';
  if(auto&&fAuto=='Y') { 
    //clearInterval(objAuto);
	objAuto = setTimeout(func+'();',5000); 
  }
}
function showColor(char){
  var ct = 'FF0000,00FF00,0000FF,00FFFF,FF00FF,FFFF00';
    ct += ',800000,808000,008000,008080,000080,800080,808080';
	ct += ',3A6EA5,0A246A,A6CAF0';
	ct += ct+',FFFFFF,000000,C0C0C0,404040'+ct;
  var a = ct.split(','); //(6+7+3)*2+4中颜色
  var c = a[Math.floor(36*Math.random())]; 
  var s = c=='FFFFFF'?'color:#'+c+';background-color:#000000':'color:#'+c+';';
  var fs = ''; 
  if(char.length>3){ 
    var fpx = 96-((char.length-3)*24); if(fpx<24) fpx = 24; // fpx: --- 4)72; 3)96px
	fs = 'font-size:large;';
  }
  if(char.charCodeAt(0)>128){ 
    if(strSTab.indexOf(char.charAt(0))<0) fs += 'font-family:SimHei;';
  }
  return "<span class='part' style='"+s+";"+fs+"'>"+char+"</span>";
}
function showChsp(n){
  var ct = strSTab;
  var c = ct.substr(Math.floor(ct.length*Math.random()),1); 
  var s='';
  for(var i=0;i<n;i++){ s+=c; }
  s = showColor(s);//n+":"+s;//showColor();
  return s.replace('part','partsp');
}
function showPart(str,act){
  getElmID('idShow').style.display = '';
  if(str.indexOf('|')>0){
	  var s = str;
  }else{
	  var p = ""; var s = "";
	  for(i=0;i<str.length;i++){
		  s += p+str.substr(i,1); p = "|";
  }   }
  var a = s.split("|"); s = ""; //alert(s+"\r\n"+a[1]);
  var n = a.length;
  if(act=="n"){
	for(i=0;i<n;i++){ s += showColor(a[i]); }
  }else{
	for(i=0;i<n;i++){ 
	  var r = Math.floor(n*Math.random());
	  var t = a[i]; a[i] = a[r]; a[r] = t; 
	}
	for(i=0;i<act;i++){ 
	  if(i<n) s += showColor(a[i]); //以下4行为单独数字设计
	  if((act=="1")&&('(012345678910)'.indexOf(a[i])>0)){ 
	    var a10 = "zore,one,two,three,four,five,six,seven,eight,nine,ten".split(',');
		s += showColor('零一二三四五六七八九十'.substr(a[i],1));
		s += showColor(a10[a[i]]);
		s += showChsp(a[i]);
	  }
	}
  }
  getElmID('idShow').innerHTML = s;
}

function showPinyin(){
  setHidden('zm,sm,ym,yd');
  var sTab = getRadio(document.fmPinyin.tab); 
  var sAct = getRadio(document.fmPinyin.act);
  if(sTab.indexOf('_')==0){
	  if(sAct=="n") { 
	    var fATab = false;
		ShowDiv('tab'+sTab); 
	  }else { 
	    var fATab = true;
		if(sTab=='_sm'){ sTab='b|p|m|f|d|t|n|l|g|k|h|j|q|x|zh|ch|sh|r|z|c|s'; }
		if(sTab=='_ym'){ sTab='ɑ|o|e|i|u|ü|ɑi|ei|ui|ɑo|ou|iu|ie|üe|er|ɑn|en|in|un|ün|ɑng|eng|ing|ong'; }
		if(sTab=='_yd'){ sTab='ˉˊˇˋ'; }
		if(sTab=='_zm'){ sTab='abcdefghijklmnopqrstuvwxyz'; }
		showPart(sTab,sAct); 
	  }
  }else{
	  var fATab = true;
	  showPart(sTab,sAct);
  } //location.href='#Start';
  setAuto(funcName,fATab);
}
function showShuOp4(op){
  getElmID('idShow').style.display = '';
  var a = Math.floor(10*Math.random());
  var b = Math.floor(10*Math.random());
  var s='',c,op;
  if(op=='+') {c=a+b; op='＋';}
  if(op=='*') {c=a*b; op='×';}
  if(op=='-') {
	if(b>a){ t=a;a=b;b=t; }
	c = a-b; op = '－';
  }
  if(op=='/') {
	b = b==0?10:b; //b=1~10
	op = '÷'; var s = ''; 
	for(i=1;i<=10;i++){  
	  if(i*b<=10) { s+=''+i+'|'; } //c商[列表]
	}
	s = s.substr(0,s.length-1); ar = s.split('|');
	r = Math.floor(ar.length*Math.random());
	c = ar[r]; a = c*b; //alert(c+')'+s+':'+b+':'+c); //s+':'+b
  } 
  s = a+''+op+''+b+' = '+c; //﹦=
  s = showColor(s).replace('part','partOp4');
  getElmID('idShow').innerHTML = s;
}
function showShuzi(){
  setHidden('sx01,sx11,sx12,sx13,sx14,sx15,sx16');
  var sTab = getRadio(document.fmPinyin.tab); 
  var sAct = getRadio(document.fmPinyin.act);
  if('(+-*/)'.indexOf(sTab)>0){
	  var fATab = true;
	  showShuOp4(sTab);
  }else if(sTab.indexOf('_')==0){
	  var fATab = false;
	  ShowDiv('tab'+sTab); //if(sAct=="n") { ShowDiv('tab'+sTab); }
  }else{
	  var fATab = true;
	  showPart(sTab,sAct);
  } //location.href='#Start';
  setAuto(funcName,fATab);
}

function showChange(){
  clearInterval(objAuto); 
  setTimeout(funcName+'();',50); 
}
/*
document.onkeydown=function(){
  var k = event.keyCode; //alert(k); //for Test
  if((k>=13&&k<20)||(k>=32&&k<=40)){
	showChange(); 
  }
}*/

//document.onkeydown=function(){alert(event.keyCode);} 
//13-Enter,32-Blank,33-Up,34-Down,37-38-39-40-<^>v
//16-17-18-Shift,Ctrl,Alt,90-Win
//＃＠＆＊※§№〓○●△▲◎☆★◇◆□■▽▼㊣♀♂⊕⊙

//var oItems = getElmID(ID).getElementsByTagName(tag);
//var mRight0Obj=setInterval(mRight0Mar,mRight0Speed);
//getElmID("mRight0Div0").onmouseover=function() {clearInterval(mRight0Obj);}