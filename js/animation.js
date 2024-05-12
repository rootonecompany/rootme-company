// 카드 스크롤 애니메이션
class CardFlipOnScroll {
    constructor(wrapper, story) {
        this.wrapper = wrapper;
        this.story = story;
        this.cards = story.querySelectorAll(".story_card");
        this.length = this.cards.length;

        this.start = 0;
        this.end = 0;
        this.step = 0;
    }
    init() {
        this.start = this.wrapper.offsetTop;
        this.end = this.wrapper.offsetTop + this.wrapper.offsetHeight - innerHeight;
        this.step = (this.end - this.start) / (this.length * 2);
    }
    animate() {
        this.cards.forEach((card, i) => {
            const s = this.start + this.step * i;
            const e = x + this.step * (this.length + 1);

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
const story = document.querySelector(".story");
const storyCardWrap = document.querySelector(".story_card_wrap");
const cardFlipOnScroll = new CardFlipOnScroll(story, storyCardWrap);
cardFlipOnScroll.init();

window.addEventListener("scroll", () => {
    cardFlipOnScroll.animate();
});

window.addEventListener("resize", () => {
    cardFlipOnScroll.init();
});