import API, { randomHexColor } from '../Utils/Constants'
import { BsFillGearFill } from 'react-icons/bs'
import { VscClearAll } from 'react-icons/vsc'
import { BiShuffle, BiSolidColorFill } from 'react-icons/bi'
import { FaSortAlphaUp, FaSortAlphaDown } from 'react-icons/fa'
import { LuClock5 } from 'react-icons/lu'
interface Props {
  children: React.ReactNode | React.ReactNode[]
  setDuration: React.Dispatch<React.SetStateAction<number>>
  list: List[]
  setList: React.Dispatch<React.SetStateAction<List[]>>
  showClearContainer: boolean
  setShowClearContainer: React.Dispatch<React.SetStateAction<boolean>>
  setToaster: React.Dispatch<React.SetStateAction<Toaster[]>>
}
export function ListOptionsMenu ({ children, setDuration, list, setList, setShowClearContainer }: Props): JSX.Element {
  // FORM CLEAR BUTTON //
  function handleClearBtn (): void {
    setShowClearContainer(true)
  }

  // SHUFFLE THE CURRENT LIST
  function handleShuffle (): void {
    const shuffleArray = list
      .map(e => ({ value: e, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((e) => e.value)
    setList(shuffleArray)
  }
  // SORT THE CURRENT LIST INCREASING ORDER
  function handleIncreasingSort (): void {
    const sortedList = [...list].sort((a, b) => a.text.localeCompare(b.text))
    setList(sortedList)
  }
  // SORT THE CURRENT LIST DECREASING ORDER
  function handleDecreasingSort (): void {
    const sortedList = [...list].sort((a, b) => b.text.localeCompare(a.text))
    setList(sortedList)
  }
  function handleChangeColor (): void {
    const newColoredList = [...list].map(e => ({ ...e, background: randomHexColor() }))
    setList(newColoredList)
  }
  console.log(list)
  return (
       <>
       <form onSubmit={(e) => { e.preventDefault() }} >
            <h1 className=" text-3xl  w-full text-blue-400 flex items-center gap-4"><BsFillGearFill></BsFillGearFill>List Options</h1>
            <hr className='mb-6  mt-2 text-blue-400 bg-blue-400 h-1 rounded-lg border-none'></hr>
            <h2 className='text-lg mb-3  text-blue-400 font-bold flex items-center gap-2'><LuClock5/>Pick Duration</h2>
            <input defaultValue={API.DEFAULT_DURATION_VALUE} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDuration(() => {
                return Number(e.target.value)
              })
            }}
                name="duration" className="p-4 border-blue-300 border-2 outline-none w-full" placeholder="Duration (seconds)" type="number" min={0} max={100} required />
            <div className="grid grid-cols-2 gap-1 py-4 place-items-start">

                <button name="sort" disabled={list.length < 1} onClick={handleIncreasingSort} className="w-full px-10 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 flex justify-center items-center gap-2" type="button" >Sort
                    <FaSortAlphaDown></FaSortAlphaDown>
                </button>
                <button name="sort" disabled={list.length < 1} onClick={handleDecreasingSort} className="w-full px-10 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 flex justify-center items-center gap-2" type="button" >Sort
                    <FaSortAlphaUp></FaSortAlphaUp>
                </button>
                <button name="shuffle" disabled={list.length < 1} onClick={handleShuffle} className="w-full px-10 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 flex justify-center items-center gap-2" type="button" >Shuffle
                    <BiShuffle ></BiShuffle>
                </button>
                <button name="random-color" disabled={list.length < 1} onClick={handleChangeColor} className="w-full  py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 flex items-center gap-2 justify-center " type="button" >Change Colors
                    <BiSolidColorFill></BiSolidColorFill>
                </button>
                <button name="clearlist" disabled={list.length < 1} onClick={handleClearBtn} className="w-full px-10 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 flex items-center justify-center gap-2" type="button" >Clear List
                    <VscClearAll></VscClearAll>
                </button>
            </div>

            {/* PICK MODE SELECT BOX */}
            {children}
        </form>
       </>
  )
}
