import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return <div className='w-full flex items-center mt-2 min:h-screen'>
    <div className="flex bg-blue-500">

    </div>
    <div className="flex flex-col items-center">

    </div>
    <main className="flex items-center justify-center w-full px-4 py-6 sm:px-6 lg:px-8 m-4 bg-yellow-400">
        <Outlet/>
    </main>
  </div>
}

export default AdminLayout