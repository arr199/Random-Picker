import { motion } from 'framer-motion'
import animations from '../assets/motions'
// ICONS
import { FaArrowUp } from 'react-icons/fa'
import spinner1 from '/loading1.svg'
import spinner1Static from '/loading1-static.svg'
// CONSTANTS
import API from '../Utils/Constants'

interface Props {
  isSpinning: string
  setIsSpinning: React.Dispatch<React.SetStateAction<string>>
  list: List[]
  setList: React.Dispatch<React.SetStateAction<List[]>>
  selectedMode: string
  duration: number
  setWinner: React.Dispatch<React.SetStateAction<string | null>>
}

export function SpinButton ({ isSpinning, setIsSpinning, list, setList, selectedMode, duration, setWinner }: Props): JSX.Element {
  function handleSpinClick (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    document.body.style.cursor = 'not-allowed'
    setIsSpinning('spinning')
    // IN ORDER TO LOOP AROUND THE ELEMENTS LIST FORM 0 TO LAST INDEX WE CREATE THIS VARIABLE
    let currentIndex: number = 0
    // GET A RAMDOM NUMBER
    const randomNumber = (Math.floor(Math.random() * list.length))
    // SET THE DURATION OF EACH INTERVAL DEPENDING ON THE USER INPUT DURATION
    const intervals = Math.round((duration * 1000) / (15 * list.length))
    // GO THROUGH THE ELEMENTS LIST 5 TIMES AND THEN CHOOSE A RANDOM NUMBER
    new Array(15 * list.length + randomNumber).fill(0).forEach((_, index) => {
      const timer = setTimeout(() => {
        if (selectedMode === 'Jump Between Elements') {
          setList(prevList => {
            const newList = prevList.map(e => ({ ...e, selected: false }))
            newList[Math.floor(Math.random() * list.length)].selected = true

            if (index >= (15 * list.length + randomNumber) - 1) {
              const selectedElement = (newList.filter(e => e.selected))[0].text
              setWinner(selectedElement)
              document.body.style.cursor = ''
            }
            return newList
          })
        } else if (selectedMode === 'Go Through') {
          setList(prevList => {
            // WE SET CURRENT_INDEX TO 0 IN ORDER TO LOOP OVER THE LIST FROM 0 TO THE LAST INDEX ONCE AGAIN
            if (currentIndex >= list.length) currentIndex = 0
            // SET ALL THE ELEMENTS SELECTED PROP TO FALSE
            let newList = prevList.map(i => ({ ...i, selected: false }))
            // SET ONLY THE ELEMENT WHERE INDEX = CURRENT_INDEX TO TRUE
            newList = newList.map((i, ind) => ind === currentIndex ? { ...i, selected: true } : i)
            currentIndex++
            if (index >= (15 * list.length + randomNumber) - 1) {
              const selectedElement = (newList.filter(e => e.selected))[0].text
              setWinner(selectedElement)
              document.body.style.cursor = ''
            }
            return newList
          })
          // SET THE WINNER
          // SELECTED THE ELEMENTS WE ARE REMOVING
        } else if (selectedMode === 'Elimination') {
          if (currentIndex >= 14) {
            setList(prevList => {
              if (prevList.length === 1) {
                prevList[0].selected = true
                setWinner(prevList[0].text)
                return prevList
              }

              const number = Math.floor(Math.random() * prevList.length)
              currentIndex = 0
              prevList[number].selected = true
              const newList = [...prevList].filter((_, ind) => ind !== number)

              return newList
            })
          }
          currentIndex++
        }
        // SET THE SPINING STATE TO IDLE IN THE LAST ITERATION
        if (index >= (15 * list.length + randomNumber) - 1) {
          document.body.style.cursor = ''
          setIsSpinning('idle')
        }
      }, duration > 0 ? index * intervals : index * API.DEFAULT_WHEEL_CHANGE_INTERVAL_MS)
      return () => { clearTimeout(timer) }
    })
  }

  return (
        <form onSubmit={handleSpinClick} >
        <motion.div className=" w-40 h-40 rounded-full flex flex-col items-center justify-between">
          <button type="submit" name="spin" disabled={isSpinning === 'spinning' || list.length <= 1}
            className="spin-btn  items-center w-full h-full disabled:opacity-50 justify-center
              rounded-full text-xl  font-bold hover:scale-[1.1]  transition-all duration-300  hover:opacity-80">
            <img className="inset-0  w-full h-full  m-auto " src={isSpinning === 'spinning' ? spinner1 : spinner1Static} ></img>
          </button>
          <motion.div {...animations.loopArrowAnimation()}
            className="w-10 h-10 opacity-70">
            <FaArrowUp className="w-full h-full text-blue-400" />
          </motion.div>
          <h1 className="mt-4 text-xl text-blue-400 font-bold">START</h1>
        </motion.div>
      </form>
  )
}
