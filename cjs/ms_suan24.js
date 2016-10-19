
function cusinp(type){ //ret,inp
	if(type=='inp'){
		$("#rowexp").hide();
		$("#rowinp").show();
		$('#inps').val($('#exps').html());
	}else{
		$("#rowinp").hide();
		$("#rowexp").show();
		var ret = $('#inps').val();
		ret = cuOutFmt(ret,1); 
		$('#exps').html(ret);	
	}
} 

function cuReset(type){
	$("#cupick").hide();
	$("#cutab").show();
	$("#rowinp").hide();
	$("#rowexp").show();
	if(type){
		for(var i=0;i<4;i++){
			jsElm.jeID('card'+i).innerHTML = '?';
			$("#cupick").show();
			$("#cutab").hide();
		}			
	}else{
		for(var i=0;i<4;i++){
			var r = parseInt((10000*Math.random())%nc24max)+1; 
			jsElm.jeID('card'+i).innerHTML = r;
		}	
	}
	jsElm.jeID('eout').innerHTML = '请计算！';
	exps.innerHTML = '';
	cuStyle();
} 

function cuStyle(){
	$(".cucards b").each(function(){ 
		var index = $(this).index();
		var r = parseInt((10000*Math.random())%3); 
		var hi = $(this).html();
		var hr = $(".cucards b").eq(r).html();
		$(this).html(hr);
		$(".cucards b").eq(r).html(hi);
		//$(".cucards b").eq(index);
	});	
}
function cuset(e){

	if(e.innerHTML){
		var a = e.innerHTML.split(',');
		for(var i=0;i<4;i++){
			jsElm.jeID('card'+i).innerHTML = a[i];
		}
		cuset('setok');
	}else if(e=='clear'){
		$(".cucards i").html('?');
	}else if(e=='setok'){
		for(var i=0;i<4;i++){
			var t = jsElm.jeID('card'+i).innerHTML;
			if(t=='?'){
				alert('还未填写完！');
				return;
			}
		}
		$("#cupick").hide();
		$("#cutab").show();
	}else{
		for(var i=0;i<4;i++){
			var t = jsElm.jeID('card'+i).innerHTML;
			t = t.replace('?','');
			if(t.length==0){ 
				jsElm.jeID('card'+i).innerHTML = e;
				break;
			}
		}
	}
}
function cuops(op){
	exps.innerHTML += cuOutFmt(op);
}
function cuopn(i){  
	exps.innerHTML += jsElm.jeID('card'+i).innerHTML;
}
function cuctrl(type){
	var ro = exps.innerHTML;
	var rs = cuInFmt(ro); var ts = ','+rs+',';
	if(type=='clear'){
		exps.innerHTML = '';
	}else if(type=='clone'){
		exps.innerHTML = cuOutFmt(rs.substring(0,rs.length-1));
	}else{
		var tn=0, t1, a4 = new Array();
		for(var i=0;i<4;i++){
			t1 = jsElm.jeID('card'+i).innerHTML;
			if(t1=='?'){ 
				alert('还未正确发牌！');
				return;
			}
			if(('('+rs).indexOf(t1)>0){ tn++; }
			a4[i] = parseInt(t1);
		}
		var st = cu24(a4), stp, me, mc, mre;
		stp = '<p>标准答案:</p>' + (st.length > 6 ? st : '<i>此题无解！</i>');
		me = '<p>我的答题:</p>';
		if(type=='setok'){
			//
			if(tn<4){ 
				alert('还未完成！');
				return;
			}
			//
			try{ mc = eval(rs); }
			catch(ex){ mc = -1; } 
			mre = (Math.abs(mc-24)<1E-5) ? '正确！' : '错误！';
			me += '<i>'+ro+' (<b>'+mre+'</b>)</i>';
			me += mc == -1 ? '<i><b>表达式错误!</b></i>' : '';
		}else if(type=='setno'){
			mre = st.length > 6 ? '错误！' : '正确！';
			me += '<i>此题无解！(<b>'+mre+'</b>)</i>';
		}else if(type=='res'){	
			me = '';
		} //clear,clone,setok,setno,res
		jsElm.jeID('eout').innerHTML = me + stp;
	}
}

