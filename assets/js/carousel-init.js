$(document).ready(function(){
  // Initialize Owl Carousel for Hero Slider
  $('.hero-slider').owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 6000,
    smartSpeed: 1000,
    autoplayHoverPause: true
  });
  
  // Custom navigation with car icons
  $('.hero-slide-nav .nav-dot').click(function(){
    var slideIndex = $(this).data('slide');
    $('.hero-slider').trigger('to.owl.carousel', [slideIndex, 300]);
  });
  
  // Update active car icon on slide change
  $('.hero-slider').on('changed.owl.carousel', function(event) {
    var current = event.item.index;
    if (event.relatedTarget._clones && event.item.count) {
      current = (current - event.relatedTarget._clones.length / 2) % event.item.count;
      current = (current + event.item.count) % event.item.count;
    }
    $('.hero-slide-nav .nav-dot').removeClass('active');
    $('.hero-slide-nav .nav-dot[data-slide="' + current + '"]').addClass('active');
  });
});