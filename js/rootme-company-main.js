// 페이지 새로고침 시 맨 위로 이동
// function scrollToTop() {
//   window.scrollTo(0, 0);
// }
// window.onbeforeunload = scrollToTop;

//GSAP
gsap.registerPlugin(ScrollTrigger);


// scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 700);
});

gsap.ticker.lagSmoothing(0);


//header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.header_gnb');
  const mainVideo = document.querySelector('.main_video');
  const menuBar = document.querySelector('.menubar');
  const menuToggle = document.querySelector('.menu-toggle');
  const triggerOffset = 550;
  let isHeaderHidden = false;
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  function handleScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const isScrolledPastTrigger = st > mainVideo.offsetTop + triggerOffset;
    const isMenuActive = menuBar.classList.contains('active');

    if (!isMenuActive) {
      if (!isHeaderHidden && st > lastScrollTop && isScrolledPastTrigger) {
        gsap.to(header, { opacity: 0, duration: 0.3 });
        isHeaderHidden = true;
      } else if (isHeaderHidden && st < lastScrollTop) {
        gsap.to(header, { opacity: 1, duration: 0.3 });
        isHeaderHidden = false;
      }
    }

    lastScrollTop = st <= 0 ? 0 : st;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  menuToggle.addEventListener('click', function () {
    menuBar.classList.toggle('active');
    header.classList.toggle('active');

    const iconImg = menuToggle.querySelector('img');
    const logo = document.querySelector('.logo img');

    if (iconImg.src.includes('toggleopen.svg')) {
      iconImg.src = './images/toggleclose.svg';
      logo.src = './images/logoclose.png';
    } else {
      iconImg.src = './images/toggleopen.svg';
      logo.src = './images/logo.png';
    }
  });

  const menuItems = document.querySelectorAll('.header_menu li');
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      menuBar.classList.remove('active');
      header.classList.remove('active');

      const iconImg = menuToggle.querySelector('img');
      const logo = document.querySelector('.logo img');

      iconImg.src = './images/toggleopen.svg';
      logo.src = './images/logo.png';
    });
  });
});





// main video
const main_video = gsap.timeline();

main_video.to(".main_video_object", {
  scale: 1,
  width: "100vw",
  height: "100vh",
  duration: 1.5,
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
  end: "bottom bottom",
  scrub: 1,
  onUpdate: () => {

    const translateY = window.scrollY - workSection.offsetTop;
    // const centerPosition = (window.innerHeight - workTopTxt.offsetHeight) / 2;
    const translateSetY = translateY < 0 ? 0 : translateY
    const targetH3 = document.querySelector('.work_move_txt h3:nth-child(1)');

    if (window.scrollY > workSection.offsetTop) {
      gsap.to(workTopTxt, { opacity: 0.1, duration: 0.3 });
      gsap.to(targetH3, { opacity: 0.8, duration: 0.3 });
      // gsap.to(workTopTxt, { y: centerPosition, duration: 0 });
      gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
    } else {
      gsap.to(workTopTxt, { opacity: 1, duration: 0.3 });
      gsap.to(targetH3, { opacity: 1, duration: 0.3 });
      gsap.to(workTopTxt, { y: translateSetY, duration: 0 });

    }
  }
});


