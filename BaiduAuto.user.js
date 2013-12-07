// ==UserScript==
// @name        BaiduAuto
// @namespace   www.baidu.com
// @description up your alexa rank.v1.4.1:   :去jike,换盘古.. v1.3.16 清除游戏链接    去除so.aliyun.com v1.3.14 去除zjmovie.net 修正百度form表单提交 v1.3.12 调整打开域名比例; v1.3.11 微调:sogou,aliyun的搜索结果 
// @include       http://www.baidu.com/
// @include       http://www.baidu.com/s*
// @include       http://www.baidu.com/?*
// @include       http://www.so.com/
// @include       http://www.so.com/s*
// @include       http://www.so.com/?*
// @include       http://www.sogou.com/
// @include       http://www.sogou.com/?*
// @include       http://www.sogou.com/web*
// @include       http://www.youdao.com/
// @include       http://www.youdao.com/?*
// @include       http://www.youdao.com/search*
// @include       http://cn.bing.com/
// @include       http://cn.bing.com/?*
// @include       http://cn.bing.com/search*
// @include       http://www.panguso.com/
// @include       http://www.panguso.com/?*
// @include       http://www.panguso.com/so*
// @include       http://www.zdomo.com/
// @include       http://www.zdomo.com/*
// @grant       none
// @require	https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version     1.4.1
// ==/UserScript==

