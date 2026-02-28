type WrapperProps = {
    children : React.ReactNode
}

import React from 'react'
import Navbar from './Navbar'

const Wrapper = ({children} : WrapperProps) => {
  return (
    <div>
        <Navbar/>
        <div className='px-5 md:px-[10%] mt-8 mb-10'>
            {children}
        </div>
    </div>
  )
}

export default Wrapper