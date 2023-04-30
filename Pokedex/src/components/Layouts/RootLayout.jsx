import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Global/Footer'
import Navmenu from '../Global/Navmenu'

function RootLayout() {
  return (
      <>
      <header> 
          <nav> 
    <Navmenu />
    </nav>
    </header>

<main>
    <Outlet />
    <Footer />
</main>
    </>
  )
}

export default RootLayout