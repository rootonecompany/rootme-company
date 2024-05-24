// GSAP 스크롤 트리거(카드 애니메이션)

document.addEventListener("DOMContentLoaded", function () {
    const storyCardWrap = document.querySelector(".story_card_wrap");
    const storyCardFrame = document.querySelector(".story_card_frame");
    const storyCard = document.querySelectorAll(".story_card");

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(storyCardFrame, {
        xPercent: -20 * (storyCard.length - 1),
        x: () => -100 * (storyCard.length - 0.2),
        ease: "none",
        scrollTrigger: {
            trigger: storyCardWrap,
            start: "top top",
            end: () => "+=" + storyCardFrame.offsetWidth * 2,
            pin: true,
            pinSpacing: true,
            scrub: true,
            // markers: true
        },
        onComplete: function () {
            //story story
            ScrollTrigger.create({
                trigger: ".story_story_wrap",
                start: "top 60%",
                onEnter: () =>
                    gsap.utils
                        .toArray(".SrotySlide")
                        .forEach((elem) => elem.classList.add("SlideUp")),
                once: true,
            });

            // brand
            ScrollTrigger.create({
                trigger: ".brand",
                start: "top 80%",
                onEnter: () =>
                    gsap.utils
                        .toArray(".BrandSlide")
                        .forEach((elem) => elem.classList.add("SlideUp")),
                once: true,
            });

            //contact
            ScrollTrigger.create({
                trigger: ".contact",
                start: "top 15%",
                onEnter: () =>
                    gsap.utils
                        .toArray(".ContactSlide")
                        .forEach((elem) => elem.classList.add("SlideUp")),
                once: true,
            });

            // brand logo 애니메이션
            gsap.fromTo(
                ".brand_logo_inner",
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ".brand_logo_container",
                        start: "top 80%",
                        end: "bottom top",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.fromTo(
                ".story_scroll_down",
                { opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: ".story_story_wrap",
                        start: "top 70%",
                    },
                }
            );
        },
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
