
import './App.css'
import FloatingShape from './components/FloatingShape'

import { Routes, Route } from "react-router-dom"
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EmailVerification from './pages/EmailVerification'

function App() {

  return (
    <div className='min-h-screen bg-linear-to-r from-[#351A30] via-[#0D0D17] to-[#0E0E18] flex items-center justify-center relative overflow-hidden'>
      <FloatingShape color="bg-[#171723]" size="w-64 h-64" left="10%" top="-5%" delay={3} />
      <FloatingShape color="bg-purple-300" size="w-48 h-48" left="80%" top="70%" delay={5} />
      <FloatingShape color="bg-[#F1F1F8]" size="w-32 h-32" left="-10%" top="40%" delay={2} />

      <Routes>
        <Route path='/' element={"Home"}></Route>
        <Route path='/signUp' element={<SignupPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/Verify-email' element={<EmailVerification />}></Route>
      </Routes>

    </div>
  )
}

export default App
