
var strHead = "<tr><td class='th'>日</td><td class='th'>一</td><td class='th'>二</td><td class='th'>三</td><td class='th'>四</td><td class='th'>五</td><td class='th'>六</td></tr>";
var strHTab = "<table cellpadding='0' cellspacing='0' class='c'>";
var strNull = "<td class='tNull'>&nbsp;</td>"; 
var arrMonth = "Jan.;Feb.;March;April;May;June;July;Aug.;Sep.;Oct.;Nov.;Dec.".split(";"); 
var strMark = "*"; // <i class='umark'>*</i>

//公历纪念日
var cdayarr = new Array();
cdayarr[1] = new Array();
cdayarr[1]["0309"] = '结婚登记日';
cdayarr[1]["0424"] = 'Craby生日'; 
cdayarr[1]["0913"] = 'Peace生日';
//cdayarr[1]["1023"] = 'xxx日';
//农历纪念日
cdayarr[2] = new Array();
cdayarr[2]["0709"] = 'Shirley生日';
cdayarr[2]["0211"] = '(广西)妈妈生日';
cdayarr[2]["0322"] = '(广西)爸爸生日';
cdayarr[2]["0327"] = '爷爷生日';
cdayarr[2]["0610"] = '(湖南)妈妈生日';
cdayarr[2]["0208"] = '(湖南)爸爸生日';
//cdaya2[""] = 'xxx';

var aduilian = new Array();
aduilian["hnw1"] = new Array();
aduilian["hnw1"][1] = '肥田沃土农家乐';
aduilian["hnw1"][2] = '绿水青山此南湾';
aduilian["hnw1"][3] = '锦绣南湾';
aduilian["hnw2"] = new Array();
aduilian["hnw2"][1] = '在外打工家乡如何';
aduilian["hnw2"][2] = '爱我家乡爱我山河';
aduilian["hnw2"][3] = '回家看看';
aduilian["cat1"] = new Array();
aduilian["cat1"][1] = '简约实用贴心猫';
aduilian["cat1"][2] = '轻松高效架应用';
aduilian["cat1"][3] = '梦想起航';
aduilian["c105"] = new Array();
aduilian["c105"][1] = '凝聚智慧奔彩虹'; 
aduilian["c105"][2] = '至善至美乐成长';
aduilian["c105"][3] = '好好学习';
aduilian["diw1"] = new Array();
aduilian["diw1"][1] = '地王广场风水地';
aduilian["diw1"][2] = '和睦友邻熙景台';
aduilian["diw1"][3] = '和谐社区'; 
aduilian["def1"] = new Array();
aduilian["def1"][1] = '老少平安庆佳节';
aduilian["def1"][2] = '身心健康即是福';
aduilian["def1"][3] = '健康平安';
aduilian["2021"] = new Array();
aduilian["2021"][1] = '新冠网课齐抗疫';
aduilian["2021"][2] = '疫苗检测共护航';
aduilian["2021"][3] = '国泰民安';

function oneCell(SY,SM,SD,sDay,sTerm,sixFlag){
    f24 = sTerm.length>0; //tGZ = strGanzhi(SY,SM,SD);
    tDay = sDay = sDay.replace('13月','一月'); // 
    if(tDay.indexOf('闰')==0) tDay = tDay.replace('月','');
    spNum = "<span class='"+(f24 ? 'spj24' : 'spnum')+"'>"+(f24 ? sTerm : SD)+"</span>"; // *15
    nlStr = "<span class='"+(sDay.indexOf('月')>0 ? 'spyue' : 'spnl')+"'>"+tDay+"</span>"; // 初十 
    if(!sixFlag){ /*jsLog(sDay);//占6行处理格*/ 
        //nlStr = ''; 
    }
    return spNum+nlStr;
}
function sixLine(nDays,iWDay,i){ 
    var f1 = nDays==30 && i==0 && iWDay==6;
    var f2 = nDays==30 && i==29 && iWDay==0;
    var f3  = nDays==31 && i==0 && (iWDay==5 || iWDay==6);
    var f3b = nDays==31 && i==1 && iWDay==6;
    var f4  = nDays==31 && i==29 && iWDay==0;
    var f4b = nDays==31 && i==30 && (iWDay==0 || iWDay==1);
    return (f1||f2||f3||f3b||f4||f4b) ? 0 : 1;
}

