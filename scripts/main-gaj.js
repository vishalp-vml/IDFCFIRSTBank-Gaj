if (
  window.devicePixelRatio === 1.5 &&
  screen.width === 1280
) {
  console.log("window 150");
  $("body").addClass("window150");
}

/* Intro Animation for GAJ Credit Card banner */
const imgm = document.querySelector("#gajCard");
const mm = gsap.matchMedia();
const audio = document.getElementById("mySound2");
// const tl = gsap.timeline({ paused: true });
const tl = gsap.timeline();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  window.tl = tl;

  mm.add({
    desktop: "(min-width: 1024px) and (max-resolution: 134dpi)",
    win150: "(min-width: 1024px) and (min-resolution: 135dpi) and (max-resolution: 150dpi)",
    retina: "(min-width: 1024px) and (min-resolution: 151dpi)",
    tablet: "(min-width: 768px) and (max-width: 1023px)",
    mobile: "(max-width: 767px)"
  }, (context) => {

    const { desktop, win150, retina, tablet, mobile } = context.conditions;

    console.log(context.conditions);

    const imgTl = gsap.timeline({ repeat: 1 });

    imgTl
      .to(".img1", { autoAlpha: 1, duration: 0.5 })
      .to(".img1", { autoAlpha: 0, duration: 0.5 }, "+=0.5")
      .to(".img2", { autoAlpha: 1, duration: 0.5 })
      .to(".img2", { autoAlpha: 0, duration: 0.5 }, "+=0.5");

    tl.to('.hdg32',{
      opacity: 0,
      duration: 1,
      ease: "power2.in"
    })
    tl.to(".curtain__panel--left", {
      xPercent: -100,
      duration: 1.5,
      ease: "expo.inOut"
    }, "-=1.5")
    tl.to(".curtain__panel--right", {
      xPercent: 100,
      duration: 1.5,
      ease: "expo.inOut"
    }, "-=1.5")

    tl.from(".intro_txt", {
      yPercent: -50,
      opacity: 0,
      duration: 2,
      ease: "power2.in"
    })

    .add(imgTl);

    tl.to(".card_anim", {
      opacity: 1,
      duration: 0.8,
      ease: "power1.in"
    }, "-=1");

    tl.fromTo(".credit-card",
      {
        scale: mobile ? 3.5 : 2.2,
        autoAlpha: 0.8,
        xPercent: mobile ? -21 : -10,
      },
      {
        scale: mobile ? 0.75 : 0.315,
        xPercent: 0,
        yPercent: mobile ?-7.5 : 0,
        autoAlpha: 1,
        duration: 2.5,
        ease: "back.out(1.4)"
      }
    )

      .fromTo(".myVideo",
        {
          opacity: 0,
          scale: 0.2,
          filter: "blur(20px)",
          xPercent: -50,
          yPercent: -46
        },
        {
          opacity: 1,
          scale: mobile ? 0.6 : win150 ? 0.5 : 0.75, 
          yPercent: win150 ? -50 : -46,
          filter: "blur(0px)",
          duration: 1.7,
          ease: "power2.in"
        },
        "-=2" 
      )
      .to(".myVideo", {
        duration: 0.3
      })
      .to(".myVideo", {
        opacity: 0,
        scale: mobile ? 0.8 : win150 ? 0.9 : 1.1,
        duration: 0.8,
        ease: "power2.out"
      });

    tl.to(".credit-card", {
      opacity: 0,
      duration: 1,
      ease: "power2.in"
    })
    tl.to(".credit-card1", {
      display: "block",
      duration: 1,
      ease: "power2.in"
    }, "-=2")

    // 🎵 AUDIO sync (best place)
    // tl.add(() => {
    //   audio.play();
    // }, "-=2"); // play audio during explosion
  })

  // 2nd fold video start
  const video = document.getElementById("heroVideo");
  const muteBtn = document.getElementById("muteBtn");
  const muteIcon = document.getElementById("muteIcon");

  video.muted = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");

  ScrollTrigger.create({
    trigger: ".video-section",
    start: "top 70%",
    end: "bottom 30%",
    // once: true,
    onEnter: () => {
      video.play().catch(() => {
        console.log("Autoplay blocked");
      });
    },
    onLeave: () => video.pause(),
    onEnterBack: () => video.play(),
    onLeaveBack: () => video.pause()
  });

  muteBtn.addEventListener("click", () => {
    gsap.fromTo(muteBtn,
      { scale: 0.8 },
      { scale: 1, duration: 0.3, ease: "back.out(2)" }
    );
    video.muted = !video.muted;
    muteBtn.classList.toggle("muted", video.muted);
    muteBtn.classList.toggle("unmuted", !video.muted);
    muteIcon.alt = video.muted ? "Mute" : "Unmute";
  });
  // 2nd fold video end


  // mm.add("(min-width: 768px)", () => {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".card-intro",
  //         start: "top-=150 top",
  //         end: "+=150%",
  //         pin: true,
  //         scrub: true
  //       }
  //     })
  //     .to(imgm, {
  //       scale: 0.75,
  //       transformOrigin: "center center",
  //       ease: "power1.out",
  //       duration: 0.8
  //     })
  //     .to([".scroll-txt", ".card-title"], {
  //       scale: 0,
  //       opacity: 0,
  //       ease: "power1.inOut"
  //     }, "<")
  //     .to(".sandImg", {
  //       scale: 1.3,
  //       opacity: 1,
  //       ease: "power1.inOut"
  //     })
  //     .to(imgm, {
  //       xPercent: -58,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     })
  //     .to(".sandImg", {
  //       xPercent: -95,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     }, "<")
  //     .to(".card-detail", {
  //       scale: 1,
  //       opacity: 1,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     }, "<")
  //     .to({}, { duration: 0.4 });
  // });

  // mm.add("(max-width: 767px)", () => {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: ".card-intro",
  //         start: "top-=120 top",
  //         end: "+=150%",
  //         pin: true,
  //         scrub: true
  //       }
  //     })
  //     .to(imgm, {
  //       scale: 1.3,
  //       z: 350,
  //       transformOrigin: "center center",
  //       ease: "power1.out",
  //       duration: 0.8
  //     })
  //     .to([".scroll-txt", ".card-title"], {
  //       scale: 0,
  //       opacity: 0,
  //       ease: "power1.inOut"
  //     }, "<")
  //     .to(".sandImg", {
  //       scale: .8,
  //       opacity: 1,
  //       ease: "power1.inOut"
  //     })

  //     .to(imgm, {
  //       yPercent: -70,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     })
  //     .to(".sandImg", {
  //       yPercent: -85,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     }, "<")
  //     .to(".card-detail", {
  //       scale: 1,
  //       opacity: 1,
  //       ease: "power1.inOut",
  //       duration: 0.6
  //     }, "<")
  //     .to({}, { duration: 0.4 });
  // });
});