(function() {
	// body...
	var url = window.location.href;
	//要刷的域名列表
	var mydomains =["www.zdomo.com","www.zjmovie.net","www.buychuan.com"];
	//要刷的域名
	var mydomain = getMyDomainAndSetKeyword();
	
	var keywords,aMatch=[],keyword,urlRe,k,pages;
	//自定义隔多长时间 打开子级页面;
	var lestTime = 25000;//至少持续多长时间才打开
	var longTime = 40000;//最长几秒后打开

	var tabCloseLestTime = 80000; //新标签打开后 至少持续多长时间才关闭
	var tabCloseLongTime = 150000; //新标签打开后 最长几秒后关闭

	//搜索引擎最大翻页页数
	var page = 10;

	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function addJQuery(callback) {
	  var script = document.createElement("script");
	  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	  script.addEventListener('load', function() {
	    var script = document.createElement("script");
	    script.textContent = "(" + callback.toString() + ")();";
	    document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	function getOs()  
	{  
	   var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        // if (window.ActiveXObject)
        //     Sys.ie = ua.match(/msie ([\d.]+)/)[1]
        // else if (document.getBoxObjectFor)
        //     Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
        // else if (window.MessageEvent && !document.getBoxObjectFor)
        //     Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
        // else if (window.opera)
        //     Sys.opera = ua.match(/opera.([\d.]+)/)[1]
        // else if (window.openDatabase)
        //     Sys.safari = ua.match(/version\/([\d.]+)/)[1];

        // //以下进行测试
        // if(Sys.ie) return 'IE';
        // if(Sys.firefox) return 'Firefox';
        // if(Sys.chrome) return 'Chrome';
        // if(Sys.opera) return 'Opera';
        // if(Sys.safari) return 'Safari';

        if(ua.indexOf("firefox")>0) return 'Firefox';
        if(ua.indexOf("chrome")>0) return 'Chrome';
	    if(ua.indexOf("ie")>0) return 'IE';
	}  
	if(getOs()=="Chrome" || getOs()=="IE") addJQuery();
	
	//判断是哪个搜索引擎
	var domain = window.location.host;
	var myDomainSplit = mydomain.split('.');

	function getMyDomainAndSetKeyword(){
		//自定义搜索关键字列表
		//var zdomoKeywords = ["www.zdomo.com","zdomo.com","site:www.zdomo.com","site:zdomo.com"];
		var zdomoKeywords = "site:zdomo.com";
		var buychuanKeywords ="site:buychuan.com";
		//var zjmovieKeywords =["www.zjmovie.net","zjmovie.net","site:www.zjmovie.net","site:zjmovie.net"];
		//根据url判断是随机域名还是自定义域名
		if(url.indexOf("site")>0){ 
		//自定义
			if(url.indexOf("zdomo.com")>0){
				//keywords = zdomoKeywords;
				return mydomains[0];
			}else if(url.indexOf("zjmovie.net")>0){
				//keywords = zjmovieKeywords;
				return mydomains[1];
			}else{
				//keywords = buychuanKeywords;
				return mydomains[2];
			}
		} else{ 
		//随机
			var rnd = Math.random()*1000;
			// if(rnd<100) {
			// 	keywords = zjmovieKeywords;
			// 	return mydomains[1];
			// }
		 	if(rnd<100) {
				keywords = buychuanKeywords;
				return mydomains[2];
			}
			else {
				keywords = zdomoKeywords;
				return mydomains[0];
			}
		}

		
	}


	
	//提交表单
	function submitForm(){
		
		if(url.indexOf("?")>0){
			// urlRe = /\?\w+=(.+)/g;
			// k = urlRe.exec(url);
			// if(k[1]) keyword = k[1];
			// else  keyword =keywords[parseInt(Math.random()*keywords.length)]; 
		}else{
			//keyword =keywords[parseInt(Math.random()*keywords.length)];
		  keyword = keywords;
			//根据不同搜索引擎，有不同的提交地址。
			switch(domain){
				case "www.baidu.com":
					//设置关键字，并提交表单。
					$("#kw").val(keyword);
					$("form").eq(0).submit();
				break;

				case "www.so.com":
					//设置关键字，并提交表单。
					$("#input").val(keyword);
					$("#search-box").find("form").submit();
				break;

				case "www.soso.com":
					//设置关键字，并提交表单。
					$("#s_input").val(keyword);
					$("#flpage").submit();
				break;

				case "www.sogou.com":
					//设置关键字，并提交表单。
					if(keyword.indexOf("site:")<0) keyword = "site:"+keyword;
					$("#query").val(keyword);
					$("#sf").submit();
				break;

				case "www.youdao.com":
					//设置关键字，并提交表单。
					$("#query").val(keyword);
					$("#fm").find("form").submit();
				break;

				case "cn.bing.com":
					//设置关键字，并提交表单。
					$("#sb_form_q").val(keyword);
					$(".search_controls").find("form").submit();
				break;

				case "www.panguso.com":
					//设置关键字，并提交表单。
					$("#q").val(keyword);
					$(".box-bg").find("form").submit();
				break;

				//http://so.aliyun.com/
				case "so.aliyun.com":
					//设置关键字，并提交表单。
					if(keyword.indexOf("site:")<0) keyword = "site:"+keyword;
					$("#sq").val(keyword);
					$("#aliyun_box").find("form").submit();
				break;
			}
		}
	}
	
	//获取分页信息
	function getPageInfo(){
		switch(domain){
			case "www.baidu.com":
				//获取pages
				if($("#page")){
					pages = $("#page").children();
				}else{

				}

			break;

			case "www.so.com":
				//获取pages
				if($("#page")){
					pages = $("#page").children();
				}else{

				}
			break;

			case "www.soso.com":
				//获取pages
				if($("#pager")){
					pages = $("#pager").find("div").children();
				}else{

				}
			break;

			case "www.sogou.com":
				//获取pages
				if($("#pagebar_container")){
					pages = $("#pagebar_container").children();
				}else{

				}
			break;

			case "www.youdao.com":
				//获取pages
				if($(".c-pages")){
					pages = $(".c-pages").children();
				}else{

				}
			break;

			case "cn.bing.com":
				//获取pages
				if($("#results_container")){
					pages = $("#results_container").find(".sb_pag").find("a");
				}else{

				}
			break;

			case "www.panguso.com":
				//获取pages
				if($("#page")){
					pages = $("#page").find(".pg_list").children();
				}else{

				}
			break;

			case "so.aliyun.com":
				//获取pages
				if($(".page")){
					pages = $(".page").children();
				}else{

				}
			break;
		}
		
	}

	//找到要打开的a集合
	function findLink(){
		//找出所有是zdomo.com站点的链接。
		var as = document.getElementsByTagName("a");
		var tempHref;
		if(domain=="www.baidu.com"){
			for (var i = 0; i < as.length; i++) {
				tempHref =as[i].href;
				if(tempHref.indexOf("link?")>0 || tempHref.indexOf("url?")>0){
					$(as[i]).removeAttr("onclick");
					if(as[i]!="http://www.zdomo.com/Games.aspx/S-9?s=14")
					aMatch.push(as[i]);
				}
			};	

		}else{
			//var re = /^http:\/\/(www\.)?zdomo\.com/;
			//var re = eval('/^http:\/\/(www\.)?' + myDomainSplit[1] + '\.' + myDomainSplit[2] +'/');
			//var re = new RegExp('^http:\/\/(www\\.)?'+ myDomainSplit[1] +'\\.' + myDomainSplit[2]);
			var re = new RegExp('^http:\/\/www\\.'+ myDomainSplit[1] +'\\.' + myDomainSplit[2]);
			for (var i = 0; i < as.length; i++) {
				tempHref =as[i].href;
				if(re.test(tempHref)){
					$(as[i]).removeAttr("onclick");
					if(as[i]!="http://www.zdomo.com/Games.aspx/S-9?s=14")
					aMatch.push(as[i]);
				}
				else{
					if(parseInt(Math.random()*1000) % 2 ==0 && tempHref.indexOf("soso.com")<0 && tempHref.indexOf("sogou.com")<0 && tempHref.indexOf("bing.com")<0 && tempHref.indexOf("panguso.com")<0 && tempHref.indexOf("youdao.com")<0 && tempHref.indexOf("aliyun.com")<0){
						$(as[i]).removeAttr("onclick");
						if(as[i]!="http://www.zdomo.com/Games.aspx/S-9?s=14")
						aMatch.push(as[i]);
					}
				}
			};	
		}
	}

	//获取当前页
	function getCurPage(){
		if(!pages.length || pages.length ==1) return 1;
		switch(domain){
			case "www.baidu.com":
				return	parseInt(pages.parent().find("strong").find(".pc")[0].innerHTML);
			break;
			case "www.so.com":
				return	parseInt(pages.parent().find("strong")[0].innerHTML);
			break;

			case "www.soso.com":
				return	parseInt(pages.parent().find(".current")[0].innerHTML);
			break;

			case "www.sogou.com":
				return	parseInt(pages.parent().find("strong")[0].innerHTML);
			break;

			case "www.youdao.com":
				return	parseInt(pages.parent().find(".current-page")[0].innerHTML);
			break;

			case "cn.bing.com":
				return	parseInt(pages.parent().parent().find(".sb_pagS")[0].innerHTML);
			break;

			case "www.panguso.com":
				return	parseInt(pages.parent().find(".pg_current")[0].innerHTML);
			break;

			case "so.aliyun.com":
				return	parseInt(pages.parent().find("span")[0].innerHTML);
			break;


			default: return 1;
		}
	}

	//点击下一页
	function goNextPage(){

		switch(domain){
			case "www.baidu.com":
				if(pages){
					curPage =getCurPage();
					for(var i=0;i<pages.length*10;i++){
						if(pages[i].href && pages[i].href.indexOf("pn="+(curPage*10))>0){pages[i].click(); return;}
					};
				}
			break;

			case "www.so.com":
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href && pages[i].href.indexOf("pn="+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;

			case "www.soso.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href.indexOf("pg="+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;
			case "www.sogou.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href.indexOf("page="+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;

			case "www.youdao.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href && pages[i].href.indexOf("page"+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;

			case "cn.bing.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = 0; i< pages.length; i++) {
						if(parseInt(pages[i].innerHTML) == (curPage+1)){pages[i].click(); return;}
					};
				}
			break;

			case "www.panguso.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href && pages[i].href.indexOf("p="+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;

			case "so.aliyun.com":
				
				if(pages){
					
					curPage =getCurPage();
					
					for (var i = pages.length - 1; i >= 0; i--) {
						if(pages[i].href && pages[i].href.indexOf("page="+(curPage+1))>0){pages[i].click(); return;}
					};
				}
			break;

		}
	}

	
	

	//所有搜索引擎页面循环完，再次重新循环。  异步取值，如果取值成功，则说明网络通畅。
	var timer,timer2,timer3,aMatchHref,openerd;
	function openLink(){
		// $.get("http://www.zdomo.com/feedback.ashx", function(result){
		 //	if(result =="ok"){
			    curPage = getCurPage();
				if(curPage<page+1){
					timer = Math.random()*(longTime-lestTime)+lestTime;
					timer3 = Math.random()*(2000)+3000;
					if(aMatch.length>0){
						//aMatchHref = changeUrl(aMatch[aMatch.length-1].href);
						aMatchHref = aMatch[aMatch.length-1].href;
						//$(aMatch[aMatch.length-1]).removeAttr("href");
						aMatch[aMatch.length-1].addEventListener("click",function(evt){
							if(getOs()=="Chrome"){
								evt.preventDefault();
	                            window.opener.location.href=aMatchHref;
	                        }else{
	                        	if(getOs()=="IE") window.event.returnValue = false;
	                        	else evt.preventDefault();
	                        	if(openerd) openerd.close();
	                            setTimeout(function(){openerd=window.open(aMatchHref,"aopen");},timer3);
	                            //window.opener.location.href=aMatchHref;
	                        }
							return false;
						},false);
						aMatch[aMatch.length-1].click();
						aMatch.pop();
					}else{
						//点击下一页链接
                        if(openerd) openerd.close();
						goNextPage();
						getPageInfo();
						findLink();
					}
					setTimeout(openLink,timer);
				}
			// }else{
			// 	//关闭自身标签
			// }
		  //});
	}

	// function changeUrl(url){
	//     var re = /zdomo.com\/tool(?:\/(\w+)(?:\/\?id=(\w+|\d+))?)?/i;
	//     return re.test(url)?"http://"+ RegExp.$1 + ".zdomo.com" +(RegExp.$2?"/"+RegExp.$2:""):url;
 //  	}

	//隔一段时间，自动关闭最后一层的标签
	timer2 = Math.random()*(tabCloseLongTime-tabCloseLestTime)+tabCloseLestTime;
	setTimeout(closeWin,timer2);

	//控制最后一层自动关闭
	function closeWin(){
		timer2 = Math.random()*(tabCloseLongTime-tabCloseLestTime)+tabCloseLestTime;
		if(openerd) openerd.close();
		setTimeout(closeWin,timer2);
	}
	
	//打开页面（后，自转30s--60s;关闭自身页面）  zdomo页面内独立完成
	//真链接自动跑
	var aIndex;
	function autoRun(){
		if(domain == mydomain){
			if(aMatch.length<1) findLink();
			aIndex = parseInt(Math.random()*aMatch.length);
			//处理zdomo页面 点击了加入书签的问题
			if(aMatch && aMatch[aIndex].href && aMatch[aIndex].href.indexOf("javascript") ==-1 && aMatch[aIndex].href.indexOf("cnzz")<0)	{
				if(!(aMatch[aIndex].attributes["onclick"]  && aMatch[aIndex].attributes["onclick"].value.indexOf("addBookmark")>-1)){
					$(aMatch[aIndex]).removeAttr("target").attr("target","_self");
					aMatch[aIndex].click();
					setTimeout(autoRun,Math.random()*8000+8000);
				}else autoRun();
			}else autoRun();
		}
	}

	if(domain!=mydomain){
		submitForm();
		getPageInfo();
		findLink();

		//60s--70s后 再次打开新页面
		setTimeout(openLink, Math.random()*(longTime-lestTime)+lestTime);
	} else{
		setTimeout(autoRun, Math.random()*5000+5000);
	}
	
	//页面离开前执行的操作
	window.onunload = function(){
		if(openerd) openerd.close();
	}
	
})();
