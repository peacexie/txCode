
		//sop=irow.replace(/[^+|\-|*|\/]/g,'');
		//if(sops.indexOf(sop)>0) continue; //同一序列的运算符号,只用一次 		
		//sex=','+irow.replace(/[+|\-|*|\/]/g,'0')+','; //console.log(irow+':'+sex);
		//if(sexs.indexOf(sex)>0) continue; //同一序列的组合方式,只用一次[(A0B)0(C0D)]
		//#snm=','+A+B+C+D+','; console.log(snm);
		//#if(snms.indexOf(snm)>0) continue; //同一序列的数字组合,只用一次


	//var sog, sogs='(,', gopa=new Array('+','-','*','/'), gops, gopt, g1, g2;

		/*
		sog = ''; //同一序列的运算符号,只用一次 
		gopt = irow.replace(/[^+|\-|*|\/]/g,'');
		gops = new Array('','','','');
		for(g1=0;g1<gopt.length;g1++){
			gt = gopt.charAt(g1);
			for(g2=0;g2<gopa.length;g2++){
				if(gt==gopa[g2]){ gops[g2] += gt; }
			}
		} //console.log(sog);
		for(g1=0;g1<gops.length;g1++){ sog += gops[g1]; } 
		//if(sogs.indexOf(sog)>0) continue;
		*/
		
				//sogs += sog+',';		

//var sop, snm, sex, snms='(,', sops='(,', sexs='(,'
			/*
			sex=','+irow.replace(/[+|\-|*|\/]/g,'0')+',';
			if(sexs.indexOf(sex)>0) continue; //不同序列的组合方式,有前一个就忽略后续一个或几个
			snm=','+A+B+C+D+',';
			if(snms.indexOf(snm)>0) continue; //同一序列的数字组合,只用一次
			sop=irow.replace(/[^+|\-|*|\/]/g,'');
			if(sops.indexOf(sop)>0) continue; //同一序列的运算符号,只用一次 
			//*/
				/*
				sops += sop+',';
				snms += snm+','; //console.log(sex);
				if(sex==',A0(B0C0D),'){
					sex += ',(A0B0C)0D,';	 
				}
				if(sex==',A0((B0C)0D),'){
					sex += ',A0(B0(C0D)),((A0B)0C)0D,(A0(B0C))0D,';	
				}
				if(sex==',A0B0(C0D),'){
					sex += ',A0(B0C)0D,(A0B)0C0D,';	 
				}	
				sexs += sex+',';
				//*/

// http://www.docin.com/p-102924933.html

// '运算符组合
// 'sOPA="+++;++-;++*;++/;+--;+-*;+-/;+**;+*/;+//;---;--*;--/;-**;-*/;-//;***;**/;*//;///"
//  sOPA="+++;***;++-;---;+--;**/;*//;///;++*;+**;-**;++/;--*;+-*;+*/;+//;--/;-*/;-//;+-/"

//*
var aExp = new Array();
var aOps = new Array('+','-','*','/');
var n=0, m=0, s='(,'; //, sout=''

aExp[0]="AxByCzD";
aExp[1]="AxBy(CzD)";
aExp[2]="Ax(ByC)zD";
aExp[3]="(AxB)yCzD";
aExp[4]="(AxB)y(CzD)";
aExp[5]="Ax(ByCzD)";  
aExp[6]="Ax((ByC)zD)"; 

aExp[7]="Ax(By(CzD))"; 
aExp[8]="(AxByC)zD"; 
aExp[9]="((AxB)yC)zD"; 
aExp[10]="(Ax(ByC))zD"; 

function fExp1(sexp){
	var texp = sexp.replace('A',11).replace('B',101).replace('C',1009).replace('D',10007);
	var sout = '';
	for(var i=0;i<4;i++){
	for(var j=0;j<4;j++){
	for(var k=0;k<4;k++){
		m++;
		var uexp = sexp.replace('x',aOps[i]).replace('y',aOps[j]).replace('z',aOps[k]);
		var cacu = texp.replace('x',aOps[i]).replace('y',aOps[j]).replace('z',aOps[k]);
		var cres = eval(cacu);
		if(s.indexOf(','+cres+',')<=0){
			s += cres+','; 
			n++;
			sout += uexp+';';
			console.log(n+'/'+m+' : '+uexp+' : '+cacu+' : '+cres);
		}else{
			console.log(n+'/'+m+' : ');	
		}
		//console.log(uexp+':'+cacu);
	} } } 
	return sout;
}

function fExpA(){
	var sout = '';
	for(var i=0;i<aExp.length;i++){
		sout += fExp1(aExp[i]);
	}
	return sout;
	
}
//var tExps = fExpA(); console.log(tExps);
//fExp1(aExp[1]);

//11*64(4*4*4)=704(188)
//188*24=4512

//*/

// ===========================================================================================================================

var sA20 = new Array(20);

