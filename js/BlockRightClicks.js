
/*
	/js/BlockRightClicks.js
	Author: YttriumLab
	Copyright (c) 2026 YttriumLab. All rights reserved.
*/

var EnableRightClick=function(enabled)
{
	var AddEvent=function(_el,_ev,_func)
	{
		if(_el.addEventListener){_el.addEventListener(_ev,_func,false);return [_el,_ev,_func];}
		else if(_el.attachEvent){var func2=function(){_func.call(_el);};_el.attachEvent('on'+_ev,func2);return [_el,_ev,_func2];}
		return false;
	}
	var RemoveEvent=function(_evObj)
	{
		if(!_evObj) return false;
		if(_evObj[0].removeEventListener) _evObj[0].removeEventListener(_evObj[1],_evObj[2],false);
		else if(_evObj[0].detachEvent) _evObj[0].detachEvent('on'+_evObj[1],_evObj[2]);
		return true;
	}
	
	if(enabled)
	{
		if(typeof window.__yLab_contextMenuEvent==='undefined'){console.log('Unable to enable right-click.');return false;}
		RemoveEvent(window.__yLab_contextMenuEvent);
		console.log('Right-clicking is now enabled on this site!');
		delete window.__yLab_contextMenuEvent;
	}
	else
	{
		if(window.__yLab_contextMenuEvent) RemoveEvent(window.__yLab_contextMenuEvent);
		window.__yLab_contextMenuEvent=AddEvent(document,'contextmenu',
			function(e)
			{
				if(e.preventDefault) e.preventDefault();
				else e.returnValue=false;
				console.log(
					'Right-clicking is disabled on this site.\n'+
					'To enable it, please execute EnableRightClick(true).');
			});
	}
}

EnableRightClick(false);