function cuInFmt(s){
	s = s.replace(/＋/g,'+');	
	s = s.replace(/－/g,'-');	
	s = s.replace(/ｘ/g,'*');	
	s = s.replace(/÷/g,'/');
	//s = s.replace(/\|/g,'/');		
	return s;	
}
function cuOutFmt(s,inp){
	s = s.replace(/\+/g,'＋');	
	s = s.replace(/\-/g,'－');	
	s = s.replace(/\*/g,'ｘ');	
	s = s.replace(/\//g,'÷');
	if(inp){
	s = s.replace(/x/g,'ｘ');
	s = s.replace(/（/g,'(');
	s = s.replace(/）/g,')');
	}
	s = s.replace(/\|/g,'/');	
	return s;	
}

var vari=new Array(
'0123','0132','0213','0231','0312','0321',
'1023','1032','1203','1230','1302','1320',
'2013','2031','2103','2130','2301','2310',
'3012','3021','3102','3120','3201','3210'
);

// ===========================================================================================================================

var sExpC = 'A+B+C+D;A+B+C-D;A+B+C*D;A+B+C/D;A+B-C-D;A+B-C*D;A+B-C/D;A+B*C-D;A+B*C*D;A+B*C/D;A+B/C-D;A+B/C*D;A+B/C/D;A*B+C*D;A*B+C/D;A*B-C-D;A*B-C*D;A*B-C/D;A*B*C-D;A*B*C*D;A*B*C/D;A*B/C-D;A*B/C/D;A/B+C/D;A/B*C-D;A+B*(C+D);A+B*(C-D);A+B/(C+D);A+B/(C-D);A*B*(C+D);A*B*(C-D);A*B/(C+D);A*B/(C-D);A/B*(C+D);A/B*(C-D);A+(B+C)/D;A+(B-C)/D;A*(B+C)-D;A*(B-C)-D;(A+B)/C-D;(A+B)/C/D;(A+B)*(C+D);(A+B)*(C-D);(A+B)/(C-D);(A-B)*(C-D);A*(B+C+D);A*(B+C-D);A*(B+C*D);A*(B+C/D);A*(B-C-D);A*(B-C*D);A*(B-C/D);A*(B*C-D);A*(B/C-D);A/(B-C/D);A/(B/C-D);(A+B+C)/D;(A+B-C)/D;(A+B*C)/D;(A+B/C)/D;(A*B-C)/D';
//sExpC += '';

function cu24(cards){
	var mode = sExpC.split(';'), t2, s='';
	var i, j, k=0, irow, jrow, A,B,C,D, evres;
	var sexp, sexps='(,'
	for(i=0;i<mode.length;i++){
		irow = mode[i]; 
		sexp=','+irow.replace(/[+|\-|*|\/]/g,'0')+','; 
		if(sexps.indexOf(sexp)>0) continue; //同一序列的组合方式,只用一次[(A0B)0(C0D)]
		for(j=0;j<24;j++){ //k++;
			jrow = vari[j]; //1203
			A=parseInt(cards[jrow.charAt(0)]); 
			B=parseInt(cards[jrow.charAt(1)]);
			C=parseInt(cards[jrow.charAt(2)]);
			D=parseInt(cards[jrow.charAt(3)]);
			evres=eval(irow); 
			if(Math.abs(evres-24)<1E-5){ //evres==24
				if(irow=='(A-B)*(C-D)' && B>A){
					t2 = A; A = B; B = t2;
					t2 = C; C = D; D = t2;
				} //避免两个负数相乘(2-10)ｘ(6－9)
				s += '<i>'+irow.replace('A',A).replace('B',B).replace('C',C).replace('D',D)+'<|i>'; 
				sexps += sexp+','; //console.log(sexp);		
				break;
			}
		} //for,j
	} //for,i
	return cuOutFmt(s);
}

/*
console.time('a');
cu24(new Array(1,5,5,5));
cu24(new Array(3,3,8,8));
cu24(new Array(1,2,7,7)); 
cu24(new Array(3,3,7,7)); 
cu24(new Array(3,6,7,10)); 
cu24(new Array(1,5,9,10)); 
console.timeEnd('a');
//*/
