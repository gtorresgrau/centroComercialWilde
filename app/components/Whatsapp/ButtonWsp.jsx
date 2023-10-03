"use client"
import Link from "next/link";
import React, { useState } from "react";
import styles from '../../Contact.module.css'
import { FaWhatsapp } from "react-icons/fa";

function ButtonWsp({ text = 'ADMINISTRACION' }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <article className={styles.buttonWspPosition}>
      <Link href="https://api.whatsapp.com/send?phone=5491131635166" passHref>
        <button
          rel="noopener noreferrer"
          className={styles.buttonWspDesign}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          alt='Boton whatsapp'
          aria-label="Contactar por WhatsApp"
          role="button"
        >
          <FaWhatsapp className={styles.iconWhatsApp} />
          {isHovered && <h2 className={styles.textWhatsApp}>{text}</h2>}
        </button>
      </Link>
    </article>
  );
}

export default ButtonWsp;

