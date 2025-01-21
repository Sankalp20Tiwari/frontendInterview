import { numberWithCommas } from "../utils/config"

function SliderInput({title,state,min,max,labelMin, labelMax,onChange, underlineTitle ,}){
    return (
        <>
        <span className='title'>{title}</span>
             { state > 0 && ( <span className='title' style ={{textDecoration:"underline"}}>{underlineTitle}</span>)}
              <div>
              <input 
                type= 'range'
                min = {min}
                max={max}
                className='slider'
                value={state}
                onChange= {onChange}
              />
              <div className='labels'>
                <label>{labelMin ?? numberWithCommas(min)}</label>
                 <b>{numberWithCommas(state)}</b>
                <label>{labelMax ?? numberWithCommas(max)}</label>
              </div>
              </div>
        </>      
    )
}

export default SliderInput