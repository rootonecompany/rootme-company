// GSAP 스크롤 트리거 (카드 애니메이션)
const storyCardWrap = document.querySelector(".story_card_wrap");
const storySticky = document.querySelector(".story_sticky");
const storyCardFrame = document.querySelector(".story_card_frame");
const storyCard = document.querySelectorAll(".story_card");

gsap.registerPlugin(ScrollTrigger);

let cardAnimationTrigger;

const updateAnimation = () => {
    let storyCardFrameWidth = storyCardFrame.scrollWidth;
    let storyStickyPadding = Number(
        window.getComputedStyle(storySticky).paddingLeft.split("px")[0]
    );
    let xPercentValue = -(
        storyCardFrameWidth +
        storyStickyPadding * 2 -
        document.documentElement.clientWidth
    );

    if (cardAnimationTrigger) {
        cardAnimationTrigger.scrollTrigger.kill();
    }

    cardAnimationTrigger = gsap.to(storyCardFrame, {
        x: xPercentValue,
        ease: "none",
        scrollTrigger: {
            trigger: storyCardWrap,
            start: "top top",
            end: () => "+=" + storyCardFrame.offsetWidth,
            pin: true,
            pinSpacing: true,
            scrub: true,
            markers: false,
        },
    });

    ScrollTrigger.refresh();
};

updateAnimation();

window.addEventListener("resize", () => {
    updateAnimation();
});

// 드롭다운 메뉴
const myDropDownBtn = document.getElementById("footer_dropdown_btn");
const myDropdownContent = document.getElementById("myDropdownContent");
const arrowImg = myDropDownBtn.querySelector("img");

window.addEventListener("click", () => {
    myDropdownContent.classList.remove("show");
    arrowImg.style.transform = "rotate(0deg)";
});

myDropDownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = myDropdownContent.classList.toggle("show");
    if (isVisible) {
        arrowImg.style.transform = "rotate(-180deg)";
    } else {
        arrowImg.style.transform = "rotate(0deg)";
    }
});

// card animation error test
// let ticking = false;
// const isMobile = () => window.matchMedia("(max-width: 1200px)").matches;
// ScrollTrigger.normalizeScroll({ allowNestedScroll: true });

gsap.utils.toArray(".StorySlide").forEach((card, index) => {
    gsap.set(card, { opacity: 0, y: 100 });

    ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        end: "bottom 20%",
        ease: "none",
        onEnter: () => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                }
            );
        },
    });
});

ScrollTrigger.create({
    trigger: ".story_scroll_icon",
    start: "top 65%",
    end: "bottom 10%",
    ease: "none",
    onEnter: () => {
        gsap.fromTo(".story_scroll_icon", { opacity: 0 }, { opacity: 1, delay: 0.2 });
    },
});

ScrollTrigger.create({
    trigger: ".brand",
    start: "top 140%",
    onEnter: () =>
        gsap.utils.toArray(".BrandSlide").forEach((elem) => elem.classList.add("SlideUp")),
    once: true,
});

ScrollTrigger.create({
    trigger: ".contact",
    start: "top 15%",
    onEnter: () =>
        gsap.utils.toArray(".ContactSlide").forEach((elem) => elem.classList.add("SlideUp")),
    once: true,
});

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
