import { createContext, useContext, useRef, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Common/Sidebar/Sidebar';
import Modal from '../components/Common/Modal/Modal';

export const SidebarContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const WindowContext = createContext();

export function WindowProvider({ children }) {

  /* Sidebar */

  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  const [ isSidebarClosing, setIsSidebarClosing ] = useState(false);
  const [ sidebarContent, setSidebarContent ] = useState(null);
  const sidebarRef = useRef(null);

  const openSidebar = (content) => {
    setIsSidebarOpen(true);
    setSidebarContent(content);
  };

  const closeSidebar = () => {
    setIsSidebarClosing(true);
    setTimeout(() => {
      setIsSidebarOpen(false);
      setIsSidebarClosing(false);
      setSidebarContent(null);
    }, 700);
  };

  const toggleSidebar = (content) => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar(content);
    }
  };

  const loadSidebar = (content) => {
    if (isSidebarOpen) {
      setSidebarContent(content);
    }
  };
  
  /* Modal */
  
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ isModalClosing, setIsModalClosing ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState(null);
  const [ modalContent, setModalContent ] = useState(null);
  const modalRef = useRef(null);

  const openModal = (title, content) => {
    setIsModalOpen(true);
    setModalTitle(title);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
      setModalContent(null);
    }, 700);
  };

  return (
    <WindowContext.Provider value={{ openSidebar, closeSidebar, toggleSidebar, loadSidebar, openModal, closeModal }}>
      { children }

      { 
        isSidebarOpen && 
        <Sidebar ref={ sidebarRef } isClosing={ isSidebarClosing } close={ closeSidebar }>
          { sidebarContent }
        </Sidebar>
      }

      {
        isModalOpen && 
        <Modal ref={ modalRef } isClosing={ isModalClosing } close={ closeModal } title={ modalTitle }>
          { modalContent }
        </Modal>
      }
    </WindowContext.Provider>
  );
}

export function useWindow() {
  return useContext(WindowContext);
}