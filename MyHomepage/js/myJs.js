/*文档完全加载后，再加载某个方法*/
function addLoadEvent(func) {
	var oldOnload=window.onload;
	if(typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload =function() {
			oldOnload();
			func();
		}
	}
}

/*显示二维码*/
function showQRCode() {
	var wechat=document.getElementById('wechat'); 
	var QRCodeLink=document.getElementById('QRCodeLink');
	var QRCode=document.getElementById('QRCode');
	function show() {
	    QRCode.style.display='block';
	}
	function hide() {
		QRCode.style.display='none';
	}

	wechat.onmouseover=show;
	wechat.onmouseout=hide;
	wechat.onclick=show;
	QRCodeLink.onmouseover=show;
	QRCodeLink.onmouseout=hide;
}	

/*导航栏随内容改变自动高点*/
window.onscroll=function() {
	var header=document.getElementById('header');
	var aboutMe=document.getElementById('aboutMeRight');

	var whatILikeLeft=document.getElementById('whatILikeLeft');
	var whatILikeRight=document.getElementById('whatILikeRight');

	var commentLeft=document.getElementById('commentLeft');
	var commentRight=document.getElementById('commentRight');

	var footer=document.getElementById('footer');
	var contactMe=document.getElementById('contactMe');
	
	var aboutMeLi2=document.getElementsByClassName('aboutMeLi2');
	for (var i = 0; i<aboutMeLi2.length; i++) {
		aboutMeLi2[i].className='aboutMeLi1';
	}

	if((whatILikeLeft.offsetTop-document.body.scrollTop)>0) {
		aboutMe.className = 'aboutMeLi2';
	}
	if((whatILikeLeft.offsetTop-document.body.scrollTop)<=0 && (commentLeft.offsetTop-document.body.scrollTop)>0) {
		whatILikeRight.className = 'aboutMeLi2';
	}
	
	if((commentLeft.offsetTop-document.body.scrollTop)<=0 && (footer.offsetTop-document.body.scrollTop)>600) {
		commentRight.className = 'aboutMeLi2';
	}
	if((commentLeft.offsetTop-document.body.scrollTop)<=0 && (footer.offsetTop-document.body.scrollTop)<=600) {
		contactMe.className='aboutMeLi2';
	}
}

/*把元素放在某个元素后面*/
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
	
}

/*判断字符串是否为空*/
function isStringEmpty(str) {
	if(str==null || str==""){
		return true;
	} 

	for(var i=0;i<str.length;i++) {
		if(str.charAt(i)!=' '){
			return false;
		}
	}
	return true;
}


var commentCount=0; //记录留言数

