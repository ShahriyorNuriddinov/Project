import { memo } from "react";

interface IconType {
  src: string;
  alt: string;
}

const Icons = () => {
  const icons: IconType[] = [
    { src: "/icon1.png", alt: "Roccat" },
    { src: "/icon2.png", alt: "MSI" },
    { src: "/icon3.png", alt: "Razer" },
    { src: "/icon4.png", alt: "Thermaltake" },
    { src: "/icon5.png", alt: "ADATA" },
    { src: "/icon6.png", alt: "HP" },
    { src: "/icon7.png", alt: "Gigabyte" },
  ];

  return (
    <div className="container px-4">
      <div className="flex items-center justify-between gap-6">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
          >
            <img
              src={icon.src}
              alt={icon.alt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Icons);
