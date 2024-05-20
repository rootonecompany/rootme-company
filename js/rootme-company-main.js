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
    const menubg = document.querySelector(".header");
    const triggerOffset = 530;
    let isHeaderHidden = false;
    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

    function updateMenuDisplay() {
        menuBar.classList.remove("active");
        menubg.classList.remove("active");

        const iconImg = menuToggle.querySelector("img");
        const logo = document.querySelector(".logo img");

        iconImg.src = "./images/toggleopen.svg";
        logo.src = "./images/logo.png";
    }

    function handleScroll() {
        const st = window.scrollY || document.documentElement.scrollTop;
        const isScrolledPastTrigger = st > mainVideo.offsetTop + triggerOffset;
        const isMenuActive = menuBar.classList.contains("active");

        if (!isMenuActive) {
            if (!isHeaderHidden && st > lastScrollTop && isScrolledPastTrigger) {
                gsap.to(header, { y: "-100%", duration: 0.8 });
                isHeaderHidden = true;
            } else if (isHeaderHidden && st < lastScrollTop) {
                gsap.to(header, { y: 0, duration: 0.8 });
                isHeaderHidden = false;
            }
        }

        lastScrollTop = st <= 0 ? 0 : st;
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            updateMenuDisplay();
        }
        ScrollTrigger.update();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    menuToggle.addEventListener("click", function () {
        menuBar.classList.toggle("active");
        menubg.classList.toggle("active");

        const iconImg = menuToggle.querySelector("img");
        const logo = document.querySelector(".logo img");

        if (iconImg.src.includes("toggleopen.svg")) {
            iconImg.src = "./images/toggleclose.svg";
            logo.src = "./images/logoclose.png";
        } else {
            iconImg.src = "./images/toggleopen.svg";
            logo.src = "./images/logo.png";
        }
    });

    const menuItems = document.querySelectorAll(".header_menu li");
    menuItems.forEach(function (item) {
        item.addEventListener("click", updateMenuDisplay);
    });

    document.querySelectorAll(".header_menu a").forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});

// main videos
const main = document.querySelector(".main");
const mainVideo = document.querySelector(".main_video");
const video = document.querySelector(".main_video_object");
const mm = gsap.matchMedia();

const setClipPath = (progress, size) => {
    const clipPathValue = `inset(0 calc(${1 - progress} * ((100% - ${size}) / 2)))`;
    gsap.set(mainVideo, { clipPath: clipPathValue });
};

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: main,
        start: "top top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
            if (window.innerWidth >= 1920) {
                setClipPath(self.progress, "70rem");
            } else if (window.innerWidth >= 768) {
                setClipPath(self.progress, "70rem");
            } else if (window.innerWidth >= 360) {
                setClipPath(self.progress, "48rem");
            } else {
                setClipPath(self.progress, "26rem");
            }
        },
    },
});

tl.to(main, {
    scrollTrigger: {
        trigger: mainVideo,
        start: "top top",
        end: () => "+=" + video.clientHeight,
        pin: true,
    },
});

// about
const aboutAni = gsap.timeline();
aboutAni
    .from(".about_container .about_txt1", { autoAlpha: 1, duration: 0 }, "+=1")
    .from(".about_container .about_txt2", { autoAlpha: 0, duration: 0 }, 2)
    .from(".about_container .about_txt3", { autoAlpha: 0, duration: 0 }, 6);

ScrollTrigger.create({
    animation: aboutAni,
    trigger: ".about_container",
    start: "top top",
    end: "+=1500",
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

gsap.set(workTopTxt, { y: 0 });

ScrollTrigger.create({
    trigger: workSection,
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    onUpdate: () => {
        const translateY = window.scrollY - workSection.offsetTop;
        const translateSetY = translateY < 0 ? 0 : translateY;
        const targetH3 = document.querySelector(".work_move_txt h3:nth-child(1)");

        if (window.scrollY >= workSection.offsetTop) {
            gsap.to(workTopTxt, { opacity: 0.1, duration: 0.3 });
            gsap.to(targetH3, { opacity: 0.8, duration: 0.3 });
            gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
        } else {
            gsap.to(workTopTxt, { opacity: 1, duration: 0.3 });
            gsap.to(targetH3, { opacity: 1, duration: 0.3 });
            gsap.to(workTopTxt, { y: translateSetY, duration: 0 });
        }
    },
});

// scroll up text
gsap.utils.toArray(".fadein").forEach((elem) => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 70%",
        toggleClass: "fade-in",
    });
});
