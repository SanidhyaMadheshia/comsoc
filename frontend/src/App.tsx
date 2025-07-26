import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import BookingSession from './components/BookingSession'
import { RootLayout } from './components/RootLayout'

function App() {
 const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element = {<RootLayout/>}>
        <Route path ='/booking-session' element = {<BookingSession/>} />
        </Route>
    )
  )

  return ( 
          <RouterProvider router={router} />

)
}

export default App