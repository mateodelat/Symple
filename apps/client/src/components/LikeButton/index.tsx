'use client'

import { useState } from 'react'

export const LikeButton = ({ id }: { id: number }): JSX.Element => {
  const [liked, setLiked] = useState(false)
  return (
    <button onClick={() => setLiked(!liked)}>{liked ? '♥' : '♡'}</button>
  )
}
