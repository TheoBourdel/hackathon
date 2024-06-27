import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/header'

export default function Layout() {
  return (
    <>
        <Header />
        <main className='flex-1 p-4 flex flex-col overflow-hidden'>
            <Outlet />
        </main>
    </>
  )
}