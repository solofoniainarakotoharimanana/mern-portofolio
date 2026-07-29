import React from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore';
import UserStatProject from '../../components/project/UserStatProject';
import { useEffect } from 'react';
import { useProjectsStore } from '../../store/projectStore';
import UserProjectList from '../../components/project/UserProjectList';

const UserPage = () => {
    const { user, logout } = useAuthStore();
    const { projects, fetchProjectsOfUser, totalPages } = useProjectsStore()

    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <UserStatProject />
            <UserProjectList projects={projects} totalPages={totalPages} fetchProjectsOfUser={fetchProjectsOfUser} />
        </div>
    )
}

export default UserPage
