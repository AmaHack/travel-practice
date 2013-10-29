// JavaScript Document

var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper');
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);


$(document).ready(function() {

$(".mask, .popUp").hide();
$(".close").click(function(){
	$(".mask, .popUp").hide();
	});
$(".facebook, .seasaonal, .wellBeing").click(function(){
	$(".mask, .popUp").show();
	});
	


});


