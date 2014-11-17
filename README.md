## **jFormslider v1.0.2** ##

jFormslider v1.0.2 is a jquery pluggin where we can convert a big form in to a slider
Form should be in ul li format

[Demo](http://jformslider.com)
```
#!html

<div id="slider">
	<ul>
		<li>--form componants--</li>
		<li>--form componants--</li>
		<li>--form componants--</li>
	</ul>
</div>
```

## **Usage** ##


```
#!javascript

//default options
options={
	width:600,//width of slider
	height:300,//height of slider
	next_prev:true,//will show next and prev links
	next_class:'',//class for next link
	prev_class:'',//class for prev link
	error_class:'',//class for validation errors
	texts:{
			next:'next',//verbiage for next link
			prev:'prev'//verbiage for prev link
		  },
	speed:400,//slider speed
		}	
	$('#slider').jFormslider(options);//usage
```

## **Other features** ##
## **Little validations**##
if you want to validate a input or select element put attribute 'required' and to overide default message put attributr 'data-msg'

```
#!html

ex:<input type="text" name="username" required data-msg="Please enter username"/>
```

if you want to validate email put attribute 'email'

```
#!html

ex:<input type="text" name="email" required data-msg="Please enter a valid email "/>
```

## **Call before** ##

Before sliding to next slide you can call a function For this just put attribute

```
#!javascript

call-before="some_function()" 
```

in li Before loading this li it will call this function function should return true if you want to slide to this li function should return false if you dont want to slide to this li

## **Goto slide** ##
If you want to goto particular li without clicking through all slides you can call

```
#!javascript

$('#slider').gotoSlide(data-id)
```

you should specify a attribute in li called 'data-id' for this

```
#!javascript

<li data-id="middle_page"></li>
$('#slider').gotoSlide('middle_page')
```

More features are in development stage please report bugs to bugs@jformslider.com
