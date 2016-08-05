/*
getClass(select,[content])
获取具有指定class的元素的集合
select 指定的className
context 指定的范围 如果传入的
*/



// --------------------------------------------------------------------------
function getClass(select,context){
	var context=context?context:document;
	if(document.getElementsByClassName){
		return context.getElementsByClassName(select);
	}else{
		var all=context.getElementsByTagName("*");
		var arr=[];
		for(var i=0;i<all.length;i++){
			//one two three four    one  分隔成数组
			//每一个对象的className 是否包含指定的select
			//all[i].className==select
			if(checkClass(all[i].className,select)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
// --------------------------------------------------------------------------
//clasnamme里面是否包含有select
function checkClass(classname,select){
	var arr=classname.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==select){
			return true;
		}
		
	}
    return false;
}

// --------------------------------------------------------------------------


function $(selector,context){
	if(typeof selector=="string"){
		var context=context||document;
	    if(selector.charAt(0)=="."){
		//.one  ->one
		    return getClass(selector.slice(1),context);

	    }else if(selector.charAt(0)=="#"){
		//#one ->one
		    return document.getElementById(selector.slice(1));

	    }else if(/^[a-z][a-z1-6]{0,8}$/.test(selector)){
		//div
		    return context.getElementsByTagName(selector);
	    }else if (/^[a-z][a-z1-6]{0,8}$/.test(selector)) {
	    	return  document.createElement(selector,(1,-1))
	    };  

	}else if(typeof selector=="function"){
		window.onload=function(){
			selector();
		}
	}

}

// --------------------------------------------------------------------------
function setContent(obj,val){
	//设置
	if(val){
	   	if(obj.innerText){
	   		obj.innerText=val;
	   	}else{
	   		obj.textContent=val;
	   	}
	}else{
	//获取
	   	if(obj.innerText){
	   		return obj.innerText;
	   	}else{
	   		return obj.textContent;
	   	}
	   			
	}
}	
// --------------------------------------------------------------------------

/*getStyle(one,"width")
  获取指定的元素的指定样式
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];//用[attr],不用.attr(undefined)
	}
}

// getChild(obj,type)
// 获取指定元素的子节点
// obj:指定的对象
// type:获取子节点元素

// 思路：
//    1、获取所有子节点
//    2、声明一个空数组
//    3、遍历所有子节点
//        通过子节点的类型
//        true child[i].nodeType==1
//        false child[i].nodeType==1||
//        child[i].nodeType==3&&
 // (/^\s+$/.test(child[i].nodeValue))

// --------------------------------------------------------------------------

function  getChild(obj,type){
	var child=obj.childNodes;
	var arr=[];
	var type=type==undefined?type:false;
	for (var i = 0; i < child.length; i++) {
		if (type=true) {
             if (child[i].nodeType==1) {
                  arr.push(child[i]);
             }
		}else{
              if (child[i].nodeType==1||
                 child[i].nodeType==3&&
                 !(/^\s+$/.test(child[i].nodeValue))) {
              	arr.push(child[i]);
          }
		}
	}
	return arr;
}
// --------------------------------------------------------------------------
// &&!(/^\s+$/.test(next.nodeValue))
function getNext1(obj){
   var next=obj.nextSibling;
   if (next==null) {
   	return false;
   }
   while(next.nodeType==8||next.nodeType==3){
   	   next=next.nextSibling;
   	   if (next==null) {
   	   	return false;
   	   }
   }
   return next;
}
 function getNext2(obj,type){
   var next=obj.nextSibling;
   if (next==null) {
   	return false;
   }
   while(next.nodeType==8||(next.nodeType==3&&(/^\s+$/.test(next.nodeValue)))){
   	   next=next.nextSibling;
   	   if (next==null) {
   	   	return false;
   	   }
   }
   return next;
}

function getNext(obj,type){
	if (type) {
         return  getNext2;
	}else{
         return  getNext1;
	}

}
// --------------------------------------------------------------------------
function getprevious(obj){
   var previous=obj.previousSibling;
   if (previous==null) {
   	return false;
   }
   while(previous.nodeType==8||previous.nodeType==3&&(/^\s+$/.test(next.nodeValue))){
   	   previous=previous.previousSibling;
   	   if (previous==null) {
   	   	return false;
   	   }
   }
   return previous;

}
// --------------------------------------------------------------------------
// inserAfter(obj,obj1)
// 将obj插入到obj1后面
// 思路：将obj插入到obj1下一个兄弟节点的前面。
// 1、获取obj1的下一个兄弟节点和父元素
// 2、判断兄弟节点
// true parnet.inserBefore(obj,next)
// false parent.appendChild(obj)

function inserAfter(obj,obj1){
	var parent=obj1.parentNode;
	var next=getNext(obj);
	if (next) {
        parent.inserBefore(obj,next);
	}else{
        parent.appendChild(obj);
	}
}
// --------------------------------------------------------------------------



function appendBefore(obj,obj1){
	var first=firstChild(obj)
	if(first){
		obj1.inserBefore(obj,first);
	}else{
		obj1.appendChild(obj);
	}
}

function offset(obj){
	var result={left:0,top:0}
	var arr=[];
	arr.push(obj);
	var parent=obj.parentNode;
	while(parent.nodeName!="BODY"){
		if(getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute"){
			arr.push(parent);
			parent=parent.parentNode;
		}
	}
   for (var i = 0; i < arr.length; i++) {
   	var left=arr[i].offsetLeft;
   	var borderLeft=parseInt(arr[i].border-left)?parseInt(arr[i].border-left):0;
   	if (i==0) {
       borderLeft=0;
   	}
   	var top=arr[i].offsetTop;
   	var borderTop=parseInt(arr[i].border-top)?parseInt(arr[i].border-top):0;
   	if (i==0) {
       bordertop=0;
   	}
   	result.left+=(left+borderLeft);
   	result.top+=(top+borderTop);
   }
   return result; 
}

function mousewheel(obj, downfn, upfn) {
	if (document.attachEvent) {
		document.attachEvent("onmousewheel", scrollFn); //IE、 opera
	} else if (document.addEventListener) {
		document.addEventListener("mousewheel", scrollFn, false);
		//chrome,safari -webkit-
		document.addEventListener("DOMMouseScroll", scrollFn, false);
		//firefox -moz-
	}
	function scrollFn(e) {
		var ev = e || window.event;
		var dir = ev.wheelDate || ev.detail;
		if (ev.preventDefault) {
			ev.preventDefault(); //阻止默认浏览器动作(W3C)
		} else {
			ev.returnValue = false; //IE中阻止函数器默认动作的方式
		}
		if (dir == -120 || dir == 3) {
			downfn();
		}
		if (dir == 120 || dir == -3) {
			upfn();

		}
	}
}