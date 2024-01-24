import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import styles from '@/styles/layout.module.css';
import Footer from '@/components/layouts/footer';
import Sidebar from '@/components/layouts/sidebar';
import Navbar from '@/components/layouts/navbar';
import React, { useEffect, useState } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const [showSidebar, setShowSidebar] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1024) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        {isSidebarVisible && showSidebar && (
          <div
            className={`!h-screen bg-white dark:bg-[#020817] ${styles.sidebarContainer} ${
              isSidebarVisible ? '' : styles.hidden
            }  ${showSidebar ? '' : styles.hidden}`}
          >
            <Sidebar />
          </div>
        )}
        <div
          className={`w-[78%] ${styles.childrenContainer} ${isSidebarVisible ? '' : styles.childrenAnimHidden} ${
            isSidebarVisible ? 'ml-1/5' : ''
          } ${showSidebar ? '' : styles.childrenAnimHidden} p-4`}
        >
          <div className={`lg:!mt-10 mt-5 sm:mr-9 mr-0 ml-5 ${styles.childrenAnim}`}>
            {children}
            {/* <div className="absolute right-0 bottom-0 !justify-end w-4/5">
              <Footer />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
