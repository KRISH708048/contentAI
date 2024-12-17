import React from 'react'
import Dashboard from './Dashboard.jsx'
import SideNav from './SideNav'
import Header from './Header.jsx'
const Layout = () => {
  return (
    <div className=''>
      <div className='md:w-64 hidden md:block fixed '>
        <SideNav />
      </div>
      <div className='md:ml-64 flex flex-col bg-white'>
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}

export default Layout
