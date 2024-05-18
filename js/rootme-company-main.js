
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
  const menubg = document.querySelector('.header');
  const triggerOffset = 530;
  let isHeaderHidden = false;
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

  function handleScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const isScrolledPastTrigger = st > mainVideo.offsetTop + triggerOffset;
    const isMenuActive = menuBar.classList.contains('active');

    if (!isMenuActive) {
      if (!isHeaderHidden && st > lastScrollTop && isScrolledPastTrigger) {
        gsap.to(header, { y: '-100%', duration: 0.8 });
        isHeaderHidden = true;
      } else if (isHeaderHidden && st < lastScrollTop) {
        gsap.to(header, { y: 0, duration: 0.8 });
        isHeaderHidden = false;
      }
    }


    lastScrollTop = st <= 0 ? 0 : st;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  menuToggle.addEventListener('click', function () {
    menuBar.classList.toggle('active');
    menubg.classList.toggle('active');


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
      menubg.classList.remove('active');


      const iconImg = menuToggle.querySelector('img');
      const logo = document.querySelector('.logo img');

      iconImg.src = './images/toggleopen.svg';
      logo.src = './images/logo.png';
    });
  });
  window.addEventListener("resize", ScrollTrigger.update);
});



// main videos

const main = document.querySelector('.main');
const mainVideo = document.querySelector('.main_video');
const mainVideoInner = document.querySelector('.main_video_inner');
const video = document.querySelector('.main_video_object')
const mm = gsap.matchMedia();


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: main,
    start: "top top",
    end: "bottom top",
    scrub: true,
    invalidateOnRefresh: true,

    onUpdate: (self) => {
      gsap.set(mainVideo, {
        clipPath: `inset(0 calc(${1 - self.progress
          } * ((100% - 70rem) / 2))`,

      });
    }
  }
});

  mm.add("(min-width: 1920px)", () => {
      gsap.set(mainVideo, {
        clipPath: `inset(0 calc(${1 - self.progress
          } * ((100% - 70rem) / 2))`,
      })
  });
  mm.add("(min-width: 768px) and (max-width: 1920px)", () => {
    gsap.set(mainVideo, {
      clipPath: `inset(0 calc(${1 - self.progress
        } * ((100% - 70rem) / 2))`,
    })
  });
  mm.add("(min-width: 360px) and (max-width: 768px)", () => {
    gsap.set(mainVideo, {
      clipPath: `inset(0 calc(${1 - self.progress
        } * ((100% - 48rem) / 2))`,
    })
  });
  mm.add("(max-width: 360px)", () => {
    gsap.set(mainVideo, {
      clipPath: `inset(0 calc(${1 - self.progress
        } * ((100% - 26rem) / 2))`,
    })
  });

tl.to(main, {
  scrollTrigger: {
    trigger: mainVideo,
    start: "top top",
    end: () => "+=" + video.clientHeight,
    pin: true,
  }
})



// about
// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: ".about",
//       start: "top top",
//       end: "bottom top",
//       pin: true,
//       scrub: 1,
//       onEnter: () => {
//         gsap.to(".about", {
//           opacity: 1,
//         });
//       },
//       onEnterBack: () => {
//         gsap.to(".work", {
//           y: 30,
//           opacity: 1,
//         });
//       },
//     },
//   })
//   .to(".about_txt1", { opacity: 0 })
//   .to(".about_txt2", { opacity: 1, duration: 2 })
//   .to(".about_txt2", { opacity: 0 })
//   .to(".about_txt3", { opacity: 1, duration: 2 });

const aboutAni = gsap.timeline();
aboutAni.from(".about_container .about_txt1", { autoAlpha: 1, duration: 0 }, "+=1")
  .from(".about_container .about_txt2", { autoAlpha: 0, duration: 0 }, "+=1")
  .from(".about_container .about_txt3", { autoAlpha: 0, duration: 0 }, "+=1")


ScrollTrigger.create({
  animation: aboutAni,
  trigger: ".about_container",
  start: "top top",
  end: "+=1500",
  scrub: true,
  pin: true,
  markers: false,
  anticipatePin: 1
});


window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
})


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
    const translateSetY = translateY < 0 ? 0 : translateY
    const targetH3 = document.querySelector('.work_move_txt h3:nth-child(1)');

    if (window.scrollY >= workSection.offsetTop) {
      gsap.to(workTopTxt, { opacity: 0.1, duration: 0.3 });
      gsap.to(targetH3, { opacity: 0.8, duration: 0.3 });
      gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
    } else {
      gsap.to(workTopTxt, { opacity: 1, duration: 0.3 });
      gsap.to(targetH3, { opacity: 1, duration: 0.3 });
      gsap.to(workTopTxt, { y: translateSetY, duration: 0 });

    }
  }
});


gsap.utils.toArray('.fadein').forEach(elem => {
  ScrollTrigger.create({
    trigger: elem,
    start: 'top 70%',
    toggleClass: 'fade-in',
  });

});


