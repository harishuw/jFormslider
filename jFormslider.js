/*
**************************************
******jFormsliderv 1.0.2**************
******jFormslider.js******************
******Created by Harish U Warrier*****
******Created on 08-06-2014***********
******Modified on 10-07-2014**********
******huwz1it@gmail.com***************
**************************************
*/

if("undefined"==typeof jQuery)
{
	if('undefined'!==typeof console)
	{
	
		console.log('%c Sorry!!There is no jquery please get jquery ','color: red');
	}else
	{
		throw new Error("Sorry!!There is no jquery please get jquery");
	}
	
}
$.fn.jFormslider=function(options)
{
	var $this=$(this);
	var lilength=$this.find('li').length;
	var randomid='jformslider'+new Date().valueOf();
	var defaults=
	{
		width:600,
		height:300,
		next_prev:true,
		next_class:'',
		prev_class:'',
		error_class:'',
		texts:{
				next:'next',
				prev:'prev'
			  },
		speed:400,
		bootstrap:false,
		full_navigation:true,
		ajax:false,
		validation:true,
		
	}
	
	if(arguments.length>0)
	{
		options=$.extend(defaults,options);
			
	}else
	{
		options=defaults;
	}
	var msgspan='<div class="'+options.error_class+'" id="'+randomid+'" style="display:none"></div>';
	var next_button='<a class="'+options.next_class+'" next style="float:right">'+options.texts.next+'</a>';
	var prev_button='<a class="'+options.prev_class+'" prev style="float:left">'+options.texts.prev+'</a>';
	var width=options.width;
	var height=options.height;
	var widthpc=width*lilength*100;
	var navigation_div='<div>'+prev_button+next_button+'</div>';
	var divcss=
	{
		"width":width+"px",
		"height":height+"px",
		"overflow":"hidden",
	};
	var ulcss=
	{
		"margin":"0",
		"padding":"0",
		"list-style":"none",
		"width":widthpc+"%",
	};
	var licss=
	{
		"display":"inline",
		"float":"left",
		"width":width+"px",
	};
	$(this).css(divcss);
	$(this).find('ul').css(ulcss);
	$(this).find('li').css(licss);
	$(this).after(msgspan);
	if($(this).find('li:first').hasAttr('call-before'))
		{
			var func=$(this).find('li:first').attr('call-before');
			eval(func);		
		}
	
	if(options.next_prev)
	{
		$(this).find('li').each(function(index,element){
		
			if(index==0)
			{
				$(this).append('<div>'+next_button+'</div>');
			}else if(index==lilength-1)
			{
				$(this).append('<div>'+prev_button+'</div>');
			}else
			{
				$(this).append(navigation_div);
			}
		
		});
	}
	$(this).find('li').each(function(index,element){
		
		$(this).find('input,select').last().keydown(function(e) {
			
			if(e.which==9 )
			{
				return false;
			}
		});
					
	});		
	$('[prev]').click(function(e){
		
		e.preventDefault();
		$this.prevSlide();
		
	});
	$('[next]').click(function(e){
		
		e.preventDefault();
		$this.nextSlide();
	});
	$.fn.nextSlide=function(){
		var current_slide=$(this).get_current_slide();
		var next_slide=current_slide.next('li');
		var slidestart=false;
	
		current_slide.find('input[required],select[required],input[email]').each(function(index,element){
			if($(this).hasAttr('required'))
			{
				if($.trim($(this).val())=='')
				{
					var msg=$(this).hasAttr('data-msg')?$(this).attr('data-msg'):'Please fill this field';
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
					$('#'+randomid).text(msg).show();
					$(this).focus();
					slidestart=false;
					return false;
				}
			}
				$('#'+randomid).html('').hide();
				slidestart=true;
		
				
		});
		if(current_slide.find('input[required],select[required],input[email]').length<=0)
		{
			slidestart=true;
		}		
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
					{
						slidestart=true;
					}
					
				}else
				{
					slidestart=true;
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
		
		var px=Number($(this).find('ul').css('margin-left').replace("px",""));
		px+=width;
		$(this).find('ul').animate({ marginLeft: px+'px' }, options.speed);
		
	};
	$.fn.gotoSlide= function(slideid){
		
			var count=0;
			var found=false;
			$(this).find('li').filter(':visible').each(function(index, element) {
				
				count++;
				if($(this).hasAttr('data-id'))
				{
					if($(this).attr('data-id')==$.trim(slideid))
					{
						found=true;
						return false;
					}
				}
			});
			
			var go_to=(count-1)*width;	
			var px='-'+go_to+'px';
			if(found)
			{
				$(this).find('ul').animate({ marginLeft:px }, options.speed);
			}else
			{
				message('nodataid');
			}
			
	};
	message('startup');
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
		{
			message('unknown');
		}else
		{
			return current;		
		}
	}
	
	$.fn.disableTab=function()
	{ 
		$(this).keydown(function(e) {
			
			if(e.which==9 )
			{
				return false;
			}
		});
	}
	function form_message()
	{
	
	}
	function message(type)
	{
		var msg='';
		var style=""
		switch(type)
		{
			case 'startup':msg='%c Congratulations!!!  You are using %cjFormslider v 1.1';
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
	
	
	
	
};

/* Function to check attr*/
$.fn.hasAttr = function(name) 
{  
   	return this.attr(name) !== undefined;
};
