import { createRoutesFromElements, RouterProvider, createBrowserRouter, Route } from 'react-router-dom'
import App from './App'

export default function Routes (): JSX.Element {
  const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" >
                   <Route index element={<App></App>} ></Route>
                   <Route path='test' element={<h1>test</h1>} ></Route>
        </Route>
  ))
  return <RouterProvider router={router}></RouterProvider>
}
