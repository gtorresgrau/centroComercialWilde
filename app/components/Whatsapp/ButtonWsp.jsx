"use client"
import React, { useState } from "react";
import Link from "next/link";
import '../../globals.css';
import { FaWhatsapp } from "react-icons/fa";

const ButtonWsp = ({ text = 'ADMINISTRACION' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article className="buttonWspPosition">
      <Link href="https://api.whatsapp.com/send?phone=5491131635166" passHref>
        <button
          rel="noopener noreferrer"
          className='buttonWspDesign'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Contact via WhatsApp"
          role="button"
          data-client={true}
        >
          <FaWhatsapp className='iconWhatsApp'/>
          {isHovered && <h2 className='textWhatsApp'>{text}</h2>}
        </button>
      </Link>
    </article>
  );
}

export default ButtonWsp;
