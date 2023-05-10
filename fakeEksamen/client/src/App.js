import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './pages/chat'
import Signup from './pages/signup'


export default function App () {
  return(
    <div>
      <BrowserRouter>
        <Routes>
           <Route index element={<Signup  />} />
           <Route path="/signup" element={<Signup  />} />
           <Route path="/chat" element={<Chat  />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}