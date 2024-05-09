// drop up
document.addEventListener("DOMContentLoaded", function () {
    var famsiteBtn = document.getElementById("famsite_btn");
    var famsiteMenu = document.querySelector(".famsite_menubar");
    var arrowImg = famsiteBtn.querySelector("img");

    famsiteBtn.addEventListener("click", function () {
        var maxHeight = famsiteMenu.style.maxHeight;

        if (maxHeight === "0px") {
            famsiteMenu.style.maxHeight = "140px";
            famsiteMenu.style.border = "1px solid #cfcfcf";
            arrowImg.style.transform = "rotate(-180deg)";
        } else {
            famsiteMenu.style.maxHeight = "0px";
            famsiteMenu.style.border = "1px solid transparent";
            arrowImg.style.transform = "";
        }
    });
});

// box 애니메이션
// let lastScrollTop = 0;

// window.addEventListener(
//     "scroll",
//     function () {
//         let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
//         if (currentScroll > lastScrollTop) {
//             document.querySelector(".box_wrap").classList.remove("reverse");
//         } else {
//             document.querySelector(".box_wrap").classList.add("reverse");
//         }
//         lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
//     },
//     false
// );

// box 애니메이션 수정 중
window.addEventListener('scroll', () => {
  sliding();
});
const slideContainer = document.querySelector('.story')// 전체 또는 story (?)
const stickyBox = document.querySelector('.story1');
const boxWrap = document.querySelector('.box_wrap');
const boxs = document.querySelectorAll('.box')
const boxLength = boxs.length;

const containerHeight = slideContainer.offsetHeight - stickyBox.offsetHeight;

function sliding() {
  const ratio = scrollY / (containerHeight / 2);
  if (ratio < 1) {
    boxWrap.style.transform = `translateX(${100 - ratio * 100}vw)`;
  } else {
    boxWrap.style.transform = `translateX(0vw)`;
  }
}
