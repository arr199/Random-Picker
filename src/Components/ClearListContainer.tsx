import { motion, AnimatePresence } from 'framer-motion'
import animations from '../assets/motions'
import { nanoid } from 'nanoid'

interface Props {
  setList: React.Dispatch<React.SetStateAction<List[]>>
  showClearContainer: boolean
  setShowClearContainer: React.Dispatch<React.SetStateAction<boolean>>
  setToaster: React.Dispatch<React.SetStateAction<Toaster[]>>
}

export function ClearListContainer ({ showClearContainer, setShowClearContainer, setList, setToaster }: Props): JSX.Element {
  // YES BTN
  function handleYesBtn (): any {
    setList([])
    setShowClearContainer(false)
    setToaster([{ text: 'All items', id: nanoid(), type: 'remove' }])
    const timer = setTimeout(() => {
      setToaster([])
    }, 1000)
    return () => { clearTimeout(timer) }
  }
  // NO BTN
  function handleNoBtn (): void {
    setShowClearContainer(false)
  }

  return (
       <>  {/* CLEAR LIST CONTAINER */}
       <AnimatePresence>
        {showClearContainer &&
          <motion.div {...animations.scaleAnimationCenterExitCenter()}
            className="absolute   inset-0 m-auto w-80 h-40 p-4 bg-slate-800 flex flex-col justify-around  border-gray-500 border">
            <h1 className="text-center">Do you want to clear the list?</h1>
            <div className="flex justify-around pt-4">
              <button onClick={handleYesBtn}
                className="px-10 py-2 bg-blue-500 hover:bg-blue-400  ">Yes</button>
              <button onClick={handleNoBtn}
                className="px-10 py-2 bg-blue-500 hover:bg-blue-400 ">No</button>
            </div>
          </motion.div>}
      </AnimatePresence>
      </>
  )
}
