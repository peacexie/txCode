
var lunarInfo=new Array(  
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,  
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,  
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,  
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,  
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,  
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,  
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,  
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,  
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,  
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,  
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,  
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,  
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,  
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,  
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)   

//==== 传回农历 y年的总天数  
function lYearDays(y) {  
   var i, sum = 348  
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0  
   return(sum+leapDays(y))  
}  

//==== 传回农历 y年闰月的天数  
function leapDays(y) {  
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29)  
   else return(0)  
}  

//==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0  
function leapMonth(y) { return(lunarInfo[y-1900] & 0xf)}  

//====================================== 传回农历 y年m月的总天数  
function monthDays(y,m) { return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )}  

//==== 算出农历, 传入日期物件, 传回农历日期物件  
//     该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl  
function objLunar(objDate) {  
   var i, leap=0, temp=0;  
   var baseDate = new Date(1900,0,31);  
   var offset   = (objDate - baseDate)/86400000;  
   this.dayCyl = offset + 40;  
   this.monCyl = 14;  
   for(i=1900; i<2050 && offset>0; i++) {  
      temp = lYearDays(i);  
      offset -= temp;  
      this.monCyl += 12;  
   }  
   if(offset<0) {  
      offset += temp;  
      i--;  
      this.monCyl -= 12;  
   }  
   this.year = i;  
   this.yearCyl = i-1864;  
   leap = leapMonth(i); //闰哪个月  
   this.isLeap = false;  
   for(i=1; i<13 && offset>0; i++) {  
      //闰月  
      if(leap>0 && i==(leap+1) && this.isLeap==false)  
         { --i; this.isLeap = true; temp = leapDays(this.year); }  
      else  
         { temp = monthDays(this.year, i); }  
      //解除闰月  
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;  
      offset -= temp;
      if(this.isLeap == false) this.monCyl ++;
   }  
   if(offset==0 && leap>0 && i==leap+1)  
      if(this.isLeap)  
         { this.isLeap = false; }  
      else  
         { this.isLeap = true; --i; --this.monCyl;}  
   if(offset<0){ offset += temp; --i; --this.monCyl; }  
   this.month = i;  
   this.day = offset + 1;  
}  

//==== 中文日期  
function strLunar(dObj){  
	var m = dObj.month, d = dObj.day; //.month,lDObj.day
	var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');  
	var nStr2 = new Array('初','十','廿','卅','');  
	var s1, s2;  
	if (m>10){s1 = '十'+nStr1[m-10]} else {s1 = nStr1[m]} s1 += '月';  
	switch (d) {  
		case 10:s2 = '初十'; break;  
		case 20:s2 = '二十'; break;  
		case 30:s2 = '三十'; break;  
		default:s2 = nStr2[Math.floor(d/10)]; s2 += nStr1[d%10];  
	}
	if(dObj.isLeap) s1 = '闰'+s1;
	return(s2=='初一' ? s1 : s2);  
}  

function strTerm(SY,SM,SD){
	var aData = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758)  
	var aName = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至")  
	var ObjTerm='',tmp1,tmp2;
	tmp1 = new Date((31556925974.7*(SY-1900)+aData[SM*2+1]*60000)+Date.UTC(1900,0,6,2,5));
	tmp2 = tmp1.getUTCDate();
	if (tmp2==SD) ObjTerm = aName[SM*2+1];
	tmp1 = new Date((31556925974.7*(SY-1900)+aData[SM*2]*60000)+Date.UTC(1900,0,6,2,5));
	tmp2= tmp1.getUTCDate();
	if (tmp2==SD) ObjTerm = aName[SM*2];
	if(ObjTerm!='') ObjTerm =""+ObjTerm+"";
	return(ObjTerm);  
}

////////////////////////////////////////////

var strHead = "<tr><td class='th'>日</td><td class='th'>一</td><td class='th'>二</td><td class='th'>三</td><td class='th'>四</td><td class='th'>五</td><td class='th'>六</td></tr>";
var strHTab = "<table cellpadding='0' cellspacing='0' class='c'>";
var strNull = "<td class='tNull'>&nbsp;</td>"; 
var arrMonth = "January;February;March;April;May;June;July;August;September;October;November;December".split(";"); 
var strMark = "<i class='umark'>*</i>";

function nullCells(xDays,xFlag){
  var s = "";
  if(xFlag=='End'){
    xDays = 6 - xDays;
	for(var i=0;i<xDays;i++){ s += strNull;}
  }else{
    if(xDays>0){
       for(var i=0;i<xDays;i++){ s += strNull;}
    }
  }
  return s;
}

////////////////////////////////////////////

//公历纪念日
var cdayarr = new Array();
cdayarr[1] = new Array();
cdayarr[1]["0309"] = '结婚登记日';
cdayarr[1]["0424"] = 'Craby生日'; 
cdayarr[1]["0913"] = 'Peace生日';
//农历纪念日
cdayarr[2] = new Array();
cdayarr[2]["0709"] = 'Shirley生日';
cdayarr[2]["0211"] = '(广西)妈妈生日';
cdayarr[2]["0322"] = '(广西)爸爸生日';
cdayarr[2]["0327"] = '爷爷生日';
cdayarr[2]["0610"] = '(湖南)妈妈生日';
cdayarr[2]["0408"] = '(湖南)爸爸生日';
//cdaya2[""] = 'xxx';

