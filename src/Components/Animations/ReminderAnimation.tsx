import React, { useEffect } from "react";

const ReminderAnimation: React.FC = () => {
  useEffect(() => {
    // Dynamically import the Lottie player for client-side rendering
    import("@dotlottie/player-component");
  }, []);

  return (
    <dotlottie-player
      src="https://lottie.host/329d1e82-30c4-4040-a4e6-67b5645525f8/MDTgXsqIDn.lottie"
      background="transparent"
      speed="1"
      style={{ width: "200px", height: "200px" }}
      loop
      autoplay
    ></dotlottie-player>
  );
};

export default ReminderAnimation;
