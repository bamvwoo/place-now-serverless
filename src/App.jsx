import { useState } from "react"
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from "./context/ChatContext";

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div id="wrapper">
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <Footer />
        </div>
      </ChatProvider>
    </AuthProvider>
  )
}