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
import Auth from './pages/Auth';
import styled from "styled-components";
import { WindowProvider } from './context/WindowContext';

export const ContentWrapper = styled.main`
  display: flex;
  width: 100%;
  height: calc(100% - var(--global-header-height));

  $:has(> aside) {
    flex-direction: row;
  }

  $:not(:has(> aside)) {
    flex-direction: column;
  }

  & > aside {
      width: 30%;
      height: 100%;
  }
  
  & > section {
      width: 100%;
      height: 100%;
  }

  $ > aside + section {
      width: 70%;
      height: 100%;
  }

`;

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <div id="wrapper">
          <WindowProvider>
            <Header />

            <ContentWrapper>
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/auth/:type?" element={ <Auth /> } />
                <Route path="/signup" element={ <Signup /> } />
                <Route path="/registration/:placeId?" element={ <Registration /> } />
                <Route path="/error/:status?" element={ <Error /> } />
              </Routes>
            </ContentWrapper>

            <Footer />
          </WindowProvider>
        </div>
      </ChatProvider>
    </AuthProvider>
  )
}