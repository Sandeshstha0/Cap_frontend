import React, { useEffect } from "react";

const WelcomeAnimation: React.FC = () => {
  useEffect(() => {
    // Dynamically import the Lottie player for client-side rendering
    import("@dotlottie/player-component");
  }, []);

  return (
    <dotlottie-player
      src="https://lottie.host/76a2a530-1e88-4858-ae7e-639786966f40/hplSjyBLQm.lottie"
      background="transparent"
      speed="1"
      style={{ width: "150px", height: "150px" }}
      loop
      autoplay
    ></dotlottie-player>
  );
};

export default WelcomeAnimation;
