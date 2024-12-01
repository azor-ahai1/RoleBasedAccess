import './App.css'
import { Footer, Header } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen flex flex-col bg-gradient-primary'>
      <Header />
      <main className='w-full pt-8'> 
        <div className=''>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//     </>
//   )
// }

// export default App
