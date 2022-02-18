import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import React, { useEffect } from 'react'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const [startTimer, setStartTimer] = React.useState(true)
  const [highScore, setHighScore] = React.useState(localStorage.getItem('highscore'))



  useEffect(
    () => {
      const isAllHeld = dice.every(die => die.isHeld)
      const referenceValue = dice[0].value
      const isAllSameValue  = dice.every(die => die.value === referenceValue )
     if ( isAllHeld && isAllSameValue){
       setTenzies(true)
       if(timer < highScore){
         localStorage.setItem('highscore', timer)
       }
     } else {
      setTenzies(false)
     }

    }, [dice, timer, highScore]
  )

  
  useEffect(() => {
    if(tenzies === false){
      setStartTimer(true)
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000);

      return () => clearInterval(interval)
    }  else {
      setStartTimer(false)
    }

    
  }, [startTimer, tenzies])

  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    let array = []
    for (let index = 0; index < 10; index++) {
      array.push(generateNewDie())
    }
    return array
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map( die => {
      if(die.id === id){
        return {
          ...die, isHeld: !die.isHeld
        }
      } else return die
    }))
  }

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        if(die.isHeld){
          return die
        } else return generateNewDie()
      }))
      setRolls(prev => prev + 1)
    } else {
        if(!highScore){
          localStorage.setItem('highscore', timer)
        } else(setHighScore(localStorage.getItem('highscore')))
        setTenzies(false)
        setDice(allNewDice())
        setRolls(0)
        setTimer(0)
        setStartTimer(false)
    }
   
  }

  const dieElements = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <div className=" w-full min-h-screen bg-[#131958] p-2 sm:p=4 overflow-x-hidden">
      <main className="bg-[#F5F5F5] min-h-screen rounded-md max-w-[800px] flex flex-col items-center  mx-auto pt-20 p-4 space-y-16 relative select-none">
        {tenzies && <Confetti />}
        <p className="absolute top-0 right-0 p-2 m-3 text-yellow-500 bg-black rounded-full w-12 h-12 text-center font-bold text-3xl cursor-pointer">
          {timer}
        </p>
        <div className="text-center mx-auto space-y-4">
          <h1 className="font-extrabold text-3xl">Tenzies</h1>
          <p className="text-gray max-w-[350px]">
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls. Try to beat your fastest time
          </p>
        </div>
        <div className="flex flex-col mx-auto items-center justify-center">
          <div className="h-[90px] w-full mx-auto grid grid-cols-5 gap-y-6 gap-x-2 sm:gap-x-8 mb-20">
            {dieElements}
          </div>
          <button onClick={rollDice} className="hover:brightness-90 cursor-pointer outline-none border-none font-bold text-lg bg-red-700 text-white rounded-sm p-3 shadow-md">{tenzies === true ? "New Game" : "Roll Dice"}</button>
        </div>
        <div>
          <p className="font-bold text-xl">Number of rolls: {rolls} </p>
          <p className="font-bold text-xl">Time to beat: {highScore} </p>
        </div>
      </main>
    </div>
  );
}

export default App;