/*添加留言*****************************************************/
function addComment() {
	var commentUserNameText=document.getElementById('commentUserNameText');
	var commentText=document.getElementById('commentText');
	if(isStringEmpty(commentUserNameText.value)){
		alert('\n'+'对不起，名字/昵称 不能为空字符！'+'\n');
		return false;
	}
	if(isStringEmpty(commentText.value)){
		alert('\n'+'对不起，留言内容 不能为空字符！'+'\n');
		return false;
	}
	if(commentUserNameText.value.length>10) {
		alert('\n'+'对不起，名字/昵称 不能超过10个字符！'+'\n');
		return false;
	}
	if(commentText.value.length>500){
		alert('\n'+'对不起，留言内容 不能超过500个字符！'+'\n');
		return false;
	}

	alert('\n'+'留言成功！'+'\n');
	var time=new Date();
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var date=time.getDate();
    var hours=time.getHours();
    var minutesTemp=time.getMinutes();
    var minutes;
    if(minutesTemp<10) {
    	minutes='0'+ minutesTemp;
    } else {
    	minutes=minutesTemp;
    }

	var temp=document.getElementById('temp');

	var commentWrap=document.createElement('div');
	commentWrap.className='commentWrap';
    insertAfter(commentWrap,temp);

    var dpWrap=document.createElement('div');
    dpWrap.className='dpWrap';
    var dp=document.createElement('img');
    dp.src='images/pig.jpg';                                      //头像
    dpWrap.appendChild(dp);
    commentWrap.appendChild(dpWrap);

    var commentWrapInner=document.createElement('div');
    commentWrapInner.className='commentWrapInner';
    insertAfter(commentWrapInner,dpWrap);

    var upPart=document.createElement('div');
    upPart.className='upPart';
    var commentUserName=document.createElement('div');
    commentUserName.className='commentUserName';
    var commentUserNameValue=document.createElement('h3');
    var commentUserNameTemp=commentUserNameText.value;
    commentUserNameValue.innerHTML=commentUserNameTemp+' · '+year+'-'+month+'-'+date+' '+hours+':'+minutes;  //commentUserNameValue
    commentUserName.appendChild(commentUserNameValue);
    upPart.appendChild(commentUserName);
    var replyBig=document.createElement('div');
    replyBig.className='replyBig';
    var replyBigA=document.createElement('a');
    replyBigA.className='replyBigA';                        //replyBigA
    replyBigA.innerHTML='回复';                             
    replyBig.appendChild(replyBigA);
    insertAfter(replyBig,commentUserName);
    commentWrapInner.appendChild(upPart);

    var downPart=document.createElement('div');
    downPart.className='downPart';
    insertAfter(downPart,upPart);
    var comment=document.createElement('p');
    comment.innerHTML=commentText.value;                       //commentText.value
    downPart.appendChild(comment);
	insertAfter(downPart,upPart);

	var replyTextWrap=document.createElement('div');
	replyTextWrap.className='replyTextWrap';
	insertAfter(replyTextWrap,downPart);

	var replyText=document.createElement('textarea');
	replyText.className='replyText';
	replyText.placeholder='写下你的回复...';
	replyTextWrap.appendChild(replyText);

	var commitReplyBtnWrap=document.createElement('div');
	commitReplyBtnWrap.className='commitReplyBtnWrap';
	insertAfter(commitReplyBtnWrap,replyText);

	var replyUserNameText=document.createElement('input');
	replyUserNameText.className='replyUserNameText';
	replyUserNameText.type='text';
	replyUserNameText.name='replyUserNameText'; 
	replyUserNameText.placeholder='名字/昵称';
	commitReplyBtnWrap.appendChild(replyUserNameText);

	var commitReplyBtn=document.createElement('input');
	commitReplyBtn.className='commitReplyBtn';
	commitReplyBtn.type='submit'; 
	commitReplyBtn.name='commitReplyBtn';
	commitReplyBtn.value='发表';
	insertAfter(commitReplyBtn,replyUserNameText);

	commentUserNameText.value='';//重置为空
	commentText.value=''; 

	commentCount++;  //留言数自增
	var countOut=document.getElementById('commentCount');
	countOut.innerHTML=commentCount+'条留言 · ';

	/*回复(大)点击事件处理***************************************/
	replyBigA.onclick=function() {
		//var replyTextWrap=commentWrap.lastChild.lastChild;
		//alert(commentWrap.className+' '+replyTextWrap.className);
		replyUserNameText.value='';
		replyText.value='  @'+commentUserNameTemp+' ';
		if(replyTextWrap.style.display=='block') {
			replyTextWrap.style.display='none';
		} else {
			replyTextWrap.style.display='block';
		}
	}

	/*发表回复点击事件处理*************************************************/
	commitReplyBtn.onclick=function() {
		var replyTextWrap=commentWrap.lastChild.lastChild;
		//var replyUserNameText=document.getElementById('replyUserNameText');
		//var replyText=document.getElementById('replyText');
		//var commentUserNameAppend ='  @'+commentUserNameTemp+' ';
		if(isStringEmpty(replyUserNameText.value)){
			alert('\n'+'对不起，名字/昵称 不能为空字符！'+'\n');
			return false;
		}
		if(isStringEmpty(replyText.value)){
			alert('\n'+'对不起，回复内容 不能为空字符！'+'\n');
			return false;
		}
		if(replyUserNameText.value.length>10) { 
			alert('\n'+'对不起，名字/昵称 不能超过10个字符！'+'\n');
			return false;
		}
		if(replyText.value.length>500) { 
			alert('\n'+'对不起，恢复内容 不能超过500个字符！'+'\n');
			return false;
		}

		alert('\n'+'回复成功！'+'\n');

		if(replyTextWrap.style.display=='block') {
			replyTextWrap.style.display='none';
		} else {
			replyTextWrap.style.display='block';
		}

		var time=new Date();
	    var year=time.getFullYear();
	    var month=time.getMonth()+1;
	    var date=time.getDate();
	    var hours=time.getHours();
	    var minutesTemp=time.getMinutes();
	    var minutes;
	    if(minutesTemp<10) {
	    	minutes='0'+ minutesTemp;
	    } else {
	    	minutes=minutesTemp;
	    }


	    var replyWrap=document.createElement('div');
	    replyWrap.className='replyWrap';
	    commentWrapInner.insertBefore(replyWrap,replyTextWrap);

	    
	    var dpWrap=document.createElement('div');
	    dpWrap.className='dpWrap';
	    replyWrap.appendChild(dpWrap);
	    var dp=document.createElement('img');
	    dp.src='images/pig.jpg';                                      //头像
	    dpWrap.appendChild(dp);

	    
	    var replyWrapInner=document.createElement('div');
	    replyWrapInner.className='replyWrapInner';
	    insertAfter(replyWrapInner,dpWrap);
	    
	    var upPart=document.createElement('div');
	    upPart.className='upPart';
	    replyWrapInner.appendChild(upPart);
		var replyUserName=document.createElement('replyUserName');
	    replyUserName.className='replyUserName';
	    var replyUserNameValue=document.createElement('h3');
	    var replyUserNameTemp=replyUserNameText.value;
	    replyUserNameValue.innerHTML=replyUserNameTemp+' · '+year+'-'+month+'-'+date+' '+hours+':'+minutes;
	    replyUserName.appendChild(replyUserNameValue);
	    upPart.appendChild(replyUserName);

	    var replySmall=document.createElement('div');
	    replySmall.className='replySmall';
	    insertAfter(replySmall,replyUserName);
	    var replySmallA=document.createElement('a');
	    replySmallA.className='replySmallA';
	    replySmallA.innerHTML='回复';
	    replySmall.appendChild(replySmallA);

	    var downPart=document.createElement('downPart');
	    downPart.className='downPart';
	    insertAfter(downPart,upPart);
	    var reply=document.createElement('p');
	    reply.innerHTML=replyText.value;
	    downPart.appendChild(reply);

	    /*回复(小)点击事件***********************************/
	    replySmallA.onclick=function() {
	    	replyUserNameText.value='';
			replyText.value='  @'+replyUserNameTemp+' ';
	    	if(replyTextWrap.style.display=='block') {
				replyTextWrap.style.display='none';
			} else {
				replyTextWrap.style.display='block';
			}
	    }

	}    
       	
}

/*commitCommentBtn发表留言点击事件处理*/
function commitCommentBtnClick(){
	var commitCommentBtn=document.getElementById('commitCommentBtn');
	commitCommentBtn.onclick=addComment;
}

addLoadEvent(showQRCode);
addLoadEvent(commitCommentBtnClick);