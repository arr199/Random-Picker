interface Props {
  coloredElements: boolean
  setColoredElements: React.Dispatch<React.SetStateAction<boolean>>

}

export function BackGroundColorCheckbox ({ setColoredElements }: Props): JSX.Element {
  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    const target = e.target
    if (target.checked) {
      setColoredElements(true)
    } else setColoredElements(false)
  }

  return (
        <>
            <div className=" flex items-center gap-2">
                <input onChange={handleChange} className="w-6 h-6" type="checkbox"></input>
                <label className="text-blue-400 font-bold">Background Color</label>
            </div>
        </>
  )
}
