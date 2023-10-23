import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
export function Header (): JSX.Element {
  return (
        <header className="h-16 bg-blue-500 flex justify-center items-center">
            <h1 className="text-3xl text-center flex items-center gap-4">RANDOM PICKER<GiPerspectiveDiceSixFacesRandom className="text-green-400" /> </h1>
        </header>
  )
}
