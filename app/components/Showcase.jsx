// imports hooks
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
// imports libraries(components)
import gsap from "gsap";

// creates and exports a Showcase component
const Showcase = () => {
  // hooks section
  // uses useMedia hook to check if the device is tablet depending on the screen width
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  // uses useGSAP hook to create scroll-based animations with GSAP depending on device type
  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", {
          transform: "scale(1.1)",
        })
        .to(".content", { opacity: 1, y: 0, ease: "power1.in" });
    }
  }, [isTablet]);

  return (
    <section id="showcase">
      {/* media section */}
      <div className="media">
        {/* video section */}
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" />
        </div>
      </div>

      {/* Showcase content section */}
      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            {/* Showcase content title */}
            <h2>Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              {/* Showcase content text */}
              <p>
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design that’s
                unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          {/* M4 performance details section */}
          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Showcase;
