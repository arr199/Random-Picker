/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useState } from 'react'
// CONSTANTS
import API from './Utils/Constants.js'
// COMPONENTS
import { Header } from './Components/Header.tsx'
import { SpinButton } from './Components/SpinButton.tsx'
import { PickModeMenu } from './Components/PickModeMenu.tsx'
import { ElementsList } from './Components/ElementsList.tsx'
import { ToasterMenu } from './Components/ToasterMenu.tsx'
import { AddItemMenu } from './Components/AddItemsMenu.tsx'
import { ListOptionsMenu } from './Components/ListOprionsMenu.tsx'
import { ClearListContainer } from './Components/ClearListContainer.tsx'
import { WinnerContainer } from './Components/WinnerContainer.tsx'
import { BackGroundColorCheckbox } from './Components/BackGroundColorCheckbox.tsx'

function App (): JSX.Element {
  const [formData, setFormData] = useState<string>('')
  const [list, setList] = useState<List[]>(API.DEFAULT_LIST)
  const [isSpinning, setIsSpinning] = useState<string>('idle')
  const [toaster, setToaster] = useState<Toaster[]>([])
  const [showClearContainer, setShowClearContainer] = useState<boolean>(false)
  const [winner, setWinner] = useState< null | string>(null)
  const [duration, setDuration] = useState<number>(API.DEFAULT_DURATION_VALUE)
  const [selectedMode, setSelectedMode] = useState(API.PICK_MODE_DEFAULT_VALUE)
  const [coloredElements, setColoredElements] = useState(false)

  return (
    <>
      <Header />
      <main style={{ pointerEvents: isSpinning === 'spinning' ? 'none' : 'auto' }} className={' h-screen gap-20  flex my-auto justify-end overflow-hidden  max-h-[100vh] '}>
        {/* ///////////  ELEMENTS LIST AND SPIN BUTTON  /////////// */}
        <section className={`flex   w-full justify-end gap-20 my-auto items-center  ${winner ?? showClearContainer ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <ElementsList list={list} setList={setList} setToaster={setToaster} coloredElements={coloredElements}></ElementsList>
          <SpinButton isSpinning={isSpinning} setIsSpinning={setIsSpinning} list={list} setList={setList} selectedMode={selectedMode}
            duration={duration} setWinner={setWinner} />
        </section>
        {/* ///////////  RIGHT PANEL /////////// */}
        <section className={`sticky  right-0 border-l-2 p-4 pt-4 gap-10 flex flex-col min-w-[350px] border-gray-600 w-full  max-w-[400px]  h-full ml-auto  ${winner ?? showClearContainer ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <AddItemMenu list={list} setList={setList} toaster={toaster} setToaster={setToaster}
            formData={formData} setFormData={setFormData} />
          <ListOptionsMenu setDuration={setDuration} list={list} setList={setList} showClearContainer={showClearContainer} setShowClearContainer={setShowClearContainer}
            setToaster={setToaster}>
            <BackGroundColorCheckbox coloredElements={coloredElements} setColoredElements={setColoredElements}></BackGroundColorCheckbox>
            <PickModeMenu selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
          </ListOptionsMenu>
        </section>
        {/* ////////// ABSOLUTE CONTAINERS BELOW ////// */}
        <ToasterMenu toaster={toaster}></ToasterMenu>
        <ClearListContainer showClearContainer={showClearContainer} setShowClearContainer={setShowClearContainer} setList={setList} setToaster={setToaster} />
        <WinnerContainer winner={winner} setWinner={setWinner} />
      </main>

    </>
  )
}

export default App
