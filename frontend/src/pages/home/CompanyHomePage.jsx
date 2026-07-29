import React from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore'

const CompanyHomePage = () => {
    const { user, logout } = useAuthStore();
    console.log("USER >>> ", user);
    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <h1>USER COMPANY</h1>
        </div>
    )
}

export default CompanyHomePage
