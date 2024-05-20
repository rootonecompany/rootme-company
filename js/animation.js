// gsap 스크롤 트리거
// const panels = gsap.utils.toArray(".story_card");

// let mm = gsap.matchMedia();

// mm.add("(min-width: 769px)", () => {
//     gsap.to(panels, {
//         xPercent: -65 * (panels.length - 1),
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".story_card_wrap",
//             pin: ".story_card_wrap",
//             start: "center center",
//             end: "bottom bottom",
//             pinSpacing: true,
//             scrub: 3,
//             snap: 1 / (panels.length - 1),
//             snap: {
//                 snapTo: 1 / (panels.length - 1),
//                 delay: 3,
//             },
//             // onEnter onLeave onEnterBack onLeaveBack
//             toggleActions: "restart pause resume pause",
//         },
//         x: 100,
//         duration: 5,
//     });
// });

// 카드 스크롤 test
class CardFlipOnScroll {
    constructor(wrapper, sticky) {
        this.wrapper = wrapper;
        this.sticky = sticky;
        this.cards = sticky.querySelectorAll(".story_card");
        this.length = this.cards.length;

        this.start = 0;
        this.end = 0;
        this.step = 0;
    }
    init() {
        this.start = this.wrapper.offsetTop;
        this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight * 1.2;
        this.step = (this.end - this.start) / this.length;
    }
    animate() {
        this.cards.forEach((card, i) => {
            const s = this.start + this.step * i;
            const e = s + this.step * (this.length + 1);

            if (scrollY <= s) {
                card.style.transform = `
                    perspective(100vw)
                    translateX(100vw)
                `;
            } else if (scrollY > s && scrollY <= e) {
                card.style.transform = `
                    perspective(100vw)
                    translateX(${100 - ((scrollY - s) / (e - s)) * 150}vw)
                `;
            } else if (scrollY > e) {
                // card.style.transform = `
                //     perspective(100vw)
                //     translateX(0vw)
                // `;
            }
        });
    }
}
const mainContent = document.querySelector(".story_card_wrap");
const sticky = document.querySelector(".story_sticky");
const cardFlipOnScroll = new CardFlipOnScroll(mainContent, sticky);
cardFlipOnScroll.init();

window.addEventListener("scroll", () => {
    cardFlipOnScroll.animate();
});
window.addEventListener("resize", () => {
    cardFlipOnScroll.init();
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
