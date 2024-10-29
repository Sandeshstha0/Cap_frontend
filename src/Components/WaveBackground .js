const WaveBackground = () => {
    return (
      <div className="wave-container">
        <svg
          className="wave"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#0099ff" // Change the color as needed
            fillOpacity="0.7"
            d="M0,160L60,149.3C120,139,240,117,360,101.3C480,85,600,75,720,69.3C840,64,960,64,1080,85.3C1200,107,1320,149,1380,170.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>
    );
  };
  
  export default WaveBackground;
  