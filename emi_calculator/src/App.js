import './App.css';
import {useEffect, useState  } from 'react';
import { tenureData } from './utils/constants';
import { numberWithCommas } from './utils/config';
import TextInput from './components/textInput';

function App() {
  const [cost, setCost] = useState(0)
  const [interest, setInterest] = useState(10)
  const [fee, setFee] = useState(1)
  const [downPayment, setDownPayment] = useState(0)
  const [tenure, setTenure] = useState(12)
  const [emi, setEmi] = useState(0)
  
  const calculateEmi = (downPayment) => {
        if(!cost ) return;

        const loanAmt = cost - downPayment;
        const rateOfInterest = interest /100 ;
        const noOfYears = tenure / 12;

        const emi = (loanAmt  * rateOfInterest * Math.pow(1 + rateOfInterest, noOfYears)) / (Math.pow(1 + rateOfInterest, noOfYears) - 1)

        return Number(emi/12).toFixed(0);
  }

  const calculateDownPayment = (emi) => {
    if(!cost ) return;
    const downPaymentPercent = 100 - (emi /calculateEmi(0)) * 100

    return Number(cost * (downPaymentPercent / 100)).toFixed(0);
  }

  useEffect(() => {
     if(!(cost > 0)){
      setDownPayment(0)
      setEmi(0)
     }
     const emi = calculateEmi(downPayment)
     setEmi(emi)
  },[tenure,cost])

  const updateEmi = (e) => {
      if(!cost ) return;

      const dp = Number(e.target.value) 
      setDownPayment(dp.toFixed(0))

      //calculate emi and update it
      const emi = calculateEmi(dp)
      setEmi(emi)
  }


  const updateDownPayment = (e) => {
    if(!cost ) return;

    const emi = Number(e.target.value) 
    setEmi(emi.toFixed(0))

    //calculate down payment and update it 
    const dp = calculateDownPayment(emi)
    setDownPayment(dp)
  }

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  
  return (
    <div className="App">
      <span className='title' style={{fontSize:"30px"}}>Emi Calculator</span>
      <TextInput title = 'Total Cost of Asset' state={cost} setState={setCost} />

      <TextInput title = 'Interest Rate (in %)' state={interest} setState={setInterest} />
      
      <TextInput title = 'Processing fee (in %)' state={fee} setState={setFee} />
      
      <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEmi}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
      />

      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEmi(cost)}
        max={calculateEmi(0)}
      />
      <span className='title'>Tenure</span>
      <div className='tenureContainer'>
        {
          tenureData.map((t) => {
            return <button 
            className={`tenure ${t === tenure ? "selected" : ""}`}
            onClick={() => setTenure(t)}
            >{t}</button>
          })
        }
        </div>
    </div>
  );
}

export default App;
