import { BiBookAdd } from 'react-icons/bi'
import { BsEraser } from 'react-icons/bs'
import API from '../Utils/Constants'
import { nanoid } from 'nanoid'

interface Props {
  list: List[]
  setList: React.Dispatch<React.SetStateAction<List[]>>
  toaster: Toaster[]
  setToaster: React.Dispatch<React.SetStateAction<Toaster[]>>
  formData: string
  setFormData: React.Dispatch<React.SetStateAction<string>>
  children?: React.ReactNode | React.ReactNode[]
}

export function AddItemMenu ({ list, setList, toaster, setToaster, formData, setFormData }: Props): JSX.Element {
  // ADD BUTTON
  function handleSubmit (e: React.FormEvent<HTMLFormElement>): any {
    e.preventDefault()
    const randomHexColor = (Math.floor(Math.random() * 15728639) + 1048576).toString(16)

    setList([...list, { text: formData, id: nanoid(), selected: false, background: randomHexColor }])
    const newId = nanoid()
    setToaster([...toaster, { text: formData, id: newId, type: 'add' }])
    const deleteTimer = setTimeout(() => {
      setToaster(old => old.filter(i => i.id !== newId))
    }, API.TOASTER_NOTIFICATION_DURATION_MS)
    return () => { clearTimeout(deleteTimer) }
  }

  // CONTROLL USER INPUT VALUE
  function handleInputChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target
    setFormData(target.value)
  }

  return (
        <form onSubmit={handleSubmit} >
        <h1 className=" text-3xl mb-8  w-full text-blue-400 ">{'<-'}Add items to the list</h1>
        <input onChange={handleInputChange} maxLength={30} value={formData} className="border-blue-300 border-2 outline-none p-4 w-full" placeholder="Add item here"></input>
        <div className="flex  gap-1 mt-4 ">
          <button name="add" disabled={formData === '' || Array.from(formData).every(e => e === ' ')}
          className="w-full px-10 py-2 bg-blue-500  hover:bg-blue-400 disabled:opacity-50 flex items-center relative justify-center gap-2"
          type="submit">Add
            <BiBookAdd className=""></BiBookAdd> </button>
          <button name="clear" disabled={formData.length < 1} onClick={() => { setFormData('') }}
          className="w-full px-10 py-2 bg-blue-500 hover:bg-blue-400 disabled:opacity-50 flex items-center justify-center gap-2"
          type="button" >Clear <BsEraser/>
          </button>
        </div>
      </form>
  )
}
