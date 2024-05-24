import React from 'react'

// Layouts always export some children within them and allows you to put shared UI
const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <main className='auth'>
      {children}
    </main>
  )
}

export default Layout
