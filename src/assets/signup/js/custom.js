$(document).ready(function(){
	
	$('#testimonial_slider').owlCarousel({
		loop: false,
	    margin:0,
	    nav:true,
	    dots: false,
	    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:1
	        }
	    }
	});
});