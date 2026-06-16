(function()
{
	//assign a random link destination
	var choose=function(arr){return arr[Math.floor(Math.random()*arr.length)];}
	var links=[
		'https://en.wikipedia.org/wiki/Yttrium',
		'https://periodic-table.rsc.org/element/39/yttrium'];
	document.getElementById('yttriumPage').setAttribute('href',choose(links));
})();
