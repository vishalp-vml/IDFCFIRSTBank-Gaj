$(document).ready(function () {
    // $('#myModal').modal('show');

    var nudgeSwiperBenefits = new Swiper(".metal-red-swiper-new", {
        slidesPerView: 3.1,
        spaceBetween: 24,
        grabCursor: true,
        loop: false,
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
            dragSize: 10,
            snapOnRelease: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                speed: 900 /* Duration of transition between slides (in ms) */,
                slidesPerView: 2,
                spaceBetween: 16,
                loop: false,
                //   centeredSlides: true,
                navigation: {
                    enabled: true,
                },
            },
            767: {
                speed: 900 /* Duration of transition between slides (in ms) */,
                slidesPerView: 2.5,
                spaceBetween: 24,
                centeredSlides: false,
                loop: false,
                navigation: {
                    enabled: false,
                },
            },
        },
    });

    
    //Faqs Accordion
    $('.tog_cont').not('.show').hide();
    // $('.trgr:eq(0)').removeClass('act').next().hide();
    $('.trgr').on('click', function () {
      if ($(this).next().is(':hidden')) {
        $('.trgr').removeClass('act').next().slideUp(500);
        $(this).addClass('act').next().slideDown(400, function () {
          // scroll top When you expand other accordions 
          $('html, body').animate({
            scrollTop: $(this).offset().top - 300
          }, 700);
        });
      } else {
        $(this).removeClass('act').next().slideUp(500);
      }
    });

    $(".exclusiveInauguralOfferAshwa").on("click", function () {
        $(".eioAshwaItems").toggleClass("d-none");
        if ($(".eioAshwaItems").hasClass("d-none")) {
            $(".eioAshwaImage").css("transform", "rotate(" + 0 + "deg)");
        } else {
            $(".eioAshwaImage").css("transform", "rotate(" + 180 + "deg)");
        }
    });

    $(".welcomeBenefitAshwa").on("click", function () {
        $(".wbAshwaDIvItems").toggleClass("d-none");
        if ($(".wbAshwaDIvItems").hasClass("d-none")) {
            $(".wbAshwaImage").css("transform", "rotate(" + 0 + "deg)");
        } else {
            $(".wbAshwaImage").css("transform", "rotate(" + 180 + "deg)");
        }
    });
    
});