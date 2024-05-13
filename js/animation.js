(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
})();

// 카드 스크롤 애니메이션
class CardFlipOnScroll {
    constructor(storyCardWrap, sticky) {
        this.storyCardWrap = storyCardWrap;
        this.sticky = sticky;
        this.cards = storyCardWrap.querySelectorAll(".story_card");
        this.length = this.cards.length;

        this.start = 0;
        this.end = 0;
        this.step = 0;
    }

    init() {
        this.start = this.storyCardWrap.offsetTop;
        this.end = this.storyCardWrap.offsetTop + this.storyCardWrap.offsetHeight - innerHeight;
        this.step = (this.end - this.start) / (this.length * 2);
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
            } else if (scrollY > s && scrollY <= e - this.step) {
                card.style.transform = `
                  perspective(100vw)
                  translateX(${100 + ((scrollY - s) / (e - s)) * -100}vw)
              `;
            } else if (scrollY > e - this.step && scrollY <= e) {
                card.style.transform = `
                  perspective(100vw)
                  translateX(${100 + ((scrollY - s) / (e - s)) * -100}vw)
              `;
            } else if (scrollY > e) {
                card.style.transform = `
                perspective(100vw)
                translateX(0vw)
              `;
            }
        });
    }
}

const storyCardWrap = document.querySelector(".story_card_wrap");
const sticky = document.querySelector(".sticky");
const cardFlipOnScroll = new CardFlipOnScroll(storyCardWrap, sticky);
cardFlipOnScroll.init();

window.addEventListener("scroll", () => {
    cardFlipOnScroll.animate();
});

window.addEventListener("resize", () => {
    cardFlipOnScroll.init();
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
