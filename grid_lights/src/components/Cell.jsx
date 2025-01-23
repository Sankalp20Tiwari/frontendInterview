import React from 'react'

const Cell = ({filled, onClick , isDisabled ,label}) => {
  return (
    <button type= 'button' onClick={onClick} className={filled ? "cell cell-activated" :"cell"} 
    disabled={isDisabled}
    aria-label={label}
    />
  )
}

export default Cell
