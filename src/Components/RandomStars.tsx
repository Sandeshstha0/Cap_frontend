import Image from "next/image";

function AlternatingStars() {
  const stars = Array(5)
    .fill(1)
    .map((_, index) => {
      const yOffset = index % 2 === 0 ? 10 : -10; // Move down for even index, up for odd index
      return (
        <Image
          src="/star.svg"
          key={index}
          alt="star"
          width={24}
          height={24}
          style={{
            transform: `translateY(${yOffset}px)`, // Apply vertical offset
          }}
        />
      );
    });

  return <div className="flex items-center gap-2">{stars}</div>;
}

export default AlternatingStars;
