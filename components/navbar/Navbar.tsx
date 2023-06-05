import React from 'react'
import Button from '../Button'
const Navbar = () => {
  return (
    <div className="fixed w-full top-0 bg-slate-600 z-[50]">
      <div className=' mx-auto max-w-[1280px] px-2'>
        <div className="flex sm:flex-row flex-col items-center justify-center sm:justify-between gap-1 sm:gap-0  w-full h-[80px]">
            <h1 className="sm:text-[30px] font-bold text-[15px] ">Chào mừng đến với Music share</h1>
          <Button className='text-white px-2 py-1 text-[10px] sm:text-[15px]  bg-gray-400 '>Đăng nhập</Button>
        </div>
      </div>

    </div>
  )
}

export default Navbar
