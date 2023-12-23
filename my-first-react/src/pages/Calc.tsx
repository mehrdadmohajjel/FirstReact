import React from 'react'

type Props = {

}

const Calc = ({}: Props) => {
  const[num1,setNum1] = React.useState<Number>(0)
  const[num2,setNum2] = React.useState<Number>(0)
  const[result,setResult] = React.useState<Number>(0)
  function callPower(): void {
    let pow =1;
    for (let i = 0; i < Number(num2); i++) {
         pow *= Number(num1)
  } 
  setResult(pow)
  }

  return (
    <div style={{width:200,padding:10}}>
      <input type='number' value={Number(num1)}  onChange={(e)=> setNum1(Number(e.target.value))}  />
      <input type='number' value={Number(num2)}  onChange={(e)=> setNum2(Number(e.target.value))}  />
      <button onClick={() => {setResult(Number(num1) + Number(num2))}} >+</button>  
      <button onClick={() => {setResult(Number(num1) - Number(num2))}} >-</button>  
      <button onClick={() => {setResult(Number(num1) * Number(num2))}} >*</button>  
      <button onClick={() => {setResult(Number(num1) / Number(num2))}} >/</button>
      <button onClick={(e) => callPower()} >x^y</button>
      <input type='number'  value={Number(result)}  onChange={(e)=> setResult(Number(e.target.value))} />
    </div>
  )
}

export default Calc