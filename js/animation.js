// gsap 스크롤 트리거
const cardWrap = document.querySelector(".story_card_wrap");
const panels = gsap.utils.toArray(".story_card");
const cardFrame = document.querySelector(".story_card_frame");

// let mm = gsap.matchMedia();

// mm.add("(min-width: 769px)", () => {
gsap.to(cardFrame, {
    xPercent: -15 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: cardWrap,
        pin: cardWrap,
        // start: "center center",
        start: "center 50%",
        // end: "bottom bottom",
        end: "bottom 10%",
        pinSpacing: true,
        scrub: 1.5,
        // markers: true,
        snap: {
            snapTo: 1 / (panels.length - 1),
            delay: 3,
        },
    },
});
// });

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

// 로고 애니메이션 (test)
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
            toggleActions: "play none none reverse",
        },
    }
);

// 카드 애니메이션 (JS)
