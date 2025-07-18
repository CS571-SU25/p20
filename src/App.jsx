import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter } from 'react-router'

function App() {
return <HashRouter>
  <Routes>
    <Route path = "/about-us"></Route>
    <Route path = "/other-info"></Route>

  </Routes>
</HashRouter>
}

export default App
