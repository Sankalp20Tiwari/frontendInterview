import { useState } from 'react'

import './App.css'
import usePasswordGenerator from './hooks/usePasswordGenerator'
import PasswordStrengthIndicator from './components/StrengthChecker'
import Button from './components/Button'
import Checkbox from './components/Checkbox'

function App() {

  const [length, setLength] = useState(4)
  const [checkboxData, setCheckboxData] = useState([
    {
      label : "Include Uppercase Letters",
      state : false
    },
    {
      label : "Include Lowercase Letters",
      state : false
    },
    {
      label : "Include Numbers",
      state : false
    },
    {
      label : "Include Symbols",
      state : false
    },
  ])

  const [copied,setCopied] = useState(false)

  const handleCheckboxChange = (index) => {
     const updatedCheckboxData = [...checkboxData];
     updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
     setCheckboxData(updatedCheckboxData);
  }

  const handleCopy = () => {
      navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000)
  }
  
  const {password , errorMessage,generatePassword} = usePasswordGenerator()
  
  return (
    <div className='container'>
      { password && (<div className='header'>
        <div className='title'>
          {password}
        </div>
       
        <Button text= {copied ? "Copied" : "Copy"}  onClick={ handleCopy} customClass="copyBtn"/>
      </div>)}
      <div className='charLength'>
        <span>
          <label >Character Length</label>
          <label >{length}</label>
        </span>
        <input 
        type='range'
        min={4}
        max={20}
        value={length}
        onChange={(e) => setLength(e.target.value)}
        />
      </div>
      <div className="checkboxes">
        {checkboxData.map((item ,index) => {
          return (
            
            <Checkbox key = {index} label = {item.label} state = {item.state} onChange={() => handleCheckboxChange(index)}/>
          )
        })}
      </div>
      <PasswordStrengthIndicator password={password}/>
      {errorMessage && <div className='error'>{errorMessage}</div>} 
      
      <Button customClass="generateBtn" text = "Generate Password"  onClick= {() => generatePassword(checkboxData , length)} />
    </div>
  )
}

export default App
