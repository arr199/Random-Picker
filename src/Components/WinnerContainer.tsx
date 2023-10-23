import React from 'react'
import animations from '../assets/motions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  winner: string | null
  setWinner: React.Dispatch<React.SetStateAction<string | null>>
}

export function WinnerContainer ({ winner, setWinner }: Props): JSX.Element {
  return (
        <AnimatePresence>
        {winner && <motion.div {...animations.scaleAnimationCenterExitCenter()} // eslint-disable-line @typescript-eslint/strict-boolean-expressions
          className="absolute   inset-0 m-auto w-80 h-40 p-4 bg-slate-800 flex flex-col justify-around  border-gray-500 border">
          <h1 className="text-center">We got a winner</h1>
          <h1 className="text-center text-green-500">{winner}</h1>
          <div className="flex justify-around pt-4">
            <button onClick={() => { setWinner(null) }}
              className="px-10 py-2 bg-blue-500 hover:bg-blue-400  ">Close
            </button>
          </div>
        </motion.div>}
      </AnimatePresence>
  )
}
