/*
	DomTools.js
	Author: YttriumLab
	Terms of use:
		- If you use this, please retain the author name (YttriumLab).
		- Modification and commercial use are permitted.
		- Functionality is not guaranteed.
	
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	......................-+=-=..----.................................................:-::==........................................
	.......................:@%...:@*:..................................................+@#..........................................
	........................-@-..#=....................................................:@#..........................................
	.........................=@-#=..=%*#@**@-@**@#+@+-%%+%=..+@@=:%@*..*@#:*%@:..*@+:..:@#.........**...=%##=.......................
	..........................%@-......-@-.....:%*....=#.**...#*..-%:...#:..#%*.:*@:...:@#........:#@:...@=-@:......................
	..........................#@-......-@=......%#....+@##....#+..-@:...%...*:@=*:@:...:@#.....::.#+##...@##*.......................
	.........................:%@=......-@=......%#....+@.+%:..##..:@+:.-*..:*.=@..@*:..=@#....*@:-=..@=.:@=:@+......................
	........................-=-:==-...:+=+:....+=+=..---:.:=:=+==...-++:..:==-.:.====-+=-:-+=+=:-++:-==.=+=-........................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	................................................................................................................................
	
	
	- If the ASCII art above appears garbled,
		please use a monospace font
		and ensure you have enough screen space to view it properly!
*/

(function()
{
	//--- HELPERS ---
	
	var Helpers={};
	
	Helpers.GetEl=function(id){return document.getElementById(id)||document.all[id];}
	
	Helpers.AddEvent=function(_el,_ev,_func)
	{
		if(_el.addEventListener){_el.addEventListener(_ev,_func,false);return [_el,_ev,_func];}
		else if(_el.attachEvent){var func2=function(){_func.call(_el);};_el.attachEvent('on'+_ev,func2);return [_el,_ev,_func2];}
		return false;
	}
	Helpers.RemoveEvent=function(_evObj)
	{
		if(!_evObj) return false;
		if(_evObj[0].removeEventListener) _evObj[0].removeEventListener(_evObj[1],_evObj[2],false);
		else if(_evObj[0].detachEvent) _evObj[0].detachEvent('on'+_evObj[1],_evObj[2]);
		return true;
	}
	
	Helpers.GetEvent=function(e){return e||window.event;}
	Helpers.GetTarget=function(e)
	{
		e=Helpers.GetEvent(e);
		return e.target||e.srcElement;
	}
	
	Helpers.PreventDefault=function(e)
	{
		e=Helpers.GetEvent(e);
		if(e.preventDefault) e.preventDefault();
		else e.returnValue=false;
	}
	Helpers.StopPropagation=function(e)
	{
		e=Helpers.GetEvent(e);
		if(e.stopPropagation) e.stopPropagation();
		else e.cancelBubble=true;
	}
	
	//--- MOVE ELEMENT ---
	
	var DomTools={};
	
	DomTools.MoveTo=function(el,x,y)
	{
		if(!el) return;
		
		if(el.style.position!=='absolute'&&
			el.style.position!=='relative') el.style.position='absolute';
		
		el.style.left=x+'px';
		el.style.top=y+'px';
	}
	DomTools.MoveBy=function(el,dx,dy)
	{
		if(!el) return;
		
		var pos=DomTools.GetPos(el);
		DomTools.MoveTo(el,pos.x+dx,pos.y+dy);
	}
	
	DomTools.GetPos=function(el)
	{
		var x=0,y=0;
		
		while(el)
		{
			x+=el.offsetLeft;
			y+=el.offsetTop;
			el=el.offsetParent;
		}
		return {x:x,y:y};
	}
	DomTools.GetScrollX=function()
	{
		return window.pageXOffset||
			document.documentElement.scrollLeft||
			document.body.scrollLeft||
			0;
	}
	DomTools.GetScrollY=function()
	{
		return window.pageYOffset||
			document.documentElement.scrollTop||
			document.body.scrollTop||
			0;
	}
	
	DomTools.SlideTo=function(el,x,y,dur)
	{
		//animation
		
		if(!el) return;
		
		dur=dur||500;
		
		var start=DomTools.GetPos(el);
		var sx=start.x;
		var sy=start.y;
		var dx=x-sx;
		var dy=y-sy;
		var startTime=new Date().getTime();
		
		var step=function()
		{
			var now=new Date().getTime();
			var t=(now-startTime)/dur;
			if(t>1) t=1;
			
			var ease=1-Math.pow(1-t,3);
			var nx=sx+dx*ease;
			var ny=sy+dy*ease;
			DomTools.MoveTo(el,nx,ny);
			
			if(t<1) window.setTimeout(step,16);
		}
		step();
	}
	
	//--- DRAG AND DROP ---
	
	DomTools.MakeDraggable=function(el)
	{
		if(!el) return;
		
		el.style.position = el.style.position||'absolute';
		
		var offsetX=0;
		var offsetY=0;
		var isDragging=false;
		var moveHandler,upHandler;
		
		var down=function(e)
		{
			e=Helpers.GetEvent(e);
			var pos=DomTools.GetPos(el);
			offsetX=e.clientX-pos.x;
			offsetY=e.clientY-pos.y;
			isDragging=true;
			
			moveHandler=Helpers.AddEvent(document,'mousemove',move);
			upHandler=Helpers.AddEvent(document,'mouseup',up);
			
			Helpers.PreventDefault(e);
		}
		var move=function(e)
		{
			if(!isDragging) return;
			
			e=Helpers.GetEvent(e);
			var x=e.clientX-offsetX;
			var y=e.clientY-offsetY;
			
			DomTools.MoveTo(el,x,y);
		}
		var up=function()
		{
			isDragging=false;
			Helpers.RemoveEvent(moveHandler);
			Helpers.RemoveEvent(upHandler);
		}
		
		Helpers.AddEvent(el,'mousedown',down);
	}

	window.DomTools=DomTools;
})();
