// imports hooks
import { useRef } from "react";
import { useEffect } from "react";

// creates and exports Hero component
const Hero = () => {
  // hooks section
  // uses useRef hook to create a reference for the video element
  const videoRef = useRef();

  // uses useEffect hook to set the playback rate of the video when the component mounts
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section id="hero">
      <div>
        {/* MacBook Pro title */}
        <h1>MacBook Pro</h1>
        {/* MacBook Pro image */}
        <img src="/title.png" alt="MacBook Pro" />
      </div>
      {/* MacBook Pro video */}
      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />
      {/* Buy button */}
      <button>Buy</button>
      {/* Price details */}
      <p>From $1599 of $133/mo for 12 months</p>
    </section>
  );
};

export default Hero;
