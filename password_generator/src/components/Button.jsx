import React from 'react'

const Button = ({onClick , text , customClass}) => {
  return (
    <div>
      <button className={customClass} onClick={onClick}>
        {text}
        </button>
    </div>
  )
}

export default Button
