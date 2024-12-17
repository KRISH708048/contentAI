import React from 'react'
import UsageLimit from '../pages/UsageLimit'
import Hello from '../pages/Hello'
import SearchSection from '../pages/SearchSection'

const Header = () => {
  return (
    <div className=' w-full md:h-16 p-2 gap-2 sm:justify-center md:flex lg:flex items-center md:justify-between lg:justify-between border-b-2'>
      <UsageLimit />
      {/* <SearchSection /> */}
      <Hello />
    </div>
  )
}

export default Header
