import React from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore';
import UserStatProject from '../../components/project/UserStatProject';
import { useEffect } from 'react';
import { useProjectsStore } from '../../store/projectStore';
import UserProjectList from '../../components/project/UserProjectList';
import { useState } from 'react';
import { List, Plus } from 'lucide-react';
import NewProject from '../../components/project/NewProject';

const UserPage = () => {
    const { user, logout } = useAuthStore();
    const { projects, project, fetchProjectsOfUser, totalPages, fetchProjectById } = useProjectsStore()
    const [isProjectList, setIsProjectList] = useState(true);
    // console.log("PROJECT >>>> ", project)
    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <UserStatProject />
            <div className='container mx-auto px-4 py-2 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-lg mb-4'>
                {isProjectList ?
                    <div className='mt-4 mb-8 ml-auto'>
                        <button
                            onClick={() => setIsProjectList(false)}
                            className="group relative overflow-hidden rounded-md bg-blue-600 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-blue-700 hover:text-white/70 mb-12">
                            <Plus size={25} className='font-bold' />
                            <span className="relative z-10">New Project</span>
                        </button>
                        <UserProjectList
                            project={project}
                            projects={projects} totalPages={totalPages}
                            fetchProjectsOfUser={fetchProjectsOfUser}
                            fetchProjectById={fetchProjectById} />
                    </div>
                    : <div className='mt-4 mb-8 ml-auto'>
                        <button
                            onClick={() => setIsProjectList(true)}
                            className="group relative overflow-hidden rounded-md bg-green-600 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-green800-700 hover:text-white/70 mb-12">
                            <List size={25} className='font-bold' />
                            <span className="relative z-10">Project List</span>
                        </button>
                        <NewProject />
                    </div>
                }
            </div>


        </div>
    )
}

export default UserPage
