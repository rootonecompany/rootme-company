//GSAP
gsap.registerPlugin(ScrollTrigger);

// scroll
const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 700);
});

gsap.ticker.lagSmoothing(0);

//header
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header_gnb");
    const mainVideo = document.querySelector(".main_video");
    const menuBar = document.querySelector(".menubar");
    const menuToggle = document.querySelector(".menu-toggle");
    const menuToggleImg = document.querySelector(".menu-toggle img");
    const menubg = document.querySelector(".header");
    const logoImg = document.querySelector('.logo img');
    const triggerOffset = 530;
    const storyCardWrap = document.querySelector(".story_card_wrap");

    const brandSection = document.querySelector("#inner_wrap");
    let isHeaderHidden = false;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

    function handleScroll() {
        const st = window.scrollY || document.documentElement.scrollTop;
        const isScrolledPastTrigger = st > mainVideo.offsetTop + triggerOffset;
        const isMenuActive = menuBar.classList.contains("active");

        console.dir(video)
        // 스크롤 이동에 따른 헤더 나타남
        if (!isMenuActive) {
            if (!isHeaderHidden && st > lastScrollTop && isScrolledPastTrigger) {
                gsap.to(header, { y: "-100%", duration: 0.8 });
                isHeaderHidden = true;
            } else if (isHeaderHidden && st < lastScrollTop) {
                gsap.to(header, { y: 0, duration: 0.8 });
                isHeaderHidden = false;
            }
        }
        // st >= storyCardWrap.offsetTop && st <= brandSection.offsetTop
        //해상도가 768px보다 커지면 header logo.img가 close.png로 변경됨
        if (window.innerWidth <= 768 && isMenuActive) {
            logoImg.src = "./images/logoclose.png";
            //스크롤이 story 안에 있을경우 header에 .darkMode class가 붙어서 스타일이 바뀜
            // + 위치에 따라 header 내부 img src 값이 바뀜
        } else if (st >= storyCardWrap.getBoundingClientRect().top + window.scrollY && st < brandSection.offsetTop) {
            const menuItems = document.querySelectorAll('.header_menu li');
            menuItems.forEach(function (item) {
                item.classList.add('darkMode');
            });
            menuToggleImg.src = "./images/togglewhite.svg";
            logoImg.src = "./images/logoclose.png";
        } else {
            const menuItems = document.querySelectorAll('.header_menu li');
            menuItems.forEach(function (item) {
                item.classList.remove('darkMode');
            });
            logoImg.src = "./images/logo.png";
            menuToggleImg.src = "./images/toggleopen.svg";
        }

        lastScrollTop = st <= 0 ? 0 : st;
    }

    // 헤더가 768px 이상이 될 때 
    function updateMenuDisplay() {
        menuBar.classList.remove("active");
        menubg.classList.remove("active");

        const iconImg = menuToggle.querySelector("img");
        iconImg.src = "./images/toggleopen.svg";
        logoImg.src = "./images/logo.png";
        lenis.start()
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            updateMenuDisplay();
        }
        ScrollTrigger.update();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    //토글 이미지 클릭 시 active 값을 통해 스타일 조절
    menuToggle.addEventListener("click", function () {
        menuBar.classList.toggle("active");
        menubg.classList.toggle("active");

        const iconImg = menuToggle.querySelector("img");

        if (menuBar.classList.contains("active")) {
            iconImg.src = "./images/toggleclose.svg";
            logoImg.src = "./images/logoclose.png";
            lenis.stop()
        } else {
            iconImg.src = "./images/toggleopen.svg";
            logoImg.src = "./images/logo.png";
            lenis.start()
            if (window.innerWidth > 768) {
                logoImg.src = "./images/logo.png";
            }
            updateLogoBasedOnScroll();
        }
    });

    // story 구간에서 토글 열고 닫을때 전환 코드
    function updateLogoBasedOnScroll() {
        const st = window.scrollY || document.documentElement.scrollTop;
        const isMenuActive = menuBar.classList.contains("active");

        if (window.innerWidth <= 768 && isMenuActive) {
            logoImg.src = "./images/logoclose.png";
        } else if (st >= storyCardWrap.getBoundingClientRect().top + window.scrollY && st <= brandSection.offsetTop) {
            const menuItems = document.querySelectorAll('.header_menu li');
            menuItems.forEach(function (item) {
                item.classList.add('darkMode');
            });
            menuToggleImg.src = "./images/togglewhite.svg";
            logoImg.src = "./images/logoclose.png";
        } else {
            const menuItems = document.querySelectorAll('.header_menu li');
            menuItems.forEach(function (item) {
                item.classList.remove('darkMode');
            });
            logoImg.src = "./images/logo.png";
            menuToggleImg.src = "./images/toggleopen.svg";
        }
    }

    //이중 클릭 안되게
    const menuItems = document.querySelectorAll(".header_menu li");
    menuItems.forEach(function (item) {
        item.addEventListener("click", updateMenuDisplay);
    });

    document.querySelectorAll('.header_menu a').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});


