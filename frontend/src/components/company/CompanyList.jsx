import React from 'react'
import CompanyItem from './CompanyItem'

const CompanyList = ({ companies, setIdCompanyToRequest }) => {
    return (
        <div className="">
            {companies && companies.map((company) => {
                return <CompanyItem
                    key={company._id}
                    company={company}
                    setIdCompanyToRequest={setIdCompanyToRequest}
                />
            })}
        </div>
    )
}

export default CompanyList