setTimeout(() => {
  document.getElementsByClassName("scroll-down").item(0).style.opacity = "1";
}, 7500);

// setTimeout(() => {
//   $('.credit-card1').css('display', 'block');
//   $('.credit-card').css('display', 'none');
//   // document.getElementsByClassName(".credit-card1").item(0).style.opacity = "1";
//   // document.getElementsByClassName(".credit-card").item(0).style.opacity = "0";
// }, 7500);

var applyNowMob = document.querySelector("#rooted_timeless");
if (applyNowMob) {
  document.addEventListener("scroll", function () {
    var applyBox = document.querySelector(".apply-now-mob");
    var applyNowMobTop = applyNowMob.getBoundingClientRect().top;
    var offset = 0; // You can change this value to the desired offset
    if (applyNowMobTop <= offset) {
      applyBox?.classList.add("active");
    } else {
      applyBox?.classList.remove("active");
    }
  });
}


$(document).ready(function () {
  // gsap.registerPlugin(ScrollSmoother);
  // var s = skrollr.init();

  $('.scrollToNext').on('click', function () {
    $("html, body").animate({
      scrollTop: $("#rooted_timeless").offset().top - 105
    }, 900);
  })

  $('.scrollToNext1').on('click', function () {
    $("html, body").animate({
      scrollTop: $("#card_benefits").offset().top - 105
    }, 900);
  })
  var rootedSlider = new Swiper(".rooted-slider", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 5000,
    },
  });

  var faqSwiper = new Swiper(".faqSwiper", {
      slidesPerView: "auto",
      spaceBetween: 20,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: 146,
      },
      navigation: {
        nextEl: ".next-btn",
        prevEl: ".prev-btn",
      },
      breakpoints: {
      320: {
        slidesPerView:"auto",
        spaceBetween: 12,
        navigation: {
          enabled: false,
        },
        scrollbar: {
          enabled: false,
        }
      },
      990: {
        slidesPerView:"auto",
        spaceBetween: 16,
        navigation: {
          enabled: true,
        },
        scrollbar: {
          enabled: true,
        }
      },
    },
    });

  var gajCardFeatures = new Swiper(".gaj-card-features", {
    slidesPerView: 3,
    spaceBetween: 26,
    grabCursor: true,
    centerInsufficientSlides: true,
    loop: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: 16,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        speed: 900 /* Duration of transition between slides (in ms) */,
        slidesPerView: 1,
        spaceBetween: 16,
        loop: false,
        navigation: {
          enabled: true,
        },
      },
      767: {
        speed: 900 /* Duration of transition between slides (in ms) */,
        slidesPerView: 3,
        spaceBetween: 16,
        centeredSlides: false,
        loop: false,
        navigation: {
          enabled: true,
        },
      },
    },
  });

  var gaj3cardSwiper = new Swiper(".gaj-3card-swiper", {
    slidesPerView: 3,
    spaceBetween: 46,
    grabCursor: true,
    centerInsufficientSlides: true,
    loop: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: 20,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
    breakpoints: {
      320: {
        // when window width is >= 320px
        speed: 900, // Duration of transition between slides (in ms)
        slidesPerView: 1,
        spaceBetween: 14,
        loop: false,
        navigation: {
          enabled: true,
        },
      },
      767: {
        // when window width is >= 767px
        speed: 900, // Duration of transition between slides (in ms)
        slidesPerView: 2.3,
        spaceBetween: 20,
        centeredSlides: false,
        loop: false,
      },
      990: {
        // when window width is >= 767px
        speed: 900, // Duration of transition between slides (in ms)
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: false,
        loop: false,
        navigation: {
          enabled: false,
        },
      },
    },
  });

  var swiper = new Swiper(".mySwiperThingsMoney", {
    slidesPerView: 3,       // show 3 slides
    centeredSlides: true,   // middle slide is centered
    grabCursor: true,
    spaceBetween: 20,       // gap between slides
    loop: true,
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
      dragSize: 16,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    breakpoints: {
      320: {
        // when window width is >= 320px
        speed: 900, // Duration of transition between slides (in ms)
        slidesPerView: 1,
        spaceBetween: 14,
        loop: false,
        navigation: {
          enabled: false,
        },
      },
      767: {
        // when window width is >= 767px
        slidesPerView: 3,       // show 3 slides
        centeredSlides: true,   // middle slide is centered
        grabCursor: true,
        spaceBetween: 20,
      },
      990: {
        // when window width is >= 767px
        slidesPerView: 3,       // show 3 slides
        centeredSlides: true,   // middle slide is centered
        grabCursor: true,
        spaceBetween: 20,       // gap between slides

      },
    },
  });
 
  let mySwiper;

  function initSwiper() {
    if (window.innerWidth >= 768) {
      if (!mySwiper) {
        mySwiper = new Swiper(".gaj-reward-swiper", {
          slidesPerView: 3,
          spaceBetween: 46,
          grabCursor: true,
          centerInsufficientSlides: true,
          loop: true,
          scrollbar: {
            el: ".swiper-1",
            draggable: true,
            dragSize: 10,
          },
          pagination: {
            el: ".swiper-pagination",
            type: "fraction",
          },
          navigation: {
            nextEl: ".swiper-btn-next",
            prevEl: ".swiper-btn-prev",
          },
          breakpoints: {
            320: {
              // when window width is >= 320px
              speed: 900, // Duration of transition between slides (in ms)
              slidesPerView: 1,
              spaceBetween: 14,
              loop: false,
            },
            767: {
              // when window width is >= 767px
              speed: 900, // Duration of transition between slides (in ms)
              slidesPerView: 2.3,
              spaceBetween: 20,
              centeredSlides: false,
              loop: false,
            },
            991: {
            speed: 900, /* Duration of transition between slides (in ms) */
            slidesPerView: 3,
            spaceBetween: 26,
            loop: false,
            navigation: {
              enabled: true
            }
          },
          },
        });
      }
    } else {
      if (mySwiper) {
        mySwiper.destroy(true, true);
        mySwiper = null;
      }
    }
  }

  // run on load
  initSwiper();

  // run on resize
  window.addEventListener("resize", initSwiper);

  // $('.gaj-reward-swiper .swiper-slide').on('click', function () {
  //   $('.gaj-reward-swiper .swiper-slide').removeClass('active');
  //   $(this).addClass('active');
  // });
})

