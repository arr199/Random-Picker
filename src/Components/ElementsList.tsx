import { motion, AnimatePresence } from 'framer-motion'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { RxCross1 } from 'react-icons/rx'
import animations from '../assets/motions'
import API from '../Utils/Constants'
import { nanoid } from 'nanoid'

interface Props {
  list: List[]
  setList: React.Dispatch<React.SetStateAction<List[]>>
  setToaster: React.Dispatch<React.SetStateAction<Toaster[]>>
  coloredElements: boolean
}

export function ElementsList ({ list, setList, setToaster, coloredElements }: Props): JSX.Element {
  function handleRemoveClick (e: React.MouseEvent<HTMLSpanElement>): void {
    const target = e.currentTarget
    setList([...list].filter(i => i.id !== target.dataset.id))
    const newId = nanoid()
    setToaster(old => ([...old, { text: `${target.textContent}`, id: newId, type: 'remove' }]))
    const timer = setTimeout(() => {
      setToaster(old => old.filter(i => i.id !== newId))

      return () => { clearTimeout(timer) }
    }, API.TOASTER_NOTIFICATION_DURATION_MS)
  }

  function handleHoverOverListElement (e: React.MouseEvent): void {
    const removeIcon = Array.from(document.querySelectorAll('.remove-icon'))
    const target = e.target as HTMLSpanElement

    removeIcon.forEach(e => {
      const element = e as HTMLImageElement
      if (target.dataset.id === element.dataset.id) {
        element.style.display = 'flex'
        element.style.scale = '1.3'
      } else element.style.display = 'none'
    })
  }
  function handleMouseLeaveOnListElement (): void {
    const removeIcon = Array.from(document.querySelectorAll('.remove-icon'))
    removeIcon.forEach(e => {
      const element = e as HTMLImageElement
      element.style.display = 'none'
    })
  }

  return (

          <section className=" p-4  min-w-[400px] h-[80vh] flex flex-col max-w-[600px]  w-full border border-gray-600 ">
              {list.length > 0
                ? <h1 className="text-2xl text-center text-blue-400">You have <span className="text-green-600">{list.length}  </span>  Element{list.length > 1 ? 's' : ''}</h1>
                : <h1 className="text-2xl text-center text-blue-400">List is Empty </h1>}
              <div className="grid  gap-2 px-20 py-4 items-center   overflow-y-auto overflow-x-hidden" >
                  <AnimatePresence >
                      {list.length > 0
                        ? list.map((e) =>
                          // ITEM
                          <motion.span

                              style={ coloredElements ? { background: e.selected ? 'rgb(34 197 94)' : `#${e.background}`, filter: 'contrast(80%) ' } : undefined }
                              key={e.id}
                              onClick={handleRemoveClick}
                              className={`elements-hover  relative text-[15px]  cursor-pointer border border-slate-500 leading-tight py-3 rounded-md pl-4  pr-4 text-start    ${e.selected ? 'bg-green-500 text-black font-bold ' : ''}`}
                              data-id={e.id}
                              onMouseEnter={handleHoverOverListElement}
                              onMouseLeave={handleMouseLeaveOnListElement}

                              {...animations.scaleAnimationRightToLeftExitCenter()}

                          ><p style={{ filter: 'brightness(1) contrast(100%)' }} className="flex justify-between ">{e.text} <RxCross1 data-id={e.id} className="remove-icon hidden" ></RxCross1 > </p>
                              {e.selected &&
                                  // RENDER A DICE NEXT TO THE SELECTED ITEM
                                  <motion.div >
                                      <GiPerspectiveDiceSixFacesRandom className="text-green-300 absolute left-[-50px] top-[3px] w-10 h-10" />
                                  </motion.div>}
                          </motion.span>
                        )
                        : ''}
                  </AnimatePresence>
              </div>

          </section>
  )
}