function listM01(xYear, xMonth){ 
    var dnow = new Date(""+xYear+"/"+(parseInt(xMonth)+1)+"/01"); 
    var sMounth="<tr>", iWDay = 0, SY = xYear, rows = 1;
    var y, m, cdays1='', cdays2='', fstar='', fext; 
    var nDays = new Date(xYear,xMonth+1,0).getDate(); // 一个月中天数 console.log(nDays);
    for(var i=0;i<35;i++){ 
        if(i) dnow.setDate(dnow.getDate() + 1); 
        var SM = dnow.getMonth(), SD = dnow.getDate(), fstar = ''; 
        if(!(SM==xMonth)){ break; } 
        var iWDay = dnow.getDay(); //console.log(xMonth+'-'+iWDay+':'+i+':'+nDays); 
        //处理前空白
        if(i==0){sMounth += nullCells(iWDay,'');}
        if((iWDay==0)&&(i>0)){ sMounth += "</tr><tr>"; rows++; } //换行
        //处理六行
        sixFlag = sixLine(nDays,iWDay,i);
        //农历对象
        var nlObj = new objLunar(new Date(SY,SM,SD)); 
        sDay = strLunar(nlObj).toString(); 
        sTerm = strTerm(SY,SM,SD); 
        var fprnt = yno>1900 ? ' &nbsp; ' : '';
        //处理纪念日
        m = parseInt(xMonth)+1; m = m<10 ? "0"+m : m;
        d = parseInt(SD);       d = d<10 ? "0"+d : d;
        if(cdaya1[m+''+d]){ 
            cdays1 += "<span class='nitem'>"+fprnt+"("+m+''+d+"日)"+cdaya1[m+''+d]+'</span>';
            fstar = strMark;
        }
        m = parseInt(nlObj.month); m = m<10 ? "0"+m : m;
        d = parseInt(nlObj.day);   d = d<10 ? "0"+d : d;
        if(cdaya2[m+''+d]){ 
            cdays2 += "<span class='nitem'>"+fprnt+"(农历"+m+''+d+"日)"+cdaya2[m+''+d]+'</span>';
            fstar = strMark;
        }
        //组某日字串
        var str1 = oneCell(SY,SM,SD,sDay,sTerm,sixFlag);
        var mark = fstar ? "<i class='mark'>*</i>" : '';
        var cssToday = (strToday==SY+'-'+SM+'-'+SD) ? ' today' : '';
        sMounth += "<td class='day1"+cssToday+"'>"+mark+str1+"</td>";
    }
    //处理后空白 
    if(iWDay<6){sMounth += nullCells(iWDay,'End');}
    var tabTitle = "<table class='mtitle' cellpadding=0 cellspacing=0><tr><td class=tl>"+SY+'年'+(xMonth+1)+"月</td><td>&nbsp;</td><td class=tr>"+arrMonth[xMonth]+"</td></tr></table>";
    var pTitle = "<tr><td colspan='7'>"+tabTitle+"</td></tr>"; 
    var pNotes = "<tr><td colspan='7' class='notes'><span class='ntitle'>记事：</span>"+(rem ? cdays1+""+cdays2 : '')+"</td></tr>";
    return strHTab+pTitle+strHead+sMounth+pNotes+"</table>";
}

function listM02(xOffset){
    var Timer1 = (new Date()).getTime(); 
    nSM += xOffset; 
    if(nSM<0){ nSM = 11; nSY--; }
    if(nSM>11){ nSM = 0; nSY++; }
    var uby = nSY, ubm = nSM; //备份
    jsElm.jeID('cal_m1').innerHTML = listM01(nSY,nSM)+'<div>&nbsp;</div>'; 
    jsElm.jeID('cal_year').innerHTML = nSY; 
    //nSM++; if(nSM>11){ nSM = 0; nSY++; }
    //jsElm.jeID('cal_m2').innerHTML = listM01(nSY,nSM); 
    //nSY = uby, nSM = ubm; //还原
    var Timer2 = (new Date()).getTime();
    jsElm.jeID('cal_Timer').innerHTML = Timer2-Timer1;
}

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
