$(document).ready(function() {
    $(window).bind('scroll',function(e){
    	parallaxScroll();
    });
});

function parallaxScroll(){
	var scrolled = $(window).scrollTop();
	$('#parallax-01').css('top',(0-(scrolled*.6))+'px');
	$('#parallax-02').css('top',(0-(scrolled*1))+'px');
	$('#parallax-03').css('top',(0-(scrolled*1.5))+'px');
	$('#parallax-04').css('top',(0-(scrolled*.8))+'px');
	$('#parallax-05').css('top',(0-(scrolled*1.1))+'px');
	$('#parallax-06').css('top',(0-(scrolled*1.8))+'px');
	$('#parallax-07').css('top',(0-(scrolled*2))+'px');
}
