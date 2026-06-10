import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initHome() {
//   if (!document.body.classList.contains("home-page")) return;

//       const media = gsap.matchMedia();
//         media.add("(min-width: 1201px)", () => {
//             const tl = gsap.timeline({
//                 scrollTrigger: {
//                     trigger: ".main",
//                     start: "top top",
//                     end: "bottom 30%",
//                     scrub: 1,
//                     // markers:true
//                 },
//             });

//             // 캐릭터 이동
//             tl.to(".main__character", {
//                 y: 550,
//                 x: 450,
//                 scale: 1.3,
//                 duration: 0.3,
//                 ease: "none",
//             });

//             tl.to(
//                 ".main__circle",
//                 {
//                     scale: 0,
//                     opacity: 0,
//                     duration: 0.2,
//                     ease: "none",
//                 },
//                 0,
//             );

//             return () => tl.kill();
//         });

//     // about text animation

    gsap.set(".about__text-box p", { opacity: 0, y: -40 });

    ScrollTrigger.create({
        trigger: ".about",
        start: "top 50%",
        onEnter: () => {
            gsap.to(".about__text-box p", {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            });
        },
        onLeaveBack: () => {
            gsap.to(".about__text-box p", {
                opacity: 0,
                y: -40,
                duration: 0.8,
                ease: "power2.out",
            });
        },
        onRefresh(self) {
            if (self.progress === 1) {
                gsap.set(".about__text-box p", { opacity: 1, y: 0 });
            }
        },
    });
    // favoriteBox item 스크롤에 따라 통통거리는 움직임 애니메이션

    const favoriteMotion = gsap.timeline({
        scrollTrigger: {
            trigger: ".about__content",
            start: "0% 50%",
            end: "80% 50%",
            scrub: 1,
            //markers:true
        },
    });

    favoriteMotion.from(
        ".about-favorite__col--left #l_1",
        { x: "20", y: "-120", rotate: 40, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".about-favorite__col--left #l_2",
        { x: "40", y: "-120", rotate: -20, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".about-favorite__col--left #l_3",
        { x: "-20", y: "120", rotate: -40, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".about-favorite__col--left #l_4",
        { x: "-40", y: "120", rotate: 10, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".about-favorite__col--left #l_5",
        { x: "20", y: "120", rotate: 60, ease: "bounce.out", duration: 8 },
        3,
    );

    // right item
    favoriteMotion.from(
        ".about-favorite__col--right #r_1",
        { x: "30", y: "-120", rotate: -20, ease: "bounce.out", duration: 8 },
        1,
    );
    favoriteMotion.from(
        ".about-favorite__col--right #r_2",
        { x: "20", y: "100", rotate: 60, ease: "bounce.out", duration: 8 },
        2,
    );
    favoriteMotion.from(
        ".about-favorite__col--right #r_3",
        { x: "-20", y: "120", rotate: -40, ease: "bounce.out", duration: 8 },
        3,
    );
    favoriteMotion.from(
        ".about-favorite__col--right #r_4",
        { x: "100", rotate: -80, ease: "bounce.out", duration: 8 },
        2,
    );

    // video

    gsap
        .timeline({
            scrollTrigger: {
                trigger: ".video",
                start: "0% 70%",
                end: "80% 100%",
                scrub: 1,
                //markers: true,
            },
        })

        .fromTo(
            ".video__wrap .video__box",
            { "clip-path": "inset(60% 60% 60% 60% round 30%)" },
            { "clip-path": "inset(0% 0% 0% 0% round 0%)", ease: "none", duration: 10 },
            0,
        )
        .to(
            ".video__intro-circle",
            { width: "2500px", height: "1000px", ease: "none", duration: 3 },
            0,
        );

   
    // work

    let activeImage = null;

    gsap.utils.toArray(".work__item").forEach((item) => {
        const trigger = item.querySelector(".work__text") || item;
        const image = item.querySelector(".work__img");

        if (!image) return;

        let setX;
        let setY;

        const align = (e) => {
            if (!setX || !setY) return;
            setX(e.clientX + 20);
            setY(e.clientY + 20);
        };

        const startPoint = () => document.addEventListener("mousemove", align);
        const stopPoint = () => document.removeEventListener("mousemove", align);
        const fade = gsap.to(image, {
            autoAlpha: 0.85,
            ease: "none",
            paused: true,
        });

        trigger.addEventListener("mouseenter", (e) => {
            if (activeImage && activeImage !== image) {
                gsap.set(image, {
                    x: gsap.getProperty(activeImage, "x"),
                    y: gsap.getProperty(activeImage, "y"),
                });
            }

            setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3.out" });
            setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3.out" });
            activeImage = image;

            fade.play();
            startPoint();
            align(e);
        });

        trigger.addEventListener("mouseleave", () => {
            stopPoint();
            fade.reverse();
        });
    });

}
