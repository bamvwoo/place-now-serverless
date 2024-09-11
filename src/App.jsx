import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from "./context/ChatContext";
import Signup from "./pages/Signup";
import Registration from "./pages/Registration";
import Error from './pages/Error';
import Login from './pages/Login';
import Auth from './pages/Auth';

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div id="wrapper">
          <Header />

          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/auth/:type?" element={ <Auth /> } />
            <Route path="/signup" element={ <Signup /> } />
            <Route path="/registration/:placeId?" element={ <Registration /> } />
            <Route path="/error/:status?" element={ <Error /> } />
          </Routes>

          <Footer />
        </div>
      </ChatProvider>
    </AuthProvider>
  )
}