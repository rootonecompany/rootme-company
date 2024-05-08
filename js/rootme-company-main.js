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
  duration: 2,
  scrub: 1,
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
  .to(".about_txt1", { opacity: 0 })
  .to(".about_txt2", { opacity: 1, duration: 2 })
  .to(".about_txt2", { opacity: 0 })
  .to(".about_txt3", { opacity: 1, duration: 2 });


// work move text
const workTopTxt = document.querySelector('.work_top_txt');
const workSection = document.querySelector('.work');

gsap.set(workTopTxt, { y: 0 });

ScrollTrigger.create({
  trigger: workSection,
  start: "top top",
  end: "bottom top",
  onUpdate: () => {
    const translateY = window.scrollY - workSection.offsetTop;
    console.log(translateY)
    gsap.to(workTopTxt, { y: translateY, duration: 0 });

    const targetH3 = document.querySelector('.work_move_txt h3:nth-child(1)');
    if (window.scrollY > workSection.offsetTop) {
      gsap.to(workTopTxt, { opacity: 0.1, duration: 0, ease: "power1.inOut" });
      gsap.to(targetH3, { opacity: 0.5, duration: 0, ease: "power1.inOut" });
    } else {
      gsap.to(workTopTxt, { opacity: 1, duration: 0, ease: "power1.inOut" });
      gsap.to(targetH3, { opacity: 1, duration: 0, ease: "power1.inOut" });
    }
  }
});


//header 
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.header_gnb');
  const mainVideo = document.querySelector('.main_video');
  const triggerOffset = 570;

  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  function handleScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const isScrolledPastTrigger = st > mainVideo.offsetTop + triggerOffset;

    header.classList.toggle('hidden', st > lastScrollTop && isScrolledPastTrigger);
    lastScrollTop = st <= 0 ? 0 : st;
  }

  function closeHeader() {
    header.classList.add('hidden');
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  header.addEventListener("click", function (event) {
    closeHeader();
  });
});

