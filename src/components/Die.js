import React from 'react';

const Die = (props) => {
  let isHeldColor = props.isHeld ? "bg-green-500" : "bg-white"
  return <div 
    onClick = {props.holdDice}
    className={
      `hover:brightness-75  h-[40px] sm:h-[50px]  select-none w-[40px] sm:w-[50px]  rounded-md shadow-md flex items-center justify-center cursor-pointer ${isHeldColor}` }>
      <h2 className="font-extrabold text-xl">{props.value}</h2>
  </div>;
};

export default Die;
