import React from 'react'
import RequestItemAcceptedOfCompany from './RequestItemAcceptedOfCompany'

const ListAcceptedRequest = ({ requests }) => {
    // console.log("REQUESTS ACCEPTED >>> ", requests)
    return (
        <div>
            <div className='grid  lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>

                {requests && requests.map((request) => {
                    return <RequestItemAcceptedOfCompany
                        key={request._id} request={request} />
                })}
            </div>
        </div>
    )
}

export default ListAcceptedRequest
