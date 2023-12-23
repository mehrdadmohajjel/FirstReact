import React from 'react'

type Props = {
    name:string,
    family: string,
    age: number,
    gender: 'male'| 'family'
}

const Card = ({name,family,age,gender}: Props) => {
  return (

    <div>
        <div style={{width:200}}>
            <span  style={{width:80, textAlign:'right'}}>
                نام:
            </span>
            <span  style={{width:120, textAlign:'right'}}>
            {name}  {family}
            </span>
        </div>
        <div style={{width:200}}>
            <span  style={{width:80, textAlign:'right'}}>
                سن:
            </span>
            <span  style={{width:120, textAlign:'right'}}>
            {age}
            </span>
        </div>
        <div style={{width:200}}>
            <span  style={{width:80, textAlign:'right'}}>
                جنسیت:
            </span>
            <span  style={{width:120, textAlign:'right'}}>
            {gender}
            </span>
        </div>
    </div>

  )
}

export default Card