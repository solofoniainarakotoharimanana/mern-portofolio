import React from 'react'
import moment from "moment"
import { motion } from "framer-motion"
import { useEffect } from 'react';
import { useState } from 'react';

const UserProjectList = ({ projects, totalPages, fetchProjectsOfUser }) => {
    // console.log("MY PROJECTS >>> ", projects)
    const [page, setPage] = useState(1);
    useEffect(() => {
        fetchProjectsOfUser(page, 1)
    }, [page])

    return (
        <div className='mb-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='container mx-auto px-4 py-8 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-lg'>
                <h1 className='text-white text-center text-4xl tracking-widest mb-5'>MY PROJECTS</h1>
                <div className='grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:place-items-center gap-4 '>
                    {projects && projects.map((p) => {
                        return <div
                            key={p._id}
                            className="max-w-sm rounded overflow-hidden border-1 border-amber-50 shadow-xl">
                            {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
                            <div className="">
                                <div
                                    className="font-bold text-2xl py-4 mb-2 text-center bg-purple-600 text-white
                                 ">{p.title}</div>
                                <div className='flex flex-col mb-4'>
                                    <p className='text-md font-md px-4 text-white'>Description:</p>
                                    <p className="text-gray-200 text-sm font-thin px-4">
                                        {p.description}
                                    </p>
                                </div>
                                <div className='flex flex-col mb-4'>
                                    <p className='text-md font-md px-4 text-white'>Created at:</p>
                                    <p className="text-gray-200 text-sm font-thin px-4">
                                        {/* {moment(p.createAt).fromNow()} */}
                                        {moment(p.createAt).format('MMMM Do YYYY, h:mm:ss a')}
                                    </p>
                                </div>

                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <button className='inline-block
                            bg-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300
                            text-sm font-semibold text-gray-700
                             mr-2 mb-2'>See all</button>
                            </div>
                        </div>
                    })}
                </div>
                {/* PAGINATION */}
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Précédent</button>
                <span>Page {page} sur {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
            </motion.div>


        </div>
    )
}

export default UserProjectList
