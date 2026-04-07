// imports libraries(components)
import gsap from "gsap";
// imports hooks
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

// creates and exports Highlights component
const Highlights = () => {
  // hooks section
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // uses GSAP hook for animations on scroll
  useGSAP(() => {
    gsap.to([".left-column", ".right-column"], {
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center",
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="highlights">
      {/* title section */}
      <h2>There’s never been a better time to upgrade.</h2>
      {/* Details section */}
      <h3>Here’s what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        {/* Left column details section */}
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" />
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              A stunning <br />
              Liquid Retina XDR <br />
              display.
            </p>
          </div>
        </div>
        {/* Right column details section */}
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Built for <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Up to
              <span className="green-gradient"> 14 more hours </span>
              battery life.
              <span className="text-dark-100"> (Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
