import Image from "next/image";
import { memo } from "react";
import { FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";

const FooterCard = () => {
  return (
    <div
      style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
          className="hover:text-blue-500 transition-colors text-xl"
        >
          <FaSquareFacebook />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white" }}
          className="hover:text-pink-500 transition-colors text-xl"
        >
          <FaSquareInstagram />
        </a>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/CARD.png"
          alt="Payment Methods"
          width={150}
          height={30}
          className="object-contain"
        />
      </div>
      <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-xs">
        Copyright © 2020 Shop Pty. Ltd.
      </p>
    </div>
  );
};

export default memo(FooterCard);
