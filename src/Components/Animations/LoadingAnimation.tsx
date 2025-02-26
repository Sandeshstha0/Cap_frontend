import React, { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingAnimation() {
  useEffect(() => {
    // Dynamically import the Lottie player for client-side rendering
    import("@dotlottie/player-component");
  }, []);

  return (
    <div>
      <DotLottieReact
        src="https://lottie.host/f95c57f9-1369-47e8-a328-2edbf424fe75/asJdFN831J.lottie"
        loop
        autoplay
      />
    </div>
  );
}
