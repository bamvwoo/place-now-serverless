import { useState } from "react"
import './App.css'
import Aside from './components/Aside/Aside'
import Header from './components/Header'
import Home from './pages/Home'
import Navbar from "./components/Navbar/Navbar"

export default function App() {

  const [mode, setMode] = useState("dark-mode");

  return (
    <>
      <div id="wrapper" className={ mode }>
        <Header mode={ mode }/>
        <main>
          <Aside />
          <Home />
        </main>
        <Navbar />
      </div>
    </>
  )
}