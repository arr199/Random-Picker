import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import animations from '../assets/motions'
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

interface Props {
  selectedMode: string
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>

}

export function PickModeMenu ({ selectedMode, setSelectedMode }: Props): JSX.Element {
  const [pickModeOpen, setPickModeOpen] = useState(false)

  function handleSelectMode (e: React.MouseEvent): void {
    const target = e.target as HTMLLIElement
    setSelectedMode(target.textContent as string)
    setPickModeOpen(false)
  }

  return (
    <div className="w-[70%] ">
        <h1 className="flex items-center py-4 gap-2 text-blue-400 font-bold text-xl" > <GiPerspectiveDiceSixFacesRandom />Pick mode</h1>
        <button onClick={() => { setPickModeOpen(!pickModeOpen) }}
            className={`w-full flex justify-between items-center py-2 text-start pl-2 pr-4 border-2 border-blue-300 outline-none 
    hover:bg-blue-500 active:scale-95 ${pickModeOpen ? 'bg-blue-500' : ''}`} >
            {selectedMode}
            {/* render down arrow or up arrow  */}
            {pickModeOpen ? < IoIosArrowDropdown className="w-6 h-6 text-blue-300"></ IoIosArrowDropdown> : < IoIosArrowDropup className="w-6 h-6 text-blue-300"></ IoIosArrowDropup>}

        </button>
        <AnimatePresence>
            {pickModeOpen && <motion.ul {...animations.scaleAnimationLeftToBottomRightExitReverse()}
                className="mt-1 bg-blue-600 flex flex-col border-[2px] w-full  rounded border-blue-300  [&>li]:cursor-pointer [&>li]:px-[10px] outline-4 [&>li]:py-[4px] [&>li]:text-[14px]">
                <motion.li onClick={handleSelectMode} className="hover:bg-blue-700" {...animations.fadeAnimation(0.15)}>Jump Between Elements</motion.li>

                <motion.li onClick={handleSelectMode} className="hover:bg-blue-700" {...animations.fadeAnimation(0.30)}>Go Through</motion.li>
                <motion.li onClick={handleSelectMode} className="hover:bg-blue-700" {...animations.fadeAnimation(0.45)}>Elimination</motion.li>
            </motion.ul>}
        </AnimatePresence>
    </div>
  )
}
