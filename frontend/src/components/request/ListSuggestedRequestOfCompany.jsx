import React, { useEffect } from 'react'
import RequestItemOfCompany from './RequestItemOfCompany';
import { useRequestStore } from '../../store/requestStore';



const ListRequestOfCompany = ({ requests }) => {
    const { fetchRequestOfCompany } = useRequestStore();

    useEffect(() => {
        fetchRequestOfCompany()
    }, [requests])

    return (
        <div className='grid  lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>

            {requests && requests.map((request) => {
                return <RequestItemOfCompany
                    key={request._id} request={request} />
            })}
        </div>
    )
}

export default ListRequestOfCompany
