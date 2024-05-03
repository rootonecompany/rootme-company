gsap.registerPlugin(ScrollTrigger);

// scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 700);
});

gsap.ticker.lagSmoothing(0);


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

