jFormslider v1.0.2
===========
jFormslider v1.0.2der v1.0.2 is a jquery pluggin where we can convert a big form in to a slider<br/>
Form should be in ul li format

<a  href="http://jformslider.0fees.us" target="_blank">Click Here for Demo</a>
<br/>
<div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #007700">&lt;div</span> <span style="color: #0000CC">id=</span><span style="background-color: #fff0f0">&quot;slider&quot;</span><span style="color: #007700">&gt;</span>
	<span style="color: #007700">&lt;ul&gt;</span>
		<span style="color: #007700">&lt;li&gt;</span>--form componants--<span style="color: #007700">&lt;/li&gt;</span>
		<span style="color: #007700">&lt;li&gt;</span>--form componants--<span style="color: #007700">&lt;/li&gt;</span>
		<span style="color: #007700">&lt;li&gt;</span>--form componants--<span style="color: #007700">&lt;/li&gt;</span>
	<span style="color: #007700">&lt;/ul&gt;</span>
<span style="color: #007700">&lt;/div&gt;</span>
</pre></div>



<h4>Usage</h4>
			<!--usage-->
			<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #888888">//default options</span>
options<span style="color: #333333">=</span>{
	width<span style="color: #333333">:</span><span style="color: #0000DD; font-weight: bold">600</span>,<span style="color: #888888">//width of slider</span>
	height<span style="color: #333333">:</span><span style="color: #0000DD; font-weight: bold">300</span>,<span style="color: #888888">//height of slider</span>
	next_prev<span style="color: #333333">:</span><span style="color: #008800; font-weight: bold">true</span>,<span style="color: #888888">//will show next and prev links</span>
	next_class<span style="color: #333333">:</span><span style="background-color: #fff0f0">&#39;&#39;</span>,<span style="color: #888888">//class for next link</span>
	prev_class<span style="color: #333333">:</span><span style="background-color: #fff0f0">&#39;&#39;</span>,<span style="color: #888888">//class for prev link</span>
	error_class<span style="color: #333333">:</span><span style="background-color: #fff0f0">&#39;&#39;</span>,<span style="color: #888888">//class for validation errors</span>
	texts<span style="color: #333333">:</span>{
			next<span style="color: #333333">:</span><span style="background-color: #fff0f0">&#39;next&#39;</span>,<span style="color: #888888">//verbiage for next link</span>
			prev<span style="color: #333333">:</span><span style="background-color: #fff0f0">&#39;prev&#39;</span><span style="color: #888888">//verbiage for prev link</span>
		  },
	speed<span style="color: #333333">:</span><span style="color: #0000DD; font-weight: bold">400</span>,<span style="color: #888888">//slider speed</span>
		}	<br/>	$(<span style="background-color: #fff0f0">&#39;#slider&#39;</span>).jFormslider(options);//usage
</pre></div>

			<!--usage-->
		<div>
		<div class="col-xs-6 col-md-6" style="margin-top:10px">
		
		<a type="button" class="btn btn-success download" href="https://github.com/harishuw/jFormslider">Download From github</a>
		
		<a type="button" class="btn btn-success download" href="http://plugins.jquery.com/jformslider" style="margin-top:10px">jquery Pluggin site</a>
		
			<div class="alert alert-info" role="alert" style="margin-top:10px">
      More features are in development stage

please report bugs to <i>huwz1it@gmail.com	</i>
    </div>
		</div>
</div>

<h3>Other features</h3>
		   <h4>Little validations</h4>
		<div>
		if you want to validate a input or select element put attribute 'required'
and to overide default message put attributr 'data-msg'
		</div>

<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">ex:<span style="color: #007700">&lt;input</span> <span style="color: #0000CC">type=</span><span style="background-color: #fff0f0">&quot;text&quot;</span> <span style="color: #0000CC">name=</span><span style="background-color: #fff0f0">&quot;username&quot;</span> <span style="color: #0000CC">required</span> <span style="color: #0000CC">data-msg=</span><span style="background-color: #fff0f0">&quot;Please enter username&quot;</span><span style="color: #007700">/&gt;</span>
</pre></div>
<!-- HTML generated using hilite.me -->
if you want to validate email put attribute 'email'
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">ex:<span style="color: #007700">&lt;input</span> <span style="color: #0000CC">type=</span><span style="background-color: #fff0f0">&quot;text&quot;</span> <span style="color: #0000CC">name=</span><span style="background-color: #fff0f0">&quot;email&quot;</span> <span style="color: #0000CC">required</span> <span style="color: #0000CC">data-msg=</span><span style="background-color: #fff0f0">&quot;Please enter a valid email &quot;</span><span style="color: #007700">/&gt;</span>
</pre></div>
<!-- HTML generated using hilite.me -->
<h4>Call before</h4>
Before sliding to next slide you can call a function 
For this just put attribute <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">call-before=&quot;some_function()&quot; 
</pre></div><!-- HTML generated using hilite.me -->
in li 
Before loading this li it will call this function
function should return true if you want to slide to this li
function should return false if you  dont want to slide to this li

<h4>Goto slide</h4>

If you want to goto particular li  without clicking through all slides
you can call 
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">$(<span style="background-color: #fff0f0">&#39;#slider&#39;</span>).gotoSlide(data<span style="color: #333333">-</span>id)
</pre></div>
<!-- HTML generated using hilite.me -->

you should specify a attribute in li called 'data-id' for this
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"><span style="color: #007700">&lt;li</span> <span style="color: #0000CC">data-id=</span><span style="background-color: #fff0f0">&quot;middle_page&quot;</span><span style="color: #007700">&gt;&lt;/li&gt;</span>
</pre></div>
<!-- HTML generated using hilite.me -->
<!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">$(<span style="background-color: #fff0f0">&#39;#slider&#39;</span>).gotoSlide(<span style="background-color: #fff0f0">&#39;middle_page&#39;</span>)
</pre></div>
<!-- HTML generated using hilite.me -->


	<div class="alert alert-info" role="alert" style="margin-top:10px">
      More features are in development stage

please report bugs to <i>huwz1it@gmail.com	</i>
    </div>


		
