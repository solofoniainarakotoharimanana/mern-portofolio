import React from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore'
import RequestCompanyStat from '../../components/request/RequestCompanyStat';


const CompanyHomePage = () => {
    const { user, logout } = useAuthStore();

    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <RequestCompanyStat />
        </div>
    )
}

export default CompanyHomePage
