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
	var MAX_RETRY=1;
	var url='/templates/menu.htm';
	
	var Load=function()
	{
		console.log('[Menu] Loading menu ... (try '+(retry+1)+')');
		
		var xhr=new XMLHttpRequest();
		xhr.open('GET',url,true);
		xhr.onreadystatechange=function()
		{
			if(xhr.readyState===4)
			{
				if(xhr.status===200)
				{
					document.getElementById('nav').innerHTML=xhr.responseText;
					console.log('[Menu] Menu loaded successfully.');
				}
				else if(retry<MAX_RETRY)
				{
					console.warn('[Menu] Load failed (status: '+xhr.status+'). Retrying ... (try '+(retry+1)+')');
					retry++;
					console.log('[Menu] Retry scheduled in 500ms ...');
					window.setTimeout(function()
						{
							console.log('[Menu] Retry started (try '+retry+')');
							Load();
						}
						,500);//retry on failure
				}
				else
				{
					document.getElementById('nav').innerHTML='<div class="par">Menu unavailable.</div>';
					console.error('[Menu] Final failure. URL: '+url+', status: '+xhr.status);
				}
			}
		}
		xhr.send();
	}
	Load();
})();
