import { useEffect, useState } from "react"
import { MAX } from "../constants"
import { MIN } from "../constants"

const ProgressBar = ({value = 0 , onComplete = () => {} }) => {
    const [percent,setPercent] = useState(value)

    useEffect(() => {
        setPercent(Math.min(MAX,Math.max(MIN,value)))
        if(value >= MAX ){
            onComplete()
        }
    },[value])
    return (
        <div className='progress'>
           <span style={{color: percent >49 ? "white" : "black" }}>{percent.toFixed(0)}%</span>
           <div
            //  style={{width:`${percent}%`}}
             style={{transform:`scaleX(${percent/MAX})`,transformOrigin:"left"}}
             role="progressbar"
             aria-valuemax={MAX}
             aria-valuemin={MIN}
             aria-valuenow={percent.toFixed(0)}
           />
        </div>
    )
}

export default ProgressBar