// main videos
const main = document.querySelector(".main");
const mainVideo = document.querySelector(".main_video");
const video = document.querySelector(".main_video_object");

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1920) {
        gsap.set(mainVideo, { clipPath: "inset(0 calc(1 * ((100% - 68rem) / 2)) round 2rem)", })
    } else if (window.innerWidth >= 768) {
        gsap.set(mainVideo, { clipPath: "inset(0 calc(1 * ((100% - 68rem) / 2)) round 2rem)", })
    } else if (window.innerWidth >= 550) {
        gsap.set(mainVideo, { clipPath: "inset(0 calc(1 * ((100% - 48rem) / 2)) round 2rem)", })
    } else if (window.innerWidth >= 360) {
        gsap.set(mainVideo, { clipPath: "inset(0 calc(1 * ((100% - 34rem) / 2)) round 2rem)", })
    } else {
        gsap.set(mainVideo, { clipPath: "inset(0 calc(1 * ((100% - 26rem) / 2)) round 2rem)", })
    }

    return;
})

// clipPath 설정 함수
const setClipPath = (progress, size) => {
    ScrollTrigger.saveStyles(".main_video");
    const clipPathValue = progress === 1
        ? `inset(0 calc(${1 - progress} * ((100% - ${size}) / 2)))`
        : `inset(0 calc(${1 - progress} * ((100% - ${size}) / 2)) round ${2 - (progress * 2)}rem )`;


    gsap.set(mainVideo, { clipPath: clipPathValue });
};

// ScrollTrigger 설정
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: main,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            // clipPath 설정
            if (window.innerWidth >= 1920) {
                setClipPath(self.progress, "68rem");
            } else if (window.innerWidth >= 768) {
                setClipPath(self.progress, "68rem");
            } else if (window.innerWidth >= 550) {
                setClipPath(self.progress, "48rem");
            } else if (window.innerWidth >= 360) {
                setClipPath(self.progress, "34rem");
            } else {
                setClipPath(self.progress, "26rem");
            }
        },
    },
});

// ScrollTrigger를 사용하여 비디오 고정
tl.to(main, {
    scrollTrigger: {
        trigger: mainVideo,
        start: "top top",
        end: () => "+=" + video.clientHeight,
        pin: true,

    },
});
//main_video 트리거 초기화
const refreshScrollTrigger = () => {
    const mainVideoTrigger = ScrollTrigger.getById("mainVideoTrigger");
    if (mainVideoTrigger) {
        mainVideoTrigger.refresh();
    }
};

window.addEventListener("load", refreshScrollTrigger);
window.addEventListener("resize", refreshScrollTrigger);
window.addEventListener("scroll", refreshScrollTrigger);


// about
const aboutAni = gsap.timeline();
aboutAni
    .from(".about_container .about_txt1", { autoAlpha: 1, duration: 0 }, "+=1")
    .from(".about_container .about_txt2", { autoAlpha: 0, duration: 0 }, 2)
    .from(".about_container .about_txt3", { autoAlpha: 0, duration: 0 }, 6)
    .to({}, { duration: 4 });

ScrollTrigger.create({
    animation: aboutAni,
    trigger: ".about_container",
    start: "top top",
    end: "+=2500",
    scrub: true,
    pin: true,
    markers: false,
    anticipatePin: 1,
});

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});



