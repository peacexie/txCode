
function getTianqi(city){
	var dcfg = getLocal(city);
	var data = dcfg[0], time = dcfg[1];
	if(data.length>0){ 
		var upd = '<p class="msg"><a href="#" onClick="getRemote(\''+city+'\')">'+fmtDate(time)+'<br>！更新 &gt;&gt;</a></p>';
		$('#tqdetail').html(data+upd); 
	}else{ 
		getRemote(city); 
	}
}
function getLocal(city,cdata){ // sobj,skey,ckey,life,data
	return mlifeStore(locStore,ktq_rems,city,ntq_nlife,cdata);
}
function getRemote(city){ 
	//$('#tqdetail').html('1'); 
	$('#tqdetail').html('<p class="msg"><img src="../uimgs/icon/loading.gif" width="10" height="10"></p>');
	var curl = encodeURIComponent(city);
	jQuery.ajax({
		url:urps+urlRnd('api121.php?ret=ajax-text&city='+curl),
		timeout:4000, //超时时间设置，单位毫秒
		dataType:"text", //
		type:"GET", //"POST" 或 "GET"
		success: function(data){
			if(data.length>12){
				var upd = '';
				if(data.indexOf('_apiError_')<=0){
					getLocal(city,data);
					upd = '<p class="msg red">'+fmtDate()+'<br>已更新！</p>';	
				}else{
					upd = '<p class="msg red">错误！</p>';		
				}
				$('#tqdetail').html(data+upd);
			}else{
				$('#tqdetail').html('<p class="msg red">暂无数据！</p>');	
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$('#tqdetail').html('<p class="msg red">错误！'+textStatus+':'+errorThrown+'</p>');
		},
		complete: function(XMLHttpRequest,status){ 
	　　　　if(status=='timeout'){
				$('#tqdetail').html('<p class="msg red">超时了！</p>');
	　　　　}
　　	}
	});	
}

function itmsPids(pids){
	var n=0; s1='', m=0, title='',pidc='(,'+pids+',';
	for(var k in areas){
		var itm = areas[k];
		if((!pids && itm.pid=='0') || (pids && pidc.indexOf(','+k+',')>0)){
			if(n%3==0){ if(n>0) s1 += "</tr>"; s1 += "<tr>"; }
			m = itmsCity(k,'re');
			title = itm.title; //if(title.length>2) title = '<i class="small">'+title+'</i>';
			s1 += "<td width='33%' onClick=\"itmsCity('"+k+"')\"><a href='#imtop'>"+title+"("+m+")</a></td>";	
			n++; //console.log(s);
		}
	}
	$('#tbpid').html(s1);
}
function itmsCity(pid,re){
	var n=1; s2='<tr><td><a class="c666">请选择</a></td>', act='';
	for(var k in areas){
		var itm = areas[k];
		if(itm.pid==pid || (itm.deep==2 && itm.char==pid)){
			if(n%3==0){ if(n>0) s2 += "</tr>"; s2 += "<tr>"; } //("+k+") ctaibei
			act = " onClick=\"addCity('"+itm.title+"')\" ";
			if(itm.pid=='tw'){
				act = k=='ctaibei' ? act : " class='c666' ";		
			}
			if(itm.pid=='hi'){
				act = itm.title.length==2 ? act : " class='c666' ";		
			}
			title = itm.title; //if(title.length>3) title = '<i class="small">'+title+'</i>';
			s2 += "<td width='33%' "+act+"><a href='#'>"+title+"</a></td>";	
			n++; //console.log(s);
		}
	}  
	if(re){ 
		return n-1;
	}else{
		$('#trcity').show();
		$('#tbcity').html(s2);		
	}
}
function addCity(nm){
	if(!nm) return;
	if(!(vtq_noli==='noli')){
		vtq_list = nm + ',' + vtq_list.replace(nm,'').replace(',,',',');
		vtq_list = vtq_list.replace(',,',',');
		locStore.set(ktq_list,vtq_list);
		listCity();
	}
	getTianqi(nm);
	$('.mcontent').toggle();
}

function sopType(type){
	$("#trletter,#trperm,#trpid,#trcity").hide();
	$("#tr"+type).show();
	if(type=='perm'){ 
		$("#trpid").show();
		$('#tbpid').html('');
	}
	if(type=='pid') itmsPids();
	if(type=='letter'){ 
		if(fadeLets=='Y') return;
		setLets();
	}
}
function setLets(){ 
	$("#tbletter td").each(function(){ 
		var ch = $(this).html();
		var n = itmsCity(ch,'re');
		if(n>0) $(this).prop('title',n); 
		if(n>30){ $(this).addClass('c3F3 fB');}
		else if(n>20) { $(this).addClass('cF33 fB');}
		else if(n>10) { $(this).addClass('c33F');}
		else if(n>0) { $(this).addClass('c333');}
		else if(n<=0) { $(this).addClass('cCCC');}
		$(this).click(function(){
			if(n>0){ itmsCity(ch); }
			else{ $('#tbcity').html('<tr><td><a class="c666">暂无城市！</a></td></tr>'); }
		});	
	});
	fadeLets = 'Y';
	/*
	$("#tbletter td").click(function(){
		var ch = $(this).html();
		if(!(ch=='-')) itmsCity(ch);
	});
	*/
}

function loadArea(){
	jQuery.ajax({
		url:urlb+urlRnd('udata/lihua/g_china.txt'),
		timeout:1000, 
		dataType:"text", 
		type:"GET", 
		success: function(data){
			eval("areas = "+data+";"); 
			//setTimeout('itmsPids()',800);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			$('#tqdetail').html('<p class="msg red">错误！'+textStatus+':'+errorThrown+'</p>');
		},
		complete: function(XMLHttpRequest,status){ 
	　　　　if(status=='timeout'){
	　　　　　  alert("超时了");
	　　　　}
　　	}
	});
} 
function listCity(){
	var list = vtq_list;
	var a = list.split(',');
	var n=0; s3='', m=9;
	for(var k=0;k<a.length;k++){
		var itm = a[k];
		if(itm && itm.length>0){ 
			if(n%3==0){ if(n>0) s3 += "</tr>"; s3 += "<tr>"; } //("+k+")
			s3 += "<td width='33%' onClick=\"getTianqi('"+itm+"')\"><a href='#'>"+itm+"</a></td>";	
			n++; //console.log(s);
			if(n==m) break;
		}
	} 
	$('#tbnow').html(s3);
}
function fmtDate(time){ 
	if(!time) d = new Date();
	else d = new Date(parseInt(time) * 1000); 
	var s = '';
	s += d.getFullYear()+'-'; 
	s += (d.getMonth()+1)+'-'; 
	s += d.getDate()+' '; 
	s += d.getHours()+':'; 
	s += d.getMinutes()+':'; 
	s += d.getSeconds()+'';
	return s; 
} 
