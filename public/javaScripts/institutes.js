try{
document.getElementById('checkForClick1').addEventListener('click',start,false);
document.getElementById('checkForClick2').addEventListener('click',start,false);
document.getElementById('checkForClick3').addEventListener('click',start,false);
function start(){
	console.log("Check");
	window.open("sub-institute.html");
}
}catch(e)
{
	console.log(e);
}
