import { useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from './components/dashboard/Layout';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<BeforeDash />}></Route> */}
        {/* <Route path="/sign-in" element={<SignIn />} /> */}
        {/* <Route path="/sign-up" element={<SignUp />} /> */}
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
