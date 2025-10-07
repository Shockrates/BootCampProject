import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className='flex flex-col gap-2'>
            <h2>404 Page not found</h2>
            <Link to="/">Go to Profile</Link>
        </div>
    )
}

export default NotFoundPage