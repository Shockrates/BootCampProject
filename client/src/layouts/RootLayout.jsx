import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

const RootLayout = () => {
    return (
        <>
            <Outlet />
            <Footer />

        </>
    )
}

export default RootLayout