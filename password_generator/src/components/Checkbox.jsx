import React from 'react'

const Checkbox = ({label , state , onChange}) => {
  return (
    
      <div className="checkbox" >
              <input type="checkbox" checked = {state} onChange={onChange} />
              <label>{label}</label>
      </div>
    
  )
}

export default Checkbox
