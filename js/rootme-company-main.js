gsap.registerPlugin(ScrollTrigger);

// scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 700);
});

gsap.ticker.lagSmoothing(0);

// 비디오 늘리기
const main_video = gsap.timeline();

main_video.to(".main_video_object", {
  scale: 1,
  width: "100vw",
  height: "100vh",
});

ScrollTrigger.create({
  animation: main_video,
  trigger: ".main_video",
  start: "top top",
  end: "bottom top",
  scrub: true,
  pin: true,
  markers: false,
  anticipatePin: 1,
});


// about
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top top",
      end: "bottom top",
      pin: true,
      scrub: 1,
      onEnter: () => {
        gsap.to(".about", {
          opacity: 1,
        });
      },
      onEnterBack: () => {
        gsap.to(".work", {
          y: 30,
          opacity: 1,
        });
      },
    },
  })
  .from(".about_txt1", { opacity: 1, y: 0 })
  .to(".about_txt1", { opacity: 0, y: -50, duration: 2, onComplete: showListBox02 })
  .to(".about_txt2", { opacity: 1, y: 0, duration: 2 })
  .to(".about_txt2", { opacity: 0, y: -50, duration: 2, onComplete: showListBox03 })
  .to(".about_txt3", { opacity: 1, y: 0, duration: 2 });

function showListBox02() {
  gsap.to(".about_txt2", { opacity: 1, y: 0 });
}
function showListBox03() {
  gsap.to(".about_txt3", { opacity: 1, y: 0 });
}


//header_gnb
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.header_gnb');
  const mainVideo = document.querySelector('.main_video');
  let lastScrollTop = 0;
  const triggerOffset = 570;

  window.addEventListener("scroll", function () {
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop && st > mainVideo.offsetTop + triggerOffset) {

      if (!header.classList.contains('hidden')) {
        header.classList.add('hidden');
      }
    } else {
      if (header.classList.contains('hidden')) {
        header.classList.remove('hidden');
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, false);
});
