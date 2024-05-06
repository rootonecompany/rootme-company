// 페이지 새로고침 시 맨 위로 이동
function scrollToTop() {
  window.scrollTo(0, 0);
}
window.onbeforeunload = scrollToTop;

//GSAP
gsap.registerPlugin(ScrollTrigger);


// scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 700);
});

gsap.ticker.lagSmoothing(0);

// main video
const main_video = gsap.timeline();

main_video.to(".main_video_object", {
  scale: 1,
  width: "100vw",
  duration: 4,
});

ScrollTrigger.create({
  animation: main_video,
  trigger: ".main_video",
  start: "top top",
  end: "bottom top",
  scrub: true,
  pin: true,
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
  const triggerOffset = 570;

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  function handleScroll() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop && st > mainVideo.offsetTop + triggerOffset) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollTop = st <= 0 ? 0 : st;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});



//work move text
const workTopTxt = document.querySelector('.work_top_txt');
const workSection = document.querySelector('.work');
let isScrolling = false;

function handleScroll() {
  if (!isScrolling) {
    isScrolling = true;
    requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const sectionOffsetTop = workSection.offsetTop;

      if (scrollTop > sectionOffsetTop) {
        const translateY = scrollTop - sectionOffsetTop;
        workTopTxt.style.transform = `translateY(${translateY}px)`;
        workTopTxt.style.color = 'gray';
      } else {
        workTopTxt.style.transform = 'translateY(0)';
        workTopTxt.style.color = 'black';
      }

      isScrolling = false;
    });
  }
}

window.addEventListener('scroll', handleScroll);
