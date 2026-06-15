/*
	/js/AjaxNav.js
	Author: YttriumLab
	Copyright (c) 2026 YttriumLab. All rights reserved.
	Note:
		- This script does not work in a local environment.
*/

var LoadPage=function(url)
{
	var req=new XMLHttpRequest;
	req.onreadystatechange=function()
	{
		if(req.readyState!==4) return;
		
		if(req.status==200)
		{
			//congratulations!
			console.log('[AjaxNav] Content has loaded: '+url);
			document.getElementById('content').innerHTML=req.responseText;
		}
		else
		{
			//oops, an error!
			console.error('[AjaxNav] Failed to load: '+url+
				' (status: '+req.status+')');
		}
	}
	req.open('GET',url,true);
	req.send();
}
