import React from 'react'

const DefaultScreen = () => {
  return (
    <div className='w-full h-[100vh] bg-cover bg-[url(../public/images/main-bg.jpg)] bg-no-repeat bg-center'>
      <div className='w-2/4 mx-auto pt-36 flex flex-wrap justify-center'>
        <h1 className='font-semibold text-center text-6xl text-black pb-10 w-full'>Quiz App</h1>
      </div>
    </div>
  )
}

export default DefaultScreen;