//'+++,***(2)<br>
sA20[0]="a+b+c+d;a*b*c*d";//'<br>
//'++-(14)<br>
sA20[1]="a+b+c-d;a+b+d-c;a+c+d-b;b+c+d-a;a+b-(c+d);a+c-(b+d);a+d-(b+c);b+c-(a+d);b+d-(a+c);c+d-(b+a);a-(b+c+d);b-(a+c+d);c-(b+a+d);d-(b+c+a)";//'<br>
//'---(14)<br>
sA20[2]="a-b-c-d;b-a-c-d;c-b-a-d;d-b-c-a;a-b-(c-d);a-b-(d-c);a-c-(d-b);b-a-(c-d);b-a-(d-c);c-b-(a-d);a-(b-c-d);a-(c-b-d);a-(d-b-c);b-(a-c-d)";//'<br>
//'+--(14)<br>
sA20[3]="a+b-c-d;a+c-b-d;a+d-b-c;b+c-a-d;b+d-a-c;c+d-b-a;a+b-(c-d);a+b-(d-c);a+c-(b-d);b+c-(a-d);a-b-(c+d);b-a-(c+d);c-b-(a+d);d-b-(c+a)";//'<br>
//'**/(14)<br>
sA20[4]="a*b*c/d;a*b*d/c;a*c*d/b;b*c*d/a;a*b/(c*d);a*c/(b*d);a*d/(b*c);b*c/(a*d);b*d/(a*c);c*d/(b*a);a/(b*c*d);b/(a*c*d);c/(b*a*d);d/(b*c*a)";//'<br>
//'*//(16)<br>
sA20[5]="a*b/c/d;a*c/b/d;a*d/b/c;b*c/a/d;b*d/a/c;c*d/b/a;a/b*c/d;a*b/(c/d);a*b/(d/c);a*c/(b/d);b*c/(a/d);a/b/(c*d);b/a/(c*d);c/b/(a*d);d/b/(c*a);d/(b*c)/a";//'<br>
//'///(15)<br>
sA20[6]="a/b/c/d;b/a/c/d;c/b/a/d;d/b/c/a;d/b/a/c;a/b/(c/d);a/b/(d/c);a/c/(d/b);b/a/(c/d);b/a/(d/c);c/b/(a/d);a/(b/c/d);a/(c/b/d);a/(d/b/c);b/(a/c/d)";//'<br>
//'++*(25)<br>
sA20[7]="a+b+c*d;a+c+b*d;a+d+b*c;b+c+a*d;b+d+a*c;c+d+b*a;a+b*(c+d);a+c*(b+d);a+d*(b+c);b+a*(c+d);b+c*(a+d);b+d*(a+c);c+b*(a+d);c+a*(b+d);c+d*(b+a);d+b*(c+a);d+c*(b+a);d+a*(b+c);(a+b)*(c+d);(a+c)*(b+d);(a+d)*(b+c);a*(b+c+d);b*(a+c+d);c*(b+a+d);d*(b+c+a)";//'<br>
//'+**(25)<br>
sA20[8]="a+b*c*d;b+a*c*d;c+b*a*d;d+b*c*a;a*b+c*d;a*c+b*d;a*d+b*c;a*b*(c+d);a*c*(b+d);a*d*(b+c);b*c*(a+d);b*d*(a+c);c*d*(b+a);a*(b+c*d);a*(c+b*d);a*(d+b*c);b*(a+c*d);b*(c+a*d);b*(d+a*c);c*(b+a*d);c*(a+b*d);c*(d+b*a);d*(b+c*a);d*(c+b*a);d*(a+b*c)";//'<br>
//'-**(50)<br>
sA20[9]="a-b*c*d;b-a*c*d;c-b*a*d;d-b*c*a;a*b-c*d;a*c-b*d;a*d-b*c;b*c-a*d;b*d-a*c;c*d-b*a;a*b*c-d;a*b*d-c;a*c*d-b;b*c*d-a;a*b*(c-d);a*b*(d-c);a*c*(b-d);a*c*(d-b);a*d*(b-c);a*d*(c-b);b*c*(a-d);b*c*(d-a);b*d*(a-c);b*d*(c-a);c*d*(b-a);c*d*(a-b);a*(b-c*d);a*(c-b*d);a*(d-b*c);b*(a-c*d);b*(c-a*d);b*(d-a*c);c*(b-a*d);c*(a-b*d);c*(d-b*a);d*(b-c*a);d*(c-b*a);d*(a-b*c);a*(b*c-d);a*(b*d-c);a*(c*d-b);b*(a*c-d);b*(a*d-c);b*(c*d-a);c*(b*a-d);c*(b*d-a);c*(a*d-b);d*(b*c-a);d*(b*a-c);d*(c*a-b)";//'<br>
//'++/(50)<br>
sA20[10]="a+b+c/d;a+b+d/c;a+c+b/d;a+c+d/b;a+d+b/c;a+d+c/b;b+c+a/d;b+c+d/a;b+d+a/c;b+d+c/a;c+d+b/a;c+d+a/b;a+b/(c+d);a+c/(b+d);a+d/(b+c);b+a/(c+d);b+c/(a+d);b+d/(a+c);c+b/(a+d);c+a/(b+d);c+d/(b+a);d+b/(c+a);d+c/(b+a);d+a/(b+c);a+(b+c)/d;a+(b+d)/c;a+(c+d)/b;b+(a+c)/d;b+(a+d)/c;b+(c+d)/a;c+(b+a)/d;c+(b+d)/a;c+(a+d)/b;d+(b+c)/a;d+(b+a)/c;d+(c+a)/b;(a+b)/(c+d);(a+c)/(b+d);(a+d)/(b+c);(b+c)/(a+d);(b+d)/(a+c);(c+d)/(b+a);a/(b+c+d);b/(a+c+d);c/(b+a+d);d/(b+c+a);(a+b+c)/d;(a+b+d)/c;(a+c+d)/b;(b+c+d)/a";//'<br>
//'--*(114)<br>
sA20[11]="a-b-c*d;a-c-b*d;a-d-b*c;b-a-c*d;b-c-a*d;b-d-a*c;c-b-a*d;c-a-b*d;c-d-b*a;d-b-c*a;d-c-b*a;d-a-b*c;a*b-c-d;a*c-b-d;a*d-b-c;b*c-a-d;b*d-a-c;c*d-b-a;a-b*(c-d);a-b*(d-c);a-c*(b-d);a-c*(d-b);a-d*(b-c);a-d*(c-b);b-a*(c-d);b-a*(d-c);b-c*(a-d);b-c*(d-a);b-d*(a-c);b-d*(c-a);c-b*(a-d);c-b*(d-a);c-a*(b-d);c-a*(d-b);c-d*(b-a);c-d*(a-b);d-b*(c-a);d-b*(a-c);d-c*(b-a);d-c*(a-b);d-a*(b-c);d-a*(c-b);a*b-(c-d);a*b-(d-c);a*c-(b-d);a*c-(d-b);a*d-(b-c);a*d-(c-b);b*c-(a-d);b*c-(d-a);b*d-(a-c);b*d-(c-a);c*d-(b-a);c*d-(a-b);a*(b-c)-d;a*(b-d)-c;a*(c-b)-d;a*(c-d)-b;a*(d-b)-c;a*(d-c)-b;b*(a-c)-d;b*(a-d)-c;b*(c-a)-d;b*(c-d)-a;b*(d-a)-c;b*(d-c)-a;c*(b-a)-d;c*(b-d)-a;c*(a-b)-d;c*(a-d)-b;c*(d-b)-a;c*(d-a)-b;d*(b-c)-a;d*(b-a)-c;d*(c-b)-a;d*(c-a)-b;d*(a-b)-c;d*(a-c)-b;(a-b)*(c-d);(a-b)*(d-c);(a-c)*(b-d);(a-c)*(d-b);(a-d)*(b-c);(a-d)*(c-b);a-(b*c-d);a-(b*d-c);a-(c*d-b);b-(a*c-d);b-(a*d-c);c-(b*a-d);a*(b-c-d);a*(c-b-d);a*(d-b-c);b*(a-c-d);b*(c-a-d);b*(d-a-c);c*(b-a-d);c*(a-b-d);c*(d-b-a);d*(b-c-a);d*(c-b-a);d*(a-b-c);a*(b-(c-d));a*(b-(d-c));a*(c-(b-d));b*(a-(c-d));b*(a-(d-c));b*(c-(a-d));c*(b-(a-d));c*(b-(d-a));c*(a-(b-d));d*(b-(c-a));d*(b-(a-c));d*(c-(b-a))";//'<br>
//'+-*(120)<br>
sA20[12]="a+b-c*d;a+c-b*d;a+d-b*c;b+c-a*d;b+d-a*c;c+d-b*a;a+b*c-d;a+b*d-c;a+c*d-b;b+a*c-d;b+a*d-c;b+c*d-a;c+b*a-d;c+b*d-a;c+a*d-b;d+b*c-a;d+b*a-c;d+c*a-b;a+b*(c-d);a+b*(d-c);a+c*(b-d);a+c*(d-b);a+d*(b-c);a+d*(c-b);b+a*(c-d);b+a*(d-c);b+c*(a-d);b+c*(d-a);b+d*(a-c);b+d*(c-a);c+b*(a-d);c+b*(d-a);c+a*(b-d);c+a*(d-b);c+d*(b-a);c+d*(a-b);d+b*(c-a);d+b*(a-c);d+c*(b-a);d+c*(a-b);d+a*(b-c);d+a*(c-b);a-b*(c+d);a-c*(b+d);a-d*(b+c);b-a*(c+d);b-c*(a+d);b-d*(a+c);c-b*(a+d);c-a*(b+d);c-d*(b+a);d-b*(c+a);d-c*(b+a);d-a*(b+c);a*b-(c+d);a*c-(b+d);a*d-(b+c);b*c-(a+d);b*d-(a+c);c*d-(b+a);a*(b+c)-d;a*(b+d)-c;a*(c+d)-b;b*(a+c)-d;b*(a+d)-c;b*(c+d)-a;c*(b+a)-d;c*(b+d)-a;c*(a+d)-b;d*(b+c)-a;d*(b+a)-c;d*(c+a)-b;(a+b)*(c-d);(a+b)*(d-c);(a+c)*(b-d);(a+c)*(d-b);(a+d)*(b-c);(a+d)*(c-b);(b+c)*(a-d);(b+c)*(d-a);(b+d)*(a-c);(b+d)*(c-a);(c+d)*(b-a);(c+d)*(a-b);a-(b+c*d);a-(c+b*d);a-(d+b*c);b-(a+c*d);b-(c+a*d);b-(d+a*c);c-(b+a*d);c-(a+b*d);c-(d+b*a);d-(b+c*a);d-(c+b*a);d-(a+b*c);a*(b+c-d);a*(b+d-c);a*(c+d-b);b*(a+c-d);b*(a+d-c);b*(c+d-a);c*(b+a-d);c*(b+d-a);c*(a+d-b);d*(b+c-a);d*(b+a-c);d*(c+a-b);a*(b-(c+d));a*(c-(b+d));a*(d-(b+c));b*(a-(c+d));b*(c-(a+d));b*(d-(a+c));c*(b-(a+d));c*(a-(b+d));c*(d-(b+a));d*(b-(c+a));d*(c-(b+a));d*(a-(b+c))";//'<br>
//'+*/(121)<br>
sA20[13]="a+b*c/d;a+b*d/c;a+c*d/b;b+a*c/d;b+a*d/c;b+c*d/a;c+b*a/d;c+b*d/a;c+a*d/b;d+b*c/a;d+b*a/c;d+c*a/b;a*b+c/d;a*b+d/c;a*c+b/d;a*c+d/b;a*d+b/c;a*d+c/b;b*c+a/d;b*c+d/a;b*d+a/c;b*d+c/a;c*d+b/a;c*d+a/b;a+b/(c*d);a+c/(b*d);a+d/(b*c);b+a/(c*d);b+c/(a*d);b+d/(a*c);c+b/(a*d);c+a/(b*d);c+d/(b*a);d+b/(c*a);d+c/(b*a);d+a/(b*c);a*b/(c+d);a*c/(b+d);a*d/(b+c);b*c/(a+d);b*d/(a+c);c*d/(b+a);a/b*(c+d);a/c*(b+d);a/d*(b+c);b/a*(c+d);b/c*(a+d);b/d*(a+c);c/b*(a+d);c/a*(b+d);c/d*(b+a);d/b*(c+a);d/c*(b+a);d/a*(b+c);d/(c+a)*b;(a+b)/(c*d);(a+c)/(b*d);(a+d)/(b*c);(b+c)/(a*d);(b+d)/(a*c);(c+d)/(b*a);a*(b+c/d);a*(b+d/c);a*(c+b/d);a*(c+d/b);a*(d+b/c);a*(d+c/b);b*(a+c/d);b*(a+d/c);b*(c+a/d);b*(c+d/a);b*(d+a/c);b*(d+c/a);c*(b+a/d);c*(b+d/a);c*(a+b/d);c*(a+d/b);c*(d+b/a);c*(d+a/b);d*(b+c/a);d*(b+a/c);d*(c+b/a);d*(c+a/b);d*(a+b/c);d*(a+c/b);a/(b+c*d);a/(c+b*d);a/(d+b*c);b/(a+c*d);b/(c+a*d);b/(d+a*c);c/(b+a*d);c/(a+b*d);c/(d+b*a);d/(b+c*a);d/(c+b*a);d/(a+b*c);a/((b+c)*d);a/((b+d)*c);a/((c+d)*b);b/((a+c)*d);b/((a+d)*c);b/((c+d)*a);c/((b+a)*d);c/((b+d)*a);c/((a+d)*b);d/((b+c)*a);d/((b+a)*c);d/((c+a)*b);(a+b*c)/d;(a+b*d)/c;(a+c*d)/b;(b+a*c)/d;(b+a*d)/c;(b+c*d)/a;(c+b*a)/d;(c+b*d)/a;(c+a*d)/b;(d+b*c)/a;(d+b*a)/c;(d+c*a)/b";//'<br>
//'+//(122)<br>
sA20[14]="a+b/c/d;a+c/b/d;a+d/b/c;b+a/c/d;b+c/a/d;b+d/a/c;c+b/a/d;c+a/b/d;c+d/b/a;d+b/c/a;d+c/b/a;d+a/b/c;a/b+c/d;a/b+d/c;a/c+b/d;a/c+d/b;a/d+b/c;a/d+c/b;b/a+c/d;b/a+d/c;b/c+d/a;b/d+c/a;c/b+d/a;c/a+d/b;a+b/(c/d);a+b/(d/c);a+c/(b/d);b+a/(c/d);b+a/(d/c);b+c/(a/d);c+b/(a/d);c+b/(d/a);c+a/(b/d);d+b/(c/a);d+b/(a/c);d+c/(b/a);a/b/(c+d);a/c/(b+d);a/d/(b+c);b/a/(c+d);b/c/(a+d);b/d/(a+c);c/b/(a+d);c/a/(b+d);c/d/(b+a);d/b/(c+a);d/c/(b+a);d/a/(b+c);(a+b)/c/d;(a+c)/b/d;(a+d)/b/c;(b+c)/a/d;(b+d)/a/c;(c+d)/b/a;(a+b)/(c/d);(a+b)/(d/c);(a+c)/(b/d);(a+c)/(d/b);(a+d)/(b/c);(a+d)/(c/b);(b+c)/(a/d);(b+c)/(d/a);(b+d)/(a/c);(b+d)/(c/a);(c+d)/(b/a);(c+d)/(a/b);a/(b+c/d);a/(b+d/c);a/(c+b/d);a/(c+d/b);a/(d+b/c);a/(d+c/b);b/(a+c/d);b/(a+d/c);b/(c+a/d);b/(c+d/a);b/(d+a/c);b/(d+c/a);c/(b+a/d);c/(b+d/a);c/(a+b/d);c/(a+d/b);c/(d+b/a);c/(d+a/b);d/(b+c/a);d/(b+a/c);d/(c+b/a);d/(c+a/b);d/(a+b/c);d/(a+c/b);a/((b+c)/d);a/((b+d)/c);a/((c+d)/b);b/((a+c)/d);b/((a+d)/c);c/((b+a)/d);c/((b+d)/a);d/((c+a)/b);(a+b/c)/d;(a+b/d)/c;(a+c/b)/d;(a+c/d)/b;(a+d/b)/c;(a+d/c)/b;(b+a/c)/d;(b+a/d)/c;(b+c/a)/d;(b+c/d)/a;(b+d/a)/c;(b+d/c)/a;(c+b/a)/d;(c+b/d)/a;(c+a/b)/d;(c+a/d)/b;(c+d/b)/a;(c+d/a)/b;(d+b/c)/a;(d+b/a)/c;(d+c/b)/a;(d+c/a)/b;(d+a/b)/c;(d+a/c)/b";//'<br>
//'--/(232)<br>
sA20[15]="a-b-c/d;a-b-d/c;a-c-b/d;a-c-d/b;a-d-b/c;a-d-c/b;b-a-c/d;b-a-d/c;b-c-a/d;b-c-d/a;b-d-a/c;b-d-c/a;c-b-a/d;c-b-d/a;c-a-b/d;c-a-d/b;c-d-b/a;c-d-a/b;d-b-c/a;d-b-a/c;d-c-b/a;d-c-a/b;d-a-b/c;d-a-c/b;c-d/a-b;d-c/a-b;a/b-c-d;a/c-b-d;a/d-b-c;b/a-c-d;b/c-a-d;b/d-a-c;c/b-a-d;c/a-b-d;c/d-b-a;d/b-c-a;d/c-b-a;d/a-b-c;a-b/(c-d);a-b/(d-c);a-c/(b-d);a-c/(d-b);a-d/(b-c);a-d/(c-b);b-a/(c-d);b-a/(d-c);b-c/(a-d);b-c/(d-a);b-d/(a-c);b-d/(c-a);c-b/(a-d);c-b/(d-a);c-a/(b-d);c-a/(d-b);c-d/(b-a);c-d/(a-b);d-b/(c-a);d-b/(a-c);d-c/(b-a);d-c/(a-b);d-a/(b-c);d-a/(c-b);a/b-(c-d);a/b-(d-c);a/c-(b-d);a/c-(d-b);a/d-(b-c);a/d-(c-b);b/a-(c-d);b/a-(d-c);b/c-(a-d);b/c-(d-a);b/d-(a-c);b/d-(c-a);c/b-(a-d);c/b-(d-a);c/a-(b-d);c/a-(d-b);c/d-(b-a);c/d-(a-b);d/b-(c-a);d/b-(a-c);d/c-(b-a);d/c-(a-b);d/a-(b-c);d/a-(c-b);a-(b-c)/d;a-(b-d)/c;a-(c-b)/d;a-(c-d)/b;a-(d-b)/c;a-(d-c)/b;b-(a-c)/d;b-(a-d)/c;b-(c-a)/d;b-(c-d)/a;b-(d-a)/c;b-(d-c)/a;c-(b-a)/d;c-(b-d)/a;c-(a-b)/d;c-(a-d)/b;c-(d-b)/a;c-(d-a)/b;d-(b-c)/a;d-(b-a)/c;d-(c-b)/a;d-(c-a)/b;d-(a-b)/c;d-(a-c)/b;a/(b-c)-d;a/(b-d)-c;a/(c-b)-d;a/(c-d)-b;a/(d-b)-c;a/(d-c)-b;b/(a-c)-d;b/(a-d)-c;b/(c-a)-d;b/(c-d)-a;b/(d-a)-c;b/(d-c)-a;c/(b-a)-d;c/(b-d)-a;c/(a-b)-d;c/(a-d)-b;c/(d-b)-a;c/(d-a)-b;d/(b-c)-a;d/(b-a)-c;d/(c-b)-a;d/(c-a)-b;d/(a-b)-c;d/(a-c)-b;(a-b)/c-d;(a-b)/d-c;(a-c)/b-d;(a-c)/d-b;(a-d)/b-c;(a-d)/c-b;(b-a)/c-d;(b-a)/d-c;(b-c)/a-d;(b-c)/d-a;(b-d)/a-c;(b-d)/c-a;(c-b)/a-d;(c-b)/d-a;(c-a)/b-d;(c-a)/d-b;(c-d)/b-a;(c-d)/a-b;(d-b)/c-a;(d-b)/a-c;(d-c)/b-a;(d-c)/a-b;(d-a)/b-c;(d-a)/c-b;(a-b)/(c-d);(a-b)/(d-c);(a-c)/(b-d);(a-c)/(d-b);(a-d)/(b-c);(a-d)/(c-b);(b-c)/(a-d);(b-c)/(d-a);(b-d)/(a-c);(b-d)/(c-a);(c-d)/(b-a);(c-d)/(a-b);b-(c-d/a);b-(d-c/a);a-(b/c-d);a-(b/d-c);a-(c/b-d);a-(c/d-b);a-(d/b-c);a-(d/c-b);b-(a/c-d);b-(a/d-c);b-(c/a-d);b-(d/a-c);c-(b/a-d);c-(a/b-d);a/(b-c-d);a/(c-b-d);a/(d-b-c);b/(a-c-d);b/(c-a-d);b/(d-a-c);c/(b-a-d);c/(a-b-d);c/(d-b-a);d/(b-c-a);d/(c-b-a);d/(a-b-c);a/(b-(c-d));a/(b-(d-c));a/(c-(b-d));b/(a-(c-d));b/(a-(d-c));b/(c-(a-d));c/(b-(a-d));c/(b-(d-a));c/(a-(b-d));d/(b-(c-a));d/(b-(a-c));d/(c-(b-a));(a-b-c)/d;(a-b-d)/c;(a-c-d)/b;(b-a-c)/d;(b-a-d)/c;(b-c-d)/a;(c-b-a)/d;(c-b-d)/a;(c-a-d)/b;(d-b-c)/a;(d-b-a)/c;(d-c-a)/b;(a-(b-c))/d;(a-(b-d))/c;(a-(c-b))/d;(a-(c-d))/b;(a-(d-b))/c;(a-(d-c))/b;(b-(a-c))/d;(b-(a-d))/c;(b-(c-d))/a;(b-(d-c))/a;(c-(b-d))/a;(c-(a-d))/b";//'<br>
//'-*/(244)<br>
sA20[16]="a-b*c/d;a-b*d/c;a-c*d/b;b-a*c/d;b-a*d/c;b-c*d/a;c-b*a/d;c-b*d/a;c-a*d/b;d-b*c/a;d-b*a/c;d-c*a/b;d-c/a*b;a*b-c/d;a*b-d/c;a*c-b/d;a*c-d/b;a*d-b/c;a*d-c/b;b*c-a/d;b*c-d/a;b*d-a/c;b*d-c/a;c*d-b/a;c*d-a/b;a*b/c-d;a*b/d-c;a*c/b-d;a*c/d-b;a*d/b-c;a*d/c-b;b*c/a-d;b*c/d-a;b*d/a-c;b*d/c-a;c*d/b-a;c*d/a-b;a/b-c*d;a/c-b*d;a/d-b*c;b/a-c*d;b/c-a*d;b/d-a*c;c/b-a*d;c/a-b*d;c/d-b*a;d/b-c*a;d/c-b*a;d/a-b*c;c/a*b-d;a-b/(c*d);a-c/(b*d);a-d/(b*c);b-a/(c*d);b-c/(a*d);b-d/(a*c);c-b/(a*d);c-a/(b*d);c-d/(b*a);d-b/(c*a);d-c/(b*a);d-a/(b*c);a*b/(c-d);a*b/(d-c);a*c/(b-d);a*c/(d-b);a*d/(b-c);a*d/(c-b);b*c/(a-d);b*c/(d-a);b*d/(a-c);b*d/(c-a);c*d/(b-a);c*d/(a-b);a/b*(c-d);a/b*(d-c);a/c*(b-d);a/c*(d-b);a/d*(b-c);a/d*(c-b);b/a*(c-d);b/a*(d-c);b/c*(a-d);b/c*(d-a);b/d*(a-c);b/d*(c-a);c/b*(a-d);c/b*(d-a);c/a*(b-d);c/a*(d-b);c/d*(b-a);c/d*(a-b);d/b*(c-a);d/b*(a-c);d/c*(b-a);d/c*(a-b);d/a*(b-c);d/a*(c-b);a/(b*c)-d;a/(b*d)-c;a/(c*d)-b;b/(a*c)-d;b/(a*d)-c;b/(c*d)-a;c/(b*a)-d;c/(b*d)-a;c/(a*d)-b;d/(b*c)-a;d/(b*a)-c;d/(c*a)-b;(c-d)/a*b;(d-c)/a*b;(a-b)/(c*d);(a-c)/(b*d);(a-d)/(b*c);(b-a)/(c*d);(b-c)/(a*d);(b-d)/(a*c);(c-b)/(a*d);(c-a)/(b*d);(c-d)/(b*a);(d-b)/(c*a);(d-c)/(b*a);(d-a)/(b*c);a*(b-c/d);a*(b-d/c);a*(c-b/d);a*(c-d/b);a*(d-b/c);a*(d-c/b);b*(a-c/d);b*(a-d/c);b*(c-a/d);b*(c-d/a);b*(d-a/c);b*(d-c/a);c*(b-a/d);c*(b-d/a);c*(a-b/d);c*(a-d/b);c*(d-b/a);c*(d-a/b);d*(b-c/a);d*(b-a/c);d*(c-b/a);d*(c-a/b);d*(a-b/c);d*(a-c/b);a*(b/c-d);a*(b/d-c);a*(c/b-d);a*(c/d-b);a*(d/b-c);a*(d/c-b);b*(a/c-d);b*(a/d-c);b*(c/a-d);b*(c/d-a);b*(d/a-c);b*(d/c-a);c*(b/a-d);c*(b/d-a);c*(a/b-d);c*(a/d-b);c*(d/b-a);c*(d/a-b);d*(b/c-a);d*(b/a-c);d*(c/b-a);d*(c/a-b);d*(a/b-c);d*(a/c-b);a/(b-c*d);a/(c-b*d);a/(d-b*c);b/(a-c*d);b/(c-a*d);b/(d-a*c);c/(b-a*d);c/(a-b*d);c/(d-b*a);d/(b-c*a);d/(c-b*a);d/(a-b*c);a/(b*c-d);a/(b*d-c);a/(c*d-b);b/(a*c-d);b/(a*d-c);b/(c*d-a);c/(b*a-d);c/(b*d-a);c/(a*d-b);d/(b*c-a);d/(b*a-c);d/(c*a-b);a/((b-c)*d);a/((b-d)*c);a/((c-b)*d);a/((c-d)*b);a/((d-b)*c);a/((d-c)*b);b/((a-c)*d);b/((a-d)*c);b/((c-a)*d);b/((c-d)*a);b/((d-a)*c);b/((d-c)*a);c/((b-a)*d);c/((b-d)*a);c/((a-b)*d);c/((a-d)*b);c/((d-b)*a);c/((d-a)*b);d/((b-c)*a);d/((b-a)*c);d/((c-b)*a);d/((c-a)*b);d/((a-b)*c);d/((a-c)*b);(a-b*c)/d;(a-b*d)/c;(a-c*d)/b;(b-a*c)/d;(b-a*d)/c;(b-c*d)/a;(c-b*a)/d;(c-b*d)/a;(c-a*d)/b;(d-b*c)/a;(d-b*a)/c;(d-c*a)/b;(a*b-c)/d;(a*b-d)/c;(a*c-b)/d;(a*c-d)/b;(a*d-b)/c;(a*d-c)/b;(b*c-a)/d;(b*c-d)/a;(b*d-a)/c;(b*d-c)/a;(c*d-b)/a;(c*d-a)/b";//'<br>
//'-//(244)<br>
sA20[17]="a-b/c/d;a-c/b/d;a-d/b/c;b-a/c/d;b-c/a/d;b-d/a/c;c-b/a/d;c-a/b/d;c-d/b/a;d-b/c/a;d-c/b/a;d-a/b/c;a/b-c/d;a/b-d/c;a/c-b/d;a/c-d/b;a/d-b/c;a/d-c/b;b/a-c/d;b/a-d/c;b/c-a/d;b/c-d/a;b/d-a/c;b/d-c/a;c/b-a/d;c/b-d/a;c/a-b/d;c/a-d/b;c/d-b/a;c/d-a/b;d/b-c/a;d/b-a/c;d/c-b/a;d/c-a/b;d/a-b/c;d/a-c/b;a/b/c-d;a/b/d-c;a/c/d-b;b/a/c-d;b/a/d-c;b/c/d-a;c/b/a-d;c/b/d-a;c/a/d-b;d/b/c-a;d/b/a-c;d/c/a-b;a-b/(c/d);a-b/(d/c);a-c/(b/d);b-a/(c/d);b-a/(d/c);b-c/(a/d);c-b/(a/d);c-b/(d/a);c-a/(b/d);d-b/(c/a);d-b/(a/c);d-c/(b/a);a/b/(c-d);a/b/(d-c);a/c/(b-d);a/c/(d-b);a/d/(b-c);a/d/(c-b);b/a/(c-d);b/a/(d-c);b/c/(a-d);b/c/(d-a);b/d/(a-c);b/d/(c-a);c/b/(a-d);c/b/(d-a);c/a/(b-d);c/a/(d-b);c/d/(b-a);c/d/(a-b);d/b/(c-a);d/b/(a-c);d/c/(b-a);d/c/(a-b);d/a/(b-c);d/a/(c-b);a/(b/c)-d;a/(b/d)-c;a/(c/b)-d;a/(c/d)-b;a/(d/b)-c;a/(d/c)-b;b/(a/c)-d;b/(a/d)-c;b/(c/d)-a;b/(d/c)-a;c/(b/d)-a;c/(a/d)-b;(a-b)/c/d;(a-b)/d/c;(a-c)/b/d;(a-d)/b/c;(b-a)/c/d;(b-a)/d/c;(b-c)/a/d;(b-d)/a/c;(c-b)/a/d;(c-a)/b/d;(c-d)/b/a;(d-b)/c/a;(d-c)/b/a;(d-a)/b/c;(a-b)/(c/d);(a-b)/(d/c);(a-c)/(b/d);(a-c)/(d/b);(a-d)/(b/c);(a-d)/(c/b);(b-a)/(c/d);(b-a)/(d/c);(b-c)/(a/d);(b-c)/(d/a);(b-d)/(a/c);(b-d)/(c/a);(c-b)/(a/d);(c-b)/(d/a);(c-a)/(b/d);(c-a)/(d/b);(c-d)/(b/a);(c-d)/(a/b);(d-b)/(c/a);(d-b)/(a/c);(d-c)/(b/a);(d-c)/(a/b);(d-a)/(b/c);(d-a)/(c/b);a/(b-c/d);a/(b-d/c);a/(c-b/d);a/(c-d/b);a/(d-b/c);a/(d-c/b);b/(a-c/d);b/(a-d/c);b/(c-a/d);b/(c-d/a);b/(d-a/c);b/(d-c/a);c/(b-a/d);c/(b-d/a);c/(a-b/d);c/(a-d/b);c/(d-b/a);c/(d-a/b);d/(b-c/a);d/(b-a/c);d/(c-b/a);d/(c-a/b);d/(a-b/c);d/(a-c/b);a/(b/c-d);a/(b/d-c);a/(c/b-d);a/(c/d-b);a/(d/b-c);a/(d/c-b);b/(a/c-d);b/(a/d-c);b/(c/a-d);b/(c/d-a);b/(d/a-c);b/(d/c-a);c/(b/a-d);c/(b/d-a);c/(a/b-d);c/(a/d-b);c/(d/b-a);c/(d/a-b);d/(b/c-a);d/(b/a-c);d/(c/b-a);d/(c/a-b);d/(a/b-c);d/(a/c-b);a/((b-c)/d);a/((b-d)/c);a/((c-b)/d);a/((c-d)/b);a/((d-b)/c);a/((d-c)/b);b/((a-c)/d);b/((a-d)/c);b/((c-a)/d);b/((d-a)/c);c/((b-a)/d);c/((a-b)/d);b/(a/(c-d));b/(a/(d-c));(a-b/c)/d;(a-b/d)/c;(a-c/b)/d;(a-c/d)/b;(a-d/b)/c;(a-d/c)/b;(b-a/c)/d;(b-a/d)/c;(b-c/a)/d;(b-c/d)/a;(b-d/a)/c;(b-d/c)/a;(c-b/a)/d;(c-b/d)/a;(c-a/b)/d;(c-a/d)/b;(c-d/b)/a;(c-d/a)/b;(d-b/c)/a;(d-b/a)/c;(d-c/b)/a;(d-c/a)/b;(d-a/b)/c;(d-a/c)/b;(a/b-c)/d;(a/b-d)/c;(a/c-b)/d;(a/c-d)/b;(a/d-b)/c;(a/d-c)/b;(b/a-c)/d;(b/a-d)/c;(b/c-a)/d;(b/c-d)/a;(b/d-a)/c;(b/d-c)/a;(c/b-a)/d;(c/b-d)/a;(c/a-b)/d;(c/a-d)/b;(c/d-b)/a;(c/d-a)/b;(d/b-c)/a;(d/b-a)/c;(d/c-b)/a;(d/c-a)/b;(d/a-b)/c;(d/a-c)/b";//'<br>
//'+-/(243)<br>
sA20[18]="a+b-c/d;a+b-d/c;a+c-b/d;a+c-d/b;a+d-b/c;a+d-c/b;b+c-a/d;b+c-d/a;b+d-a/c;b+d-c/a;c+d-b/a;c+d-a/b;a+b/c-d;a+b/d-c;a+c/b-d;a+c/d-b;a+d/b-c;a+d/c-b;b+a/c-d;b+a/d-c;b+c/a-d;b+c/d-a;b+d/a-c;b+d/c-a;c+b/a-d;c+b/d-a;c+a/b-d;c+a/d-b;c+d/b-a;c+d/a-b;d+b/c-a;d+b/a-c;d+c/b-a;d+c/a-b;d+a/b-c;d+a/c-b;b-c+d/a;b-d+c/a;d-b+c/a;a+b/(c-d);a+b/(d-c);a+c/(b-d);a+c/(d-b);a+d/(b-c);a+d/(c-b);b+a/(c-d);b+a/(d-c);b+c/(a-d);b+c/(d-a);b+d/(a-c);b+d/(c-a);c+b/(a-d);c+b/(d-a);c+a/(b-d);c+a/(d-b);c+d/(b-a);c+d/(a-b);d+b/(c-a);d+b/(a-c);d+c/(b-a);d+c/(a-b);d+a/(b-c);d+a/(c-b);a-b/(c+d);a-c/(b+d);a-d/(b+c);b-a/(c+d);b-c/(a+d);b-d/(a+c);c-b/(a+d);c-a/(b+d);c-d/(b+a);d-b/(c+a);d-c/(b+a);d-a/(b+c);a/b-(c+d);a/c-(b+d);a/d-(b+c);b/a-(c+d);b/c-(a+d);b/d-(a+c);c/b-(a+d);c/a-(b+d);c/d-(b+a);d/b-(c+a);d/c-(b+a);d/a-(b+c);a+(b-c)/d;a+(b-d)/c;a+(c-b)/d;a+(c-d)/b;a+(d-b)/c;a+(d-c)/b;b+(a-c)/d;b+(a-d)/c;b+(c-a)/d;b+(c-d)/a;b+(d-a)/c;b+(d-c)/a;c+(b-a)/d;c+(b-d)/a;c+(a-b)/d;c+(a-d)/b;c+(d-b)/a;c+(d-a)/b;d+(b-c)/a;d+(b-a)/c;d+(c-b)/a;d+(c-a)/b;d+(a-b)/c;d+(a-c)/b;a-(b+c)/d;a-(b+d)/c;a-(c+d)/b;b-(a+c)/d;b-(a+d)/c;b-(c+d)/a;c-(b+a)/d;c-(b+d)/a;c-(a+d)/b;d-(b+c)/a;d-(b+a)/c;d-(c+a)/b;a/(b+c)-d;a/(b+d)-c;a/(c+d)-b;b/(a+c)-d;b/(a+d)-c;b/(c+d)-a;c/(b+a)-d;c/(b+d)-a;c/(a+d)-b;d/(b+c)-a;d/(b+a)-c;d/(c+a)-b;(a+b)/c-d;(a+b)/d-c;(a+c)/b-d;(a+c)/d-b;(a+d)/b-c;(a+d)/c-b;(b+c)/a-d;(b+c)/d-a;(b+d)/a-c;(b+d)/c-a;(c+d)/b-a;(c+d)/a-b;(a+b)/(c-d);(a+b)/(d-c);(a+c)/(b-d);(a+c)/(d-b);(a+d)/(b-c);(a+d)/(c-b);(b+c)/(a-d);(b+c)/(d-a);(b+d)/(a-c);(b+d)/(c-a);(c+d)/(b-a);(c+d)/(a-b);(a-b)/(c+d);(a-c)/(b+d);(a-d)/(b+c);(b-a)/(c+d);(b-c)/(a+d);(b-d)/(a+c);(c-b)/(a+d);(c-a)/(b+d);(c-d)/(b+a);(d-b)/(c+a);(d-c)/(b+a);(d-a)/(b+c);a-(b+c/d);a-(b+d/c);a-(c+b/d);a-(c+d/b);a-(d+b/c);a-(d+c/b);b-(a+c/d);b-(a+d/c);b-(c+a/d);b-(c+d/a);b-(d+a/c);b-(d+c/a);c-(b+a/d);c-(b+d/a);c-(a+b/d);c-(a+d/b);c-(d+b/a);c-(d+a/b);d-(b+c/a);d-(b+a/c);d-(c+b/a);d-(c+a/b);d-(a+b/c);d-(a+c/b);a/(b+c-d);a/(b+d-c);a/(c+d-b);b/(a+c-d);b/(a+d-c);b/(c+d-a);c/(b+a-d);c/(b+d-a);c/(a+d-b);d/(b+c-a);d/(b+a-c);d/(c+a-b);a/(b-(c+d));a/(c-(b+d));a/(d-(b+c));b/(a-(c+d));b/(c-(a+d));b/(d-(a+c));c/(b-(a+d));c/(a-(b+d));c/(d-(b+a));d/(b-(c+a));d/(c-(b+a));d/(a-(b+c));(a+b-c)/d;(a+b-d)/c;(a+c-b)/d;(a+c-d)/b;(a+d-b)/c;(a+d-c)/b;(b+c-a)/d;(b+c-d)/a;(b+d-a)/c;(b+d-c)/a;(c+d-b)/a;(c+d-a)/b;(a-(b+c))/d;(a-(b+d))/c;(a-(c+d))/b;(b-(a+c))/d;(b-(a+d))/c;(b-(c+d))/a;(c-(b+a))/d;(c-(b+d))/a;(c-(a+d))/b;(d-(b+c))/a;(d-(b+a))/c;(d-(c+a))/b";//'<br>


function cu24(cards){
	var a,b,c,d;
	a = cards[0];
	b = cards[1];
	c = cards[2];
	d = cards[3];
	var sr, ae, t1, t2, re, eall='(,', s='';
	for(var i=0;i<19;i++){
		sr = sA20[i];
		ae = sr.split(';');
		for(var j=0;j<ae.length;j++){
			t1 = ae[j].replace('a',a).replace('b',b).replace('c',c).replace('d',d);
			//t2 = ae[j].replace('a','x').replace('b','x').replace('c','x').replace('d','x');
			//if(eall.indexOf(','+t2+',')>0) continue;
			eval("re = "+t1+"");
			if(re==24){
				//eall += t2+',';
				s += '<i>'+t1+'<|i>';
				//console.log(t1);	
				break;
			}
		}
		
	}	
	return cuOutFmt(s);
}	