// work move text

const workTopTxt = document.querySelector(".work_top_txt");
const workSection = document.querySelector(".work");
const thirdProjectWrap = document.querySelectorAll(".project_wrap")[3];

gsap.set(workTopTxt, { y: 0 });

const setEndValue = () => {
    const thirdProjectWrapTop = thirdProjectWrap.offsetTop;
    const thirdProjectWrapHeight = thirdProjectWrap.offsetHeight;
    const endPosition = thirdProjectWrapTop + (thirdProjectWrapHeight / 2);
    return endPosition - window.innerHeight / 2;
};

let scrollTriggerInstance = null;

const createScrollTrigger = () => {
    if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
    }

    scrollTriggerInstance = ScrollTrigger.create({
        trigger: workSection,
        start: "top top",
        end: () => setEndValue() + "px",
        scrub: 1,
        onUpdate: () => {
            const translateY = window.scrollY - workSection.offsetTop;
            const translateSetY = translateY < 0 ? 0 : translateY;
            const targetH3 = document.querySelector(".work_move_txt h3:nth-child(1)");

            if (window.scrollY >= workSection.offsetTop) {
                gsap.to(workTopTxt, { opacity: 0.1, duration: 0.3 });
                gsap.to(targetH3, { opacity: 0.9, duration: 0.3 });
                gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
            } else {
                gsap.to(workTopTxt, { opacity: 1, duration: 0.3 });
                gsap.to(targetH3, { opacity: 1, duration: 0.3 });
                gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
            }
        },
    });
};

createScrollTrigger();

const updateScrollTrigger = () => {
    createScrollTrigger();
    ScrollTrigger.refresh();
}

window.addEventListener('resize', updateScrollTrigger);
window.addEventListener('load', updateScrollTrigger);
updateScrollTrigger();



// scroll up -> section. Work
gsap.utils.toArray(".fadein").forEach((elem) => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 95%",
        toggleClass: "fade-in",
    });
});

// about
ScrollTrigger.create({
    trigger: ".about",
    start: "top 50%",
    onEnter: () => gsap.utils.toArray(".Slide").forEach((elem) => elem.classList.add("SlideUp")),
    onLeave: () => gsap.utils.toArray(".Slide").forEach((elem) => elem.classList.remove("SlideUp")),
    onEnterBack: () => gsap.utils.toArray(".Slide").forEach((elem) => elem.classList.add("SlideUp")),
    onLeaveBack: () => gsap.utils.toArray(".Slide").forEach((elem) => elem.classList.remove("SlideUp"))
});
ScrollTrigger.create({
    trigger: ".about",
    start: "top -450",
    onEnter: () => gsap.utils.toArray(".Slide2").forEach((elem) => elem.classList.add("SlideUp")),
    onLeave: () => gsap.utils.toArray(".Slide2").forEach((elem) => elem.classList.remove("SlideUp")),
    onEnterBack: () => gsap.utils.toArray(".Slide2").forEach((elem) => elem.classList.add("SlideUp")),
    onLeaveBack: () => gsap.utils.toArray(".Slide2").forEach((elem) => elem.classList.remove("SlideUp")),
});
ScrollTrigger.create({
    trigger: ".about",
    start: "top -1500",
    onEnter: () => gsap.utils.toArray(".Slide3").forEach((elem) => elem.classList.add("SlideUp")),
    onLeave: () => gsap.utils.toArray(".Slide3").forEach((elem) => elem.classList.remove("SlideUp")),
    onEnterBack: () => gsap.utils.toArray(".Slide3").forEach((elem) => elem.classList.add("SlideUp")),
    onLeaveBack: () => gsap.utils.toArray(".Slide3").forEach((elem) => elem.classList.remove("SlideUp")),
});

// story card
ScrollTrigger.create({
    trigger: ".story_card_wrap",
    start: "top 170%",
    onEnter: () => gsap.utils.toArray(".StoryCardSlide").forEach((elem) => elem.classList.add("SlideUp")),
    // once: true
    toggleActions: "play none none none"
});
