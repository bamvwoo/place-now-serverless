import './App.css'
import Aside from './components/Aside'
import Header from './components/Header'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Aside />
        <Home />
      </main>
    </>
  )
}