function listM01(xYear, xMonth){ 
	var dnow = new Date(""+xYear+"/"+(parseInt(xMonth)+1)+"/01"); 
	var sMounth="<tr>", iWDay = 0, SY = xYear, rows = 1;
	var y, m , cdays1 = '', cdays2 = '', fcday = '';
	for(var i=0;i<35;i++){ 
		if(i) dnow.setDate(dnow.getDate() + 1); 
		var SM = dnow.getMonth(), SD = dnow.getDate(), fcday = ''; 
		if(!(SM==xMonth)){ break; } //var pDate = SY+'-'+(SM+1)+'-'+SD; //console.log(pDate);
		var iWDay = dnow.getDay(); 
		if(i==0){sMounth += nullCells(iWDay,'');} //处理前空白
		if((iWDay==0)&&(i>0)){ sMounth += "</tr><tr>"; rows++; } //换行
		//农历对象
     	var nlObj = new objLunar(new Date(SY,SM,SD)); 
     	sDay = strLunar(nlObj).toString(); sTerm = strTerm(SY,SM,SD); 
		tDay = (sTerm.length>0 && sDay.length>2) ? sDay.replace('月','') : sDay;
		var fprnt = yno>1900 ? ' &nbsp; ' : '';
		//处理纪念日
		m = parseInt(xMonth)+1; m = m<10 ? "0"+m : m;
		d = parseInt(SD);       d = d<10 ? "0"+d : d;
		if(cdaya1[m+''+d]){ 
			cdays1 += "<span class='nitem'>"+fprnt+"("+SD+"日)"+cdaya1[m+''+d]+'</span>';
			fcday = strMark;
		}
		m = parseInt(nlObj.month); m = m<10 ? "0"+m : m;
		d = parseInt(nlObj.day);   d = d<10 ? "0"+d : d;
		if(cdaya2[m+''+d]){ 
			cdays2 += "<span class='nitem'>"+fprnt+"(农历"+nlObj.day+"日)"+cdaya2[m+''+d]+'</span>';
			fcday = strMark;
		}
		//组某日字串
		exDay = sTerm.length>0 ? "<span class='"+(sDay.indexOf('月')>0 ? 'd24c d24b' : 'd24c')+"'>"+sTerm+"</span>" : '';
		exDay += "<span "+(sDay.indexOf('月')>0 ? "class='dm'" : '')+">"+tDay+"</span>"; 
		sMounth += "<td class='day1'><span class='dnum'>"+fcday+SD+"</span><br>"+exDay+"</td>";
	} 
	if(iWDay<6){sMounth += nullCells(iWDay,'End');} //处理后空白
	var tabTitle = "<table class='mtitle' cellpadding=0 cellspacing=0><tr><td>"+SY+'年'+(xMonth+1)+"月</td><td width='60%'>&nbsp;</td><td>"+arrMonth[xMonth]+"</td></tr></table>";
	var pTitle = "<tr><td colspan='7'>"+tabTitle+"</td></tr>"; 
	var pNotes = "<tr><td colspan='7' class='notes'><span class='ntitle'>记事：</span>"+cdays1+""+cdays2+"</td></tr>";
	return strHTab+pTitle+strHead+sMounth+pNotes+"</table>";
}

function listM02(xOffset){
	var Timer1 = (new Date()).getTime(); 
	nSM += xOffset; 
	if(nSM<0){ nSM = 11; nSY--; }
	if(nSM>11){ nSM = 0; nSY++; }
	var uby = nSY, ubm = nSM; //备份
	jsElm.jeID('cal_m1').innerHTML = listM01(nSY,nSM); 
	jsElm.jeID('cal_year').innerHTML = nSY; 
	nSM++; if(nSM>11){ nSM = 0; nSY++; }
	jsElm.jeID('cal_m2').innerHTML = listM01(nSY,nSM); 
	nSY = uby, nSM = ubm; //还原
	var Timer2 = (new Date()).getTime();
	jsElm.jeID('cal_Timer').innerHTML = Timer2-Timer1;
}

function cdayParas(no){
	var data = urlPara('d'+no), b = new Array(), n = 0;
	var a = (data && data.length>0) ? data.split(';') : new Array();  
	for(var i=0;i<a.length;i++){ 
		var t = a[i].replace("\r",'').replace("\n",'').replace(" ",''); 
		if(!t.indexOf(',')>0) continue;
		var ta = t.split(','); 
		if(ta[0].length>0 && ta[1].length>0){
			b[ta[0]] = ta[1]; n++;
		}
	}
	var re = n>0 ? b : cdayarr[no];
	return re;
}

function listYear(){
	var m12 = '';
	for(var m2=0;m2<6;m2++){
		m12 += '<table cellpadding="0" cellspacing="20" class="out">';
		m12 += '<tr><td>'+listM01(yno,m2*2)+'</td></tr>'; 
		m12 += '<tr><td>'+listM01(yno,m2*2+1)+'</td></tr>'; 
		m12 += '</table><br>&nbsp;';
	}
	jsElm.jeID('id_body').innerHTML = m12;	
}

function setPage(){
	jsElm.jeID('td_page').style.display = 'none';
	jsElm.jeID('cal_year').innerHTML = nSY; 
	jsElm.jeID('tab_m2').style.display = 'none';
	jsElm.jeID('tab_set').style.display = '';
	var ymin = nSY-5, ymax = nSY+6; 
	for(var yi=ymin;yi<ymax;yi++){ 
		var opt = new Option(yi,yi);
		jsElm.jeID('yno').options.add(opt);
	}
	jsElm.jeID('yno').value = nSY;	
}

