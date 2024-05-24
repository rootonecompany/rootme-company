// GSAP 스크롤 트리거(카드 애니메이션)
const storyCardWrap = document.querySelector(".story_card_wrap");
const storyCard = document.querySelectorAll(".story_card");

gsap.registerPlugin(ScrollTrigger);

gsap.to(storyCard, {
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
});

//임시 테스트
// const storyCardWrap = document.querySelector(".story_card_wrap");
// const storyCard = document.querySelectorAll(".story_card");

// // story_sticky 클래스가 적용된 요소의 왼쪽 패딩 값을 가져오는 함수
// function getStickyPaddingLeft() {
//     const stickyElement = document.querySelector(".story_sticky");
//     const styles = window.getComputedStyle(stickyElement);
//     return parseFloat(styles.paddingLeft);
// }

// gsap.to(storyCard, {
//     x: () => -getStickyPaddingLeft(),
//     ease: "none",
//     scrollTrigger: {
//         trigger: storyCardWrap,
//         start: "top top",
//         end: () => `+=${storyCardWrap.offsetWidth - window.innerWidth + getStickyPaddingLeft()}`,
//         pin: true,
//         pinSpacing: true,
//         scrub: true,
//         // markers: true
//     },
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
