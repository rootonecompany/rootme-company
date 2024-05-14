// gsap 스크롤 트리거
gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray(".story_card");

gsap.to(sections, {
    xPercent: -100 * sections.length,
    ease: "none",
    scrollTrigger: {
        trigger: ".story_card_wrap",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        scrub: 3,
        snap: 1 / (sections.length - 1),
    },
    x: 500,
});

// 드롭다운 메뉴
function dropdownFunction() {
    document.getElementById("myDropdownContent").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches(".footer_dropdown_btn")) {
        var dropdowns = document.getElementsByClassName("footer_dropdown_content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};
