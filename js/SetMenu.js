/*
	/js/SetMenu.js
	Author: YttriumLab
	Copyright (c) 2026 YttriumLab. All rights reserved.
	Note:
		- This script does not work in a local environment.
*/

(function()
{
	var xhr=new XMLHttpRequest();
	xhr.open('GET','/templates/menu.htm',true);
	xhr.onreadystatechange=function()
	{
		if(xhr.readyState===4&&xhr.status===200)
			document.getElementById('nav').innerHTML=xhr.responseText;
	}
	xhr.send();
})();
