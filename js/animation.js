// gsap 스크롤 트리거
// const sections = gsap.utils.toArray(".story_card");

// gsap.to(sections, {
//     xPercent: -65 * (sections.length - 1),
//     ease: "none",
//     scrollTrigger: {
//         trigger: ".story_card_wrap",
//         pin: true,
//         start: "center center",
//         // end: "bottom top",
//         end: () => "+=" + document.querySelector(".story_card_wrap").offsetHeight,
//         pinSpacing: true,
//         scrub: 3,
//         snap: 1 / (sections.length - 1),
//     },
//     // x: -100,
//     duration: 5,
// });

// 드롭다운 메뉴
function dropdownFunction() {
    document.getElementById("myDropdownContent").classList.toggle("show");
}
