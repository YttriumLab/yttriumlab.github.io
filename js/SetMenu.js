/*
	/js/SetMenu.js
	Author: YttriumLab
	Copyright (c) 2026 YttriumLab. All rights reserved.
	Note:
		- This script does not work in a local environment.
*/

(function()
{
	var retry=0;
	
	var Load=function()
	{
		var xhr=new XMLHttpRequest();
		xhr.open('GET','/templates/menu.htm',true);
		xhr.onreadystatechange=function()
		{
			if(xhr.readyState===4)
			{
				if(xhr.status===200)
					document.getElementById('nav').innerHTML=xhr.responseText;
				else if(retry<1)
				{
					retry++;
					window.setTimeout(Load,500);//retry on failure
				}
				else
					document.getElementById('nav').innerHTML='<div class="par">Menu unavailable.</div>';
			}
		}
		xhr.send();
	}
	Load();
})();
