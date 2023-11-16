"use client"
import React, { useState } from "react";
import Link from "next/link";
import '../../styles/globals.css';
import { FaWhatsapp } from "react-icons/fa";

interface ButtonWspProps {
  text?: string;
  contact?: string;
}

const ButtonWsp = ({ text , contact }: ButtonWspProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const enviar = `https://api.whatsapp.com/send?phone=54${contact}`

  return (
    <article className="buttonWspPosition">
      <Link href={enviar} passHref>
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
