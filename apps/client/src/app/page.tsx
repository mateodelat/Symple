'use client'

import React from 'react'

export default function Home (): JSX.Element {
  return (
    <button onClick={() => {
      fetch('/api')
        .then(async response => await response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }}
    >
      Click me
    </button>
  )
}
