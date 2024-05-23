// GSAP 스크롤 트리거 (카드 애니메이션)
const cardWrap = document.querySelector(".story_card_wrap");
const cardFrame = document.querySelector(".story_card_frame");
const panels = gsap.utils.toArray(".story_card");

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {
    gsap.to(cardFrame, {
        xPercent: -15 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: cardWrap,
            pin: cardWrap,
            start: "center 50%",
            end: "bottom 10%",
            pinSpacing: true,
            scrub: true,
            snap: {
                snapTo: 1 / (panels.length - 1),
            },
        },
    });
});

mm.add("(max-width: 768px)", () => {
    gsap.to(cardFrame, {
        xPercent: -17 * panels.length,
        ease: "none",
        scrollTrigger: {
            trigger: cardWrap,
            pin: cardWrap,
            start: "center 50%",
            end: "bottom 10%",
            pinSpacing: true,
            scrub: true,
            snap: {
                snapTo: 1 / (panels.length - 1),
            },
        },
    });
});

mm.add("(max-width: 360px)", () => {
    gsap.to(panels, {
        xPercent: -25 * panels.length,
        ease: "none",
        scrollTrigger: {
            trigger: cardFrame,
            pin: cardFrame,
            start: "center center",
            end: "bottom bottom",
            pinSpacing: true,
            scrub: true,
            snap: {
                snapTo: 1 / panels.length,
            },
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

// text scroll up 애니메이션
// gsap.utils.toArray("txtup").forEach((elem) => {
//     ScrollTrigger.create({
//         trigger: elem,
//         start: "top 70%",
//         toggleClass: "txt-up",
//     });
// });

// 텍스트 스크롤 업 (test)
gsap.registerPlugin(ScrollTrigger);

const logoElements = gsap.utils.toArray(
    ".story_txt_container, .story_story_txt, .brand_content_wrap, .contact_title_txt"
);

logoElements.forEach((element) => {
    gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power1.out",
            scrollTrigger: {
                trigger: element,
                start: "top 70%",
                end: "bottom top",
                toggleActions: "play none none reverse",
            },
        }
    );
});