document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in-up-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is in the viewport
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
});


if ($(".gaj-cc-faq")) {
  var filterAttrs = "all";

  var selectedFilter = $(".gaj-cc-faq-filter-items")
    .children()
    .filter(".gaj-cc-faq-filter-items-txt.active")
    .parent()
    .attr("data-attr");
  var faqMoreBtn = $("#faqMoreNew");
  var lessFaqBtn = $("#lessMoreNew");
  var showCount = 0;

  $(".gaj-cc-faq-filter-items").click(function (e) {
    const result = $(this).data("attr");
    if (result === "all") {
    } else {
      e.preventDefault();
      $("#faqMoreNew").removeClass("d-none");
      $("#faqMoreNew").css("display", "flex");

      // console.log(selectedFilter);
      selectedFilter = $(".gaj-cc-faq-filter-items")
        .children()
        .filter(".gaj-cc-faq-filter-items-txt.active")
        .parent()
        .attr("data-attr");
      showCount = 0;
      $(".faq-wrap").each(function () {
        var ariaLabel = $(this).attr("aria-label");
        var isMatch = ariaLabel.includes(selectedFilter);
        if (isMatch && showCount <= 4) {
          $(this).show();
          showCount++;
        } else {
          $(this).hide();
        }

        if (showCount <= 4) {
          lessFaqBtn.hide();
        } else {
          lessFaqBtn.show();
        }
        $("#lessMoreNew").addClass("d-none");
      });
    }
  });

  $("#loadmoreFaqccNew").click(function (e) {
    $("#lessMoreNew").css("display", "flex");
    $("#lessMoreNew").removeClass("d-none");
    e.preventDefault();
    selectedFilter = $(".gaj-cc-faq-filter-items")
      .children()
      .filter(".gaj-cc-faq-filter-items-txt.active")
      .parent()
      .attr("data-attr");
    showCount = 0;
    $(".faq-wrap").each(function () {
      var ariaLabel = $(this).attr("aria-label");
      var isMatch = ariaLabel.includes(selectedFilter);
      if (isMatch) {
        $(this).show();
        faqMoreBtn.hide();
      } else {
        $(this).hide();
      }
    });
    console.log(selectedFilter)
    $("#faqMoreNew").css('display', 'none');
  });

  $("#viewlessNew").click(function (e) {
    e.preventDefault();
    $("#faqMoreNew").removeClass("d-none");
    $("#faqMoreNew").css("display", "flex");

    // console.log(selectedFilter);
    selectedFilter = $(".gaj-cc-faq-filter-items")
      .children()
      .filter(".gaj-cc-faq-filter-items-txt.active")
      .parent()
      .attr("data-attr");
    showCount = 0;
    $(".faq-wrap").each(function () {
      var ariaLabel = $(this).attr("aria-label");
      var isMatch = ariaLabel.includes(selectedFilter);
      if (isMatch && showCount <= 4) {
        $(this).show();
        showCount++;
      } else {
        $(this).hide();
      }

      if (showCount <= 4) {
        lessFaqBtn.hide();
      } else {
        lessFaqBtn.show();
      }
      $("#lessMoreNew").addClass("d-none");
    });
    $("html, body").animate(
      {
        scrollTop: $("#asvafaqcompo").offset().top,
      },
      800
    );
  });

  $(".gaj-cc-faq-filter-items").click(function () {
    showCount = 0;
    selectedFilter = $(".gaj-cc-faq-filter-items")
      .children()
      .filter(".gaj-cc-faq-filter-items-txt.active")
      .parent()
      .attr("data-attr");
    filterAttrs = $(this).data("attr").split(" ");
    $(".gaj-cc-faq-filter-items").children().removeClass("active");

    $(this).children().addClass("active");
    $(".faq-wrap").each(function () {
      var ariaLabel = $(this).attr("aria-label");
      var isMatch = filterAttrs.some(function (attr) {
        return ariaLabel.includes(attr);
      });

      if (isMatch && showCount < 5) {
        $(this).show();
        showCount++;
        $("#lessMore").addClass("d-none");

        // $(this).show();
      } else {
        $(this).hide();
        $("#lessMore").removeClass("d-none");
      }

      if (showCount <= 4) {
        faqMoreBtn.hide();
        $("#lessMore").addClass("d-none");
      } else {
        faqMoreBtn.show();
        $("#lessMore").addClass("d-none");
      }

      // $("#lessMore").addClass('d-none')
      // $("#faqMore").addClass('d-none')
    });
  });

  $(".gaj-cc-faq-filter-items[data-attr='all']").trigger("click");

  $("#trackapp").on("click", function () {
    $(".viewAllcards").removeClass("show");
  });
  $(".faqtab").on("click", function () {
    var att = $(this).attr("data-attr");

    if (att == "emiR" || "rp" || "cl" || "cb" || "pay" || "stat") {
      $(".viewAllcards").removeClass("show");
      var scrollLen = 0;
      $(".gaj-cc-faq-filter-items[data-attr]").each(function (ele) {
        if ($(this).attr("data-attr") == att) {
          // console.log(ele)
          if ($(window.window <= 450)) {
            $("#faqMore").addClass("d-none");
            $("#lessMore").addClass("d-none");
            $(".active").removeClass("active");
            $(this).children().addClass("active");
            $(".gaj-cc-faq-filter").scrollLeft(0);
            scrollLen = $(this).offset();
            $(".gaj-cc-faq-filter").scrollLeft(scrollLen.left - 20);
            var filterAttrs = $(this).attr("data-attr");
            $(".faq-wrap").each(function () {
              var ariaLabel = $(this).attr("aria-label");
              if (ariaLabel.includes(filterAttrs)) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }
          // else{
          if (att == "cb" || att == "stat") {
            $("#faqMore").addClass("d-none");
            $("#lessMore").addClass("d-none");
            $(".active").removeClass("active");
            $(".gaj-cc-faq-filter").scrollLeft(0);
            $(this).children().addClass("active");
            scrollLen = $(this).offset();
            $(".gaj-cc-faq-filter").scrollLeft(scrollLen.left - 20);
            var filterAttrs = $(this).attr("data-attr");
            $(".faq-wrap").each(function () {
              var ariaLabel = $(this).attr("aria-label");
              if (ariaLabel.includes(filterAttrs)) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          } else if (att == "rp") {
            $("#faqMore").addClass("d-none");
            $("#lessMore").addClass("d-none");
            $(".active").removeClass("active");
            $(this).children().addClass("active");
            $(".gaj-cc-faq-filter").scrollLeft(0);
            scrollLen = $(this).offset();
            // $('.gaj-cc-faq-filter').scrollLeft(scrollLen.left)
            var filterAttrs = $(this).attr("data-attr");
            $(".faq-wrap").each(function () {
              var ariaLabel = $(this).attr("aria-label");
              if (ariaLabel.includes(filterAttrs)) {
                $(this).show();
              } else {
                $(this).hide();
              }
            });
          }
          // }
        }
      });
    }
  });
}
