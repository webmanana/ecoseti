function a(){
  if($(window).width()>768){
		$(".footer_block").removeClass("accordion-item");
		$(".footer_block_content").removeClass("accordion-content");
		$(".footer_block_title").removeClass("accordion-title");
  }else{
    $(".footer_block").addClass("accordion-item");
		$(".footer_block_content").addClass("accordion-content");
		$(".footer_block_title").addClass("accordion-title");
  }
};
$(document).ready(a);
$('img[src$=".svg"]').each(function() {
	var $img = jQuery(this);
	var imgURL = $img.attr('src');
	var attributes = $img.prop("attributes");

	$.get(imgURL, function(data) {
	  // Get the SVG tag, ignore the rest
	  var $svg = jQuery(data).find('svg');

	  // Remove any invalid XML tags
	  $svg = $svg.removeAttr('xmlns:a');

	  // Loop through IMG attributes and apply on SVG
	  $.each(attributes, function() {
		$svg.attr(this.name, this.value);
	  });

	  // Replace IMG with SVG
	  $img.replaceWith($svg);
	}, 'xml');
});
$(window).on('load resize', function() {
	if ($(window).width() < 1500) {

		  var $nav = $('.greedy');
		  var $btn = $('.greedy button');
		  var $vlinks = $('.greedy .links');
		  var $hlinks = $('.greedy .dropdown_menu');

		  var numOfItems = 0;
		  var totalSpace = 0;
		  var breakWidths = [];

		  // Get initial state
		  $vlinks.children().outerWidth(function(i, w) {
		    totalSpace += w;
		    numOfItems += 1;
		    breakWidths.push(totalSpace);
		  });

		  var availableSpace, numOfVisibleItems, requiredSpace;

		  function check() {

		    // Get instant state
		    availableSpace = $vlinks.width() - 10;
		    numOfVisibleItems = $vlinks.children().length;
		    requiredSpace = breakWidths[numOfVisibleItems - 1];

		    // There is not enought space
		    if (requiredSpace > availableSpace) {
		      $vlinks.children().last().prependTo($hlinks);
		      numOfVisibleItems -= 1;
		      check();
		      // There is more than enough space
		    } else if (availableSpace > breakWidths[numOfVisibleItems]) {
		      $hlinks.children().first().appendTo($vlinks);
		      numOfVisibleItems += 1;
		    }
		    // Update the button accordingly
		    $btn.attr("count", numOfItems - numOfVisibleItems);
		    if (numOfVisibleItems === numOfItems) {
		      $btn.addClass('hidden');
		    } else $btn.removeClass('hidden');

		  }
		  // Window listeners
		  $(window).resize(function() {
		    check();
		  });

		  $btn.on('click', function() {
		    $hlinks.toggleClass('hidden');
		  });

		  check();
		  $( document ).ready(function() {
		  	$('.header_top_menu').addClass('initialized');
		  });
	}
});
