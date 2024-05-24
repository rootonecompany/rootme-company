// GSAP 스크롤 트리거(카드 애니메이션)
// const storyCardWrap = document.querySelector(".story_card_wrap");
// const storyCard = document.querySelectorAll(".story_card");

// gsap.registerPlugin(ScrollTrigger);

// gsap.to(storyCard, {
//     xPercent: -100 * (storyCard.length - 1.5),
//     x: () => -100 * (storyCard.length - 0.5),
//     ease: "none",
//     scrollTrigger: {
//         trigger: storyCardWrap,
//         // start: "center 50%",
//         start: "top top",
//         end: () => "+=" + storyCardWrap.offsetWidth * 2,
//         pin: true,
//         pinSpacing: true,
//         scrub: true,
//         // markers: true
//     },
// });
document.addEventListener("DOMContentLoaded", function () {
    const storyCardWrap = document.querySelector(".story_card_wrap");
    const storyCardFrame = document.querySelector(".story_card_frame");
    const storyCard = document.querySelectorAll(".story_card");

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(storyCardFrame, {
        // x: () => -(storyCardFrame.scrollWidth - window.innerWidth),
        // ease: "none",
        // scrollTrigger: {
        //     trigger: storyCardWrap,
        //     start: "top top",
        //     end: () => `+=${storyCardFrame.scrollWidth - window.innerWidth}`,
        //     pin: true,
        //     pinSpacing: true,
        //     scrub: true,
        // },
        xPercent: -100 * (storyCard.length - 1.5),
        x: () => -100 * (storyCard.length - 0.5),
        ease: "none",
        scrollTrigger: {
            trigger: storyCardWrap,
            // start: "center 50%",
            start: "top top",
            end: () => "+=" + storyCardWrap.offsetWidth * 2,
            pin: true,
            pinSpacing: true,
            scrub: true,
            // markers: true
        },
        onComplete: function () {
            //story story
            ScrollTrigger.create({
                trigger: ".story_story_wrap",
                start: "top 50%",
                onEnter: () => gsap.utils.toArray(".SrotySlide").forEach((elem) => elem.classList.add("SlideUp")),
                once: true
            });

            // brand
            ScrollTrigger.create({
                trigger: ".brand",
                start: "top 70%",
                onEnter: () => gsap.utils.toArray(".BrandSlide").forEach((elem) => elem.classList.add("SlideUp")),
                once: true
            });

            //contact
            ScrollTrigger.create({
                trigger: ".contact",
                start: "top 5%",
                onEnter: () => gsap.utils.toArray(".ContactSlide").forEach((elem) => elem.classList.add("SlideUp")),
                once: true
            });
        }
    });
});





// 드롭다운 메뉴
const myDropDownBtn = document.getElementById("footer_dropdown_btn");
const myDropdownContent = document.getElementById("myDropdownContent");

window.addEventListener("click", () => {
    myDropdownContent.classList.remove("show");
});

myDropDownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    myDropdownContent.classList.toggle("show");
});

// brand logo 애니메이션
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    ".brand_logo_inner",
    { y: 100, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".brand_logo_container",
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
        },
    }
);
