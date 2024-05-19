// gsap 스크롤 트리거
const panels = gsap.utils.toArray(".story_card");

gsap.to(panels, {
    xPercent: -65 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".story_card_wrap",
        pin: ".story_card_wrap",
        start: "center center",
        end: "bottom bottom",
        pinSpacing: true,
        scrub: 2,
        snap: 1 / (panels.length - 1),
        toggleActions: "restart pause resume pause",
    },
    x: 100,
    duration: 5,
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

// brand logo (test)
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    ".brand_logo_inner",
    { y: 100, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".brand_logo_container",
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none reverse",
        },
    }
);

// 브랜드 로고 애니메이션 test
// gsap.registerPlugin(ScrollTrigger);

// gsap.utils.toArray(".brand_logo_row").forEach((row, i) => {
//     gsap.fromTo(
//         row.children,
//         { y: 100, opacity: 0 },
//         {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power1.out",
//             stagger: 0.3,
//             scrollTrigger: {
//                 trigger: row,
//                 start: "top 80%",
//                 end: "bottom top",
//                 markers: true,
//                 toggleActions: "play none none reverse",
//                 delay: i * 0.5,
//             },
//         }
//     );
// });
