import animations from '../assets/motions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  toaster: Toaster[]

}

export function ToasterMenu ({ toaster }: Props): JSX.Element {
  return (
        <>    {/* TOASTER MENU */}
        <motion.div className="flex flex-col absolute bottom-4 left-4 gap-4" >
        <AnimatePresence>
          {toaster.length > 0 && toaster.map((e, index) =>
            index < 5
              ? <motion.div
              key={e.id} {...animations.scaleAnimationFromRightBottom(0.5)} className={'  border px-8 py-6 rounded-xl text-[.8rem]  bg-[#242424] border-gray-500  '}
            ><span>{e.type === 'add' ? 'You added ' : 'You removed '}  </span> <span className={e.type === 'add' ? 'text-green-500' : 'text-red-500'}> {e.text}</span>
            </motion.div>
              : ''
          )}
        </AnimatePresence>
      </motion.div>
      </>
  )
}
