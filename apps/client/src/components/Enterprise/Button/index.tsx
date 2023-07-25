'use client'

import React from "react";
import Image from "next/image";

import styles from './Button.module.scss'

export default function Button ({alt}: {alt: string}): JSX.Element {
  return (
    <button onClick={() => { console.log('test'); }} className={styles.button} type="button">
      <Image
            src={'/vertical_button.svg'}
            width={30}
            height={30}
            alt={`Más opciones para ${alt}`}
          />
    </button>
  )
}