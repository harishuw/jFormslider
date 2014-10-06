/*
**************************************
******jFormsliderv 1.0.5**************
******jFormslider.js******************
******Created by Harish U Warrier*****
******Created on 08-06-2014***********
******Modified on 04-10-2014**********
******jfs@jformslider.com*************
******www.jformslider.com*************
**************************************
*/
if("undefined"==typeof jQuery)
{	if('undefined'!==typeof console)
		console.log('%c Sorry!!There is no jquery please get jquery ','color: red');
	else
		throw new Error("Sorry!!There is no jquery please get jquery");
}
$.fn.jFormslider=function(options)
{
	var version="1.0.5";
	var $this=$(this);
	var lilength=$this.find('li').length;
	var randomid='jformslider'+new Date().valueOf();
	var ajaxprocessing=false;
	var defaults=
	{
		width:600,
		height:300,
		next_prev:true,
		submit_btn:true,
		submit_class:'',
		next_class:'',
		prev_class:'',
		nav_class:'',
		error_class:'error',
		error_element:true,
		error_position:'',
		mobile:false,
		texts:{
				next:'next',
				prev:'prev',
				submit:'submit'
			  },
		ajax_repeat:false,	
		speed:400,
		bootstrap:false,
		full_navigation:true,
		validation:true,
		disabletab:true,
		submit_handler:"",
	}
	if(arguments.length>0)
	{
		var text=$.extend(defaults.texts,options.texts);
		options=$.extend(defaults,options);
		options.texts=text;
	}else
		options=defaults;
	var msgspan='<div class="'+options.error_class+'" id="'+randomid+'" style="display:none"></div>';
	var next_button='<a class="'+options.next_class+'" next style="float:right">'+options.texts.next+'</a>';
	var prev_button='<a class="'+options.prev_class+'" prev style="float:left">'+options.texts.prev+'</a>';
	var width=options.width;
	var height=options.height=="auto"?'auto':options.height+'px';
	var widthpc=width*lilength;
	var errorspan="";
	var errorclasses=splitclass($.trim(options.error_class));
	var error_selector='.'+errorclasses.join('.');
	var submit_element="";
	if(options.submit_btn)
		submit_element='<button submit type="submit" class="'+options.submit_class+'"  style="float:right">'+options.texts.submit+'</button>';
	if(options.error_element)
	{
		if(options.error_position=="inside")
			errorspan="<span class='"+options.error_class+"' style='display:none'></span>";
		else
			$(this).after(msgspan);
	}else
		errorspan="";
	var navigation_div='<div class="'+options.nav_class+'">'+prev_button+errorspan+next_button+'</div>';
	var jformslider_style="<style tag='jformslider'>.jformslider {	width:"+width+"px;height:"+height+";overflow:hidden;}"+
					".jformslider ul {margin:0px;padding:0px;list-style:none;width:"+widthpc+"%;}"+
					".jformslider li {display:inline;float:left;width:"+width+"px;}"+
				"</style>";
				if($('style[tag="jformslider"]').length<=0)
					$('head').append(jformslider_style);
	$(this).addClass('jformslider');
	if($(this).find('li:first').hasAttr('call-before'))
	{
		var func=$(this).find('li:first').attr('call-before');
		eval(func);		
	}
	if(options.next_prev)
	{
		$(this).find('li').each(function(index,element){
			var errspan=errorspan;
			var nav_div=navigation_div;
			if($(this).find(error_selector).length>=1)
			{
				errspan="";
				nav_div='<div class="'+options.nav_class+'">'+prev_button+next_button+'</div>';
			}			
			if(index==0 || $(this).hasAttr('no-prev'))
				$(this).append('<div class="'+options.nav_class+'">'+next_button+errspan+'</div>');
			else if(index==lilength-1 || $(this).hasAttr('no-next'))
			{
				if(index==lilength-1)
					$(this).append('<div class="'+options.nav_class+'">'+errspan+prev_button+submit_element+'</div>');
				else
					$(this).append('<div class="'+options.nav_class+'">'+errspan+prev_button+'</div>');
			}else if(!$(this).hasAttr('no-next-prev'))
				$(this).append(nav_div);
		});
	}else
	{
		$(this).find('li').each(function(index,element){
			var errspan=errorspan;
			if($(this).find(error_selector).length>=1)
				errspan="";
			$(this).append('<div class="">'+errspan+'</div>');
		});
	}
	$(this).find('li[hide]').hide();
	$(this).find('li').each(function(index,element){
		$(this).find('input,select').last().keydown(function(e) {
			if(e.which==9 )
			{	if(options.disabletab)
				return false;
			}
		});
	});	
	$(this).find('[number]').keydown(function(e){ 
		var numberarray=[96,97,98,99,100,101,102,103,104,105,109,189,8,46,48,49,50,51,52,53,54,55,56,57,9,16];
		if($.inArray(e.keyCode,numberarray)==-1)
		{	
			if(options.validation)
				e.preventDefault();
		}
		if(e.keyCode>=65 && e.keyCode<=90)
		{
			if(options.validation)
				e.preventDefault();
		}
	});
	$('[ajax-url]').each(function(index,element){
		var target="";
		target=$(this).hasAttr('ajax-target')?$(this).attr('ajax-target')!=""?$(this).attr('ajax-target'):target:target;
		if(target=="")
		{	
			if($(this).find('[next],[prev]').length!=0)
			{
				if($(this).find('.jformslider_ajax_target').length==0)
				$(this).find('[next],[prev]').parent().before("<div class='jformslider_ajax_target'></div>");
			}else
			{
				if($(this).find('.jformslider_ajax_target').length==0)
				$(this).append("<div class='jformslider_ajax_target'></div>");
			}
		}
	});	
	$this.find('li').each(function(index, element) {
		var rand=randomid+index;
		if(!$(this).hasAttr('data-id'))
			$(this).attr('data-id',rand);
		else if($(this).attr('data-id')=="")
			$(this).attr('data-id',rand);
	});
	$("body").keydown(function(e){
		if(e.which==9 && e.shiftKey)
		{ 
			if(e.target.nodeName=="INPUT")
			{
				var id=e.target.id;
				$(e.target).parents('li').find('input').each(function(index, element) {
				    if($(this).attr('id')==id)
					{	$(e.target).parents('li').find('input:eq('+(index-1)+')').focus();
						return false;
					}
				});
			}
			return false;
		}
	});
	$('[prev]').click(function(e){
		e.preventDefault();
		$this.prevSlide();
	});
	$('[next]').click(function(e){
		e.preventDefault();
		$this.nextSlide();
	});
	$('[submit]').click(function(e){
		e.preventDefault();
		var current_slide=$this.get_current_slide();
		var slidestart=false;
		if(options.validation)
		{
			$this.find('input[required],select[required],input[email]').each(function(index,element){
				var err_slide=$(this).parents('li');
				var $thisid=err_slide.hasAttr('data-id')?err_slide.attr('data-id'):"";
				if($(this).hasAttr('required'))
				{	if($.trim($(this).val())=='')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							err_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						if($('[data-id="'+$thisid+'"]').is(':visible'))
						{
							$this.gotoSlide($thisid);
							$(this).focus();
							slidestart=false;
							return false;
						}						
						
					}
				}
				if($(this).hasAttr('email'))
				{
					if(!emailvalid($.trim($(this).val())))
					{
						if(options.error_position=="inside")
							err_slide.find(error_selector).html('Please Enter a valid email').show();
						else
							$('#'+randomid).html('Please Enter a valid email').show();
						if($('[data-id="'+$thisid+'"]').is(':visible'))
						{
							$this.gotoSlide($thisid);
							$(this).focus();
							slidestart=false;
							return false;
						}			
					}
				}
				if($(this).is('select'))
				{
					if($.trim($(this).val())=='-1')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							err_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						if($('[data-id="'+$thisid+'"]').is(':visible'))
						{
							$this.gotoSlide($thisid);
							$(this).focus();
							slidestart=false;
							return false;
						}			
					}
				}
		
			});
			current_slide.find('input[required],select[required],input[email]').each(function(index,element){
				if($(this).hasAttr('required'))
				{	if($.trim($(this).val())=='')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							current_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				if($(this).hasAttr('email'))
				{
					if(!emailvalid($.trim($(this).val())))
					{
						if(options.error_position=="inside")
							current_slide.find(error_selector).html('Please Enter a valid email').show();
						else
							$('#'+randomid).html('Please Enter a valid email').show();
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				if($(this).is('select'))
				{
					if($.trim($(this).val())=='-1')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							current_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				if(options.error_position=="inside")
					current_slide.find(error_selector).html('').hide();
				else
					$('#'+randomid).html('').hide();
				slidestart=true;
			});
		}else
			slidestart=true;
		if(current_slide.find('input[required],select[required],input[email]').length<=0)
			slidestart=true;
		if(slidestart && options.submit_handler!="")
			options.submit_handler();
	});
	if(!$.mobile)
	{
		if(options.mobile)
		{
			message('nomobilejq');
		}
		options.mobile=false
	}
			
	if(options.mobile)
	{
		$this.on("swiperight",function(){
			$this.prevSlide();
		});
		$this.on("swipeleft",function(){
			
			$this.nextSlide();
		});
	}
	
	$.fn.nextSlide=function(){
		var current_slide=$(this).get_current_slide();
		var next_slide=$(this).get_next_slide();
		var slidestart=false;
		if(options.validation)
		{
			current_slide.find('input[required],select[required],input[email]').each(function(index,element){
				if($(this).hasAttr('required'))
				{
					if($.trim($(this).val())=='')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							current_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				
				if($(this).hasAttr('email'))
				{
					if(!emailvalid($.trim($(this).val())))
					{
						if(options.error_position=="inside")
							current_slide.find(error_selector).html('Please Enter a valid email').show();
						else
							$('#'+randomid).html('Please Enter a valid email').show();
						
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				if($(this).is('select'))
				{
					if($.trim($(this).val())=='-1')
					{
						var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
						if(options.error_position=="inside")
							current_slide.find(error_selector).html(msg).show();
						else
							$('#'+randomid).html(msg).show();
						
						$(this).focus();
						slidestart=false;
						return false;
					}
				}
				if(options.error_position=="inside")
					current_slide.find(error_selector).html('').hide();
				else
					$('#'+randomid).html('').hide();
				
				slidestart=true;
			});
		}else
			slidestart=true;
		if(current_slide.find('input[required],select[required],input[email]').length<=0)
			slidestart=true;
		
		if(slidestart)
		{
			if(current_slide.hasAttr('call-after'))
				{
					var func=current_slide.attr('call-after');
					if(!eval(func))
					{
						slidestart=false;
						return false;
					}else
						slidestart=true;
				}else
					slidestart=true;
		}
		next_slide=$(this).get_next_slide();
		if(slidestart)	
		{	
			if(next_slide.hasAttr('call-before'))
			{
				var func=next_slide.attr('call-before');
				if(!eval(func))
				{
					slidestart=false;
					return false;
				}else
					slidestart=true;
			}else
				slidestart=true;
		}
		if(next_slide.hasAttr('ajax-url') && slidestart && !next_slide.hasAttr('ajax-done'))
		{
			if($.trim(next_slide.attr('ajax-url'))!="")
			{
				slidestart=false;
				if(next_slide.hasAttr('ajax-beforesubmit'))
					{
						if(next_slide.attr('ajax-beforesubmit')!="")
							eval(next_slide.attr('ajax-beforesubmit'));
					}
				$.ajax({
					url:next_slide.attr('ajax-url'),
					data:next_slide.hasAttr('ajax-data')? JSON.parse(next_slide.attr('ajax-data')):{},
					type:next_slide.hasAttr('ajax-type')?next_slide.attr('ajax-type'):'POST',
					success:function(data)
						 {
							var target="";
							target=next_slide.hasAttr('ajax-target')?next_slide.attr('ajax-target')!=""?next_slide.attr('ajax-target'):target:target;
							if(target!="")
							{	
								 target.html(data);
								 if(!options.ajax_repeat)
								 next_slide.attr('ajax-done','');
							}else if(next_slide.find('[next],[prev]').length!=0)
							{
								next_slide.find('.jformslider_ajax_target').html(data);
								if(!options.ajax_repeat)
								next_slide.attr('ajax-done','');
							}else
							{
								next_slide.append(data);
								if(!options.ajax_repeat)
								next_slide.attr('ajax-done','');
							};
							ajaxprocessing=false;
							slidestart=true;
							var px=Number($this.find('ul').css('margin-left').replace("px",""));
							px-=width;
							$this.find('ul').animate({ marginLeft: px+'px' }, options.speed);
							if(next_slide.hasAttr('ajax-success'))
							{
								if(next_slide.attr('ajax-success')!="")
									eval(next_slide.attr('ajax-success'));
							}
						 },
				  error:function(x,y,z)
				  {
					  ajaxprocessing=false;
					  console.log(x,y,z);
				  }
			  });
			}
		}
		if(slidestart)
		{
			var px=Number($(this).find('ul').css('margin-left').replace("px",""));
			px-=width;
			$(this).find('ul').animate({ marginLeft: px+'px' }, options.speed);
		}
	};
	
	$.fn.prevSlide=function(){
		var slideback=true;
		var pre_slide=$(this).get_prev_slide();
		if(pre_slide.hasAttr('call-prev'))
				{
					var func=pre_slide.attr('call-prev');
					if(!eval(func))
					{
						slideback=false;
						return false;
					}else
						slideback=true;
				}else
					slideback=true;
		if(slideback)
		{
			var px=Number($(this).find('ul').css('margin-left').replace("px",""));
			px+=width;
			$(this).find('ul').animate({ marginLeft: px+'px' }, options.speed);
		}
	};
	$.fn.gotoSlide= function(slideid){
		var count=0;
		var found=false;
		var slidethis=$(this);
		$('[data-id="'+slideid+'"]').show();
		$(this).find('li').filter(':visible').each(function(index, element) {
			count++;
			if($(this).hasAttr('data-id'))
			{	if($(this).attr('data-id')==$.trim(slideid))
				{	found=true;
					return false;
				}
			}
		});
		var go_to=(count-1)*width;	
		var px='-'+go_to+'px';
		if(found)
		{
			var gslide=$('[data-id="'+slideid+'"]');
			
			if(gslide.hasAttr('ajax-url'))
			{	if(gslide.attr('ajax-url')!="")
				{
					if(gslide.hasAttr('ajax-beforesubmit'))
					{
						if(gslide.attr('ajax-beforesubmit')!="")
							eval(gslide.attr('ajax-beforesubmit'));
					}
					$.ajax({
						url:gslide.attr('ajax-url'),
						data:gslide.hasAttr('ajax-data')? JSON.parse(gslide.attr('ajax-data')):{},
						type:gslide.hasAttr('ajax-type')?gslide.attr('ajax-type'):'POST',
						success:function(data)
						 {
							var target=gslide.hasAttr('ajax-target')?gslide.attr('ajax-target')!=""?gslide.attr('ajax-target'):"":"";
							if(target!="")
							{	target.html(data);
								if(!options.ajax_repeat)
									gslide.attr('ajax-done','');
							}else if(gslide.find('[next],[prev]').length!=0)
							{	gslide.find('.jformslider_ajax_target').html(data);
								if(!options.ajax_repeat)
									gslide.attr('ajax-done','');
							}else
							{	gslide.append(data);
								if(!options.ajax_repeat)
									gslide.attr('ajax-done','');
							};
							ajaxprocessing=false;
							slidestart=true;
							var px=Number($this.find('ul').css('margin-left').replace("px",""));
							px-=width;
							slidethis.find('ul').animate({ marginLeft:px }, options.speed);
							if(gslide.hasAttr('ajax-success'))
							{
								if(gslide.attr('ajax-success')!="")
									eval(gslide.attr('ajax-success'));
							}
						 },
						 error:function(x,y,z)
						 {	  ajaxprocessing=false;
							  console.log(x,y,z);
							  slidethis.find('ul').animate({ marginLeft:px }, options.speed);	
						  }
					  });
				}
			}else
				slidethis.find('ul').animate({ marginLeft:px }, options.speed);
		}else
			message('nodataid');
	};
	message('startup');
	$.fn.get_slide_data=function(id){
		
		var opjson=Object();
		if(arguments.length<=0)
			id="";
		if($.trim(id)=="")
		{
			$this.find('input,select,textarea').each(function(index,element){
				if($(this).hasAttr('name'))
					opjson[$(this).attr('name')]=$(this).val();
				else
					opjson[$(this).attr('id')]=$(this).val();
			});
		
		}else
		{
			$('[data-id="'+id+'"]').find('input,select,textarea').each(function(index,element){
				if($(this).hasAttr('name'))
					opjson[$(this).attr('name')]=$(this).val();
				else
					opjson[$(this).attr('id')]=$(this).val();
			});
		
		}
		//console.log(opjson);
		return opjson;
	};
	$.fn.get_current_slide= function(){
		var px=Number($this.find('ul').css('margin-left').replace("px",""));
		var slide=-px/width;
		var slcount=-1;
		var current='';
		$this.find('li').filter(':visible').each(function(index, element) {
			slcount++;
			if(slcount==slide)
			{
				current=$(this);
				return false;
			}
		});
		if(current=="")
			message('no_cs');
		else
			return current;		
	}
	$.fn.get_next_slide= function(){
		var px=Number($this.find('ul').css('margin-left').replace("px",""));
		var slide=-px/width;
		var slcount=-2;
		var current='';
		$this.find('li').filter(':visible').each(function(index, element) {
			slcount++;
			if(slcount==slide)
			{
				current=$(this);
				return false;
			}
		});
		if(current=="")
			message('no_ns');
		else
			return current;		
	}
	$.fn.get_prev_slide= function(){
		var px=Number($this.find('ul').css('margin-left').replace("px",""));
		var slide=-px/width;
		var slcount=0;
		var current='';
		$this.find('li').filter(':visible').each(function(index, element) {
			slcount++;
			if(slcount==slide)
			{
				current=$(this);
				return false;
			}
		});
		if(current=="")
			message('no_ps');
		else
			return current;		
	}
	$.fn.get_slide_details=function()
	{
		var px=Number($this.css('margin-left').replace("px",""));
		var slide_nos=(-px/790)+1;
		var count=1;
		var did='';
		count=lilength;
		var pages={current:slide_nos,total:count};
		return pages;
	}
	function message(type)
	{
		var msg='';
		var style=""
		switch(type)
		{
			case 'startup':msg='%c Congratulations!!!  You are using %cjFormslider '+version;
						  style='color: green';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style,'font-style:italic;font-size:15px;font-weight:bold;'+style);
							}
						  break;
			case 'nodataid':msg='%c No %c"data-id" %cdefined; Please define a %c"data-id" %cin a li to use function %c"gotoSlide()" ';
						  style='color: red';
						  style1=style+';font-style:italic;font-size:15px;font-weight:bold;';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style,style1,style,style1,style,style1);
							}
						  break;
			case "nojquery":
						  msg='%c Sorry!!There is no jquery please get jquery ';
						  style='color: red';
						    if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}else
							{
								throw new Error("Sorry!!There is no jquery please get jquery");
							}
						break;
			case "nomobilejq":
						  msg='%c Sorry!!There is no jquery mobile please get jquery mobile';
						  style='color: red';
						    if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}else
							{
								throw new Error("Sorry!!There is no jquery mobile please get jquery mobile");
							}
						break;	
			case 'no_cs':msg='%c Sorry!! There is no current slide Some Unknown Error Occured.Please try again ';
						  style='color: red';
						  style1=style+';font-style:italic;font-size:15px;font-weight:bold;';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}
						  break;
			case 'no_ns':msg='%c Sorry!! There is no next slide ';
						  style='color: red';
						  style1=style+';font-style:italic;font-size:15px;font-weight:bold;';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}
						  break;
			case 'no_ps':msg='%c Sorry!! There is no previous slide';
						  style='color: red';
						  style1=style+';font-style:italic;font-size:15px;font-weight:bold;';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}
						  break;			  
						  
			case 'unknown':msg='%c Sorry!! Some Unknown Error Occured.Please try again ';
						  style='color: red';
						  style1=style+';font-style:italic;font-size:15px;font-weight:bold;';
						  if('undefined'!==typeof console)
							{
								console.log(msg,style);
							}
						  break;					
		}
	}
	function emailvalid(email) 
	{
		var rexp = /\S+@\S+\.\S+/;
		return rexp.test(email);
	}
	function splitclass(str)
	{
		return str.split(/\s+/);
	}
	
};
$.fn.hasAttr = function(name) 
{  
   	return this.attr(name) !== undefined;
};