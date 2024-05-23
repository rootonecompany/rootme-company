// GSAP 스크롤 트리거 (카드 애니메이션)
const storyCardWrap = document.querySelector(".story_card_wrap");
const storyCard = document.querySelectorAll(".story_card");

gsap.registerPlugin(ScrollTrigger);

gsap.to(storyCard, {
    xPercent: -100 * (storyCard.length - 1.5),
    x: () => -100 * (storyCard.length - 0.5),
    ease: "none",
    scrollTrigger: {
        trigger: storyCardWrap,
        start: "center 50%",
        end: () => "+=" + storyCardWrap.offsetWidth * 2,
        pin: true,
        pinSpacing: true,
        scrub: true,
    },
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
// gsap.registerPlugin(ScrollTrigger);

// const logoElements = gsap.utils.toArray(
//     ".story_txt_container, .story_story_txt, .brand_content_wrap, .contact_title_txt"
// );

// logoElements.forEach((element) => {
//     gsap.fromTo(
//         element,
//         { y: 100, opacity: 0 },
//         {
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power1.out",
//             scrollTrigger: {
//                 trigger: element,
//                 start: "top 70%",
//                 end: "bottom top",
//                 toggleActions: "play none none reverse",
//             },
//         }
//     );
// });
