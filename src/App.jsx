import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header'
import Footer from "./components/Footer/Footer"
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from "./context/ChatContext";
import Signup from "./pages/Signup";
import Registration from "./pages/Registration";
import Error from './pages/Error';
import Auth from './pages/Auth';
import { WindowProvider } from './context/WindowContext';
import Verification from './pages/Verification';
import PageWrapper from './components/Common/Page/PageWrapper';
import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div id="wrapper">
          <WindowProvider>
            <Header />

            <PageWrapper>
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/auth/:type?" element={ <Auth /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route path="/registration" element={ <PrivateRoute element={ <Registration /> } isVerificationRequired={ true } /> } />
                <Route path="/verification" element={ <PrivateRoute element={ <Verification /> } /> } />
                <Route path="/error/:status?" element={ <Error /> } />
              </Routes>
            </PageWrapper>

            <Footer />
          </WindowProvider>
        </div>
      </ChatProvider>
    </AuthProvider>
  )
}