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
  .from(".about_txt1", { opacity: 1, y: 0 })
  .to(".about_txt1", { opacity: 0, y: -50 })
  .to(".about_txt2", { opacity: 1, y: 0, })
  .to(".about_txt2", { opacity: 0, y: -50 })
  .to(".about_txt3", { opacity: 1, y: 0, });


// work move text
const workTopTxt = document.querySelector('.work_top_txt');
const workSection = document.querySelector('.work');

gsap.set(workTopTxt, { y: 0 });

ScrollTrigger.create({
  trigger: workSection,
  start: "top top",
  end: "bottom top",
  onUpdate: (self) => {
    const translateY = self.progress * (workSection.offsetHeight - window.innerHeight);
    gsap.to(workTopTxt, { y: translateY });

    const targetH3 = document.querySelector('.work_move_txt h3:nth-child(1)');

    if (self.direction === 1) {
      gsap.to(workTopTxt, { color: 'var(--color-gray02)' });
      gsap.to(targetH3, { webkitTextStroke: '1px var(--color-gray02)' });
    } else {
      gsap.to(workTopTxt, { color: 'var(--color-black)s' });
      gsap.to(targetH3, { webkitTextStroke: '1px var(--color-black)' });
    }
  }
});


// const workTopTxt = document.querySelector('.work_top_txt');
// const workSection = document.querySelector('.work');
// let isScrolling = false;

// function handleScroll() {
//   if (!isScrolling) {
//     isScrolling = true;
//     requestAnimationFrame(() => {
//       const scrollTop = window.scrollY;
//       const sectionOffsetTop = workSection.offsetTop;
//       const targetH3 = document.querySelector('.work_move_txt h3:nth-child(1)');

//       if (scrollTop > (sectionOffsetTop)) {
//         const translateY = scrollTop - sectionOffsetTop;
//         workTopTxt.style.transform = `translateY(${translateY}px)`;

//         workTopTxt.style.transition = 'color 0.3s ease';
//         workTopTxt.style.color = 'var(--color-gray02)';

//         targetH3.style.transition = 'color 0.3s ease';
//         targetH3.style.webkitTextStroke = '1px var(--color-gray02)';
//       } else {
//         workTopTxt.style.transform = 'translateY(0)';

//         workTopTxt.style.transition = 'none';
//         workTopTxt.style.color = 'var(--color-black)';

//         targetH3.style.transition = 'none';
//         targetH3.style.webkitTextStroke = '1px var(--color-black)';
//       }

//       isScrolling = false;
//     });
//   }
// }

// window.addEventListener('scroll', handleScroll);






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

window.addEventListener('scroll', handleScroll);
