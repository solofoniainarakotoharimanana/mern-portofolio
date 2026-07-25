import React, { useState } from 'react'

import { motion } from "framer-motion"
import Input from '../components/Input';
import { Lock, Mail, Loader } from 'lucide-react';

import { NavLink } from "react-router-dom"


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const handleLogIn = (e) => {
        e.preventDefault();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-[550px] w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-xl shadow-lg overflow-hidden'
        >

            <div className="p-8">
                <h2 className='text-2xl font-extrabold mb-6 bg-linear-to-r from-[#B05EE4] to-[#6261D2] text-transparent bg-clip-text uppercase text-center tracking-widest'>welcome back</h2>
                <form onSubmit={handleLogIn}>

                    <Input
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className='flex items-center mb-6'>
                        <NavLink to='/' className='text-sm text-purple-400 hover:underline'>
                            Forgot password?
                        </NavLink>
                    </div>

                    <motion.button className={`mt-5 w-full py-3 px-4 tracking-widest ${isLoading ? '' : 'hover:cursor-pointer'}
                        bg-linear-to-r from-[#F058AC] to-[#9660F5]
                        text-white font-bold rounded-lg shadow-lg
                        hover:from-[#C45FB3] hover:to-[#9165F7]
                        focus:outline-none transition duration-200`}
                        disable={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}>
                        {isLoading ? <Loader className='w-6 h-6 text-center animate-spin mx-auto' /> : 'Log In'}
                    </motion.button>
                </form>
            </div>
            <div className='px-8 py-4 bg-black bg-opacity-50 flex justify-center'>
                <p className='text-sm text-gray-400'>
                    Don't have an account? {" "}
                    <NavLink to="/signup" className="text-blue-500 font-bold hover:text-blue-700 transition duration-200">Sign up</NavLink>
                </p>
            </div>
        </motion.div>
    )
}

export default LoginPage
