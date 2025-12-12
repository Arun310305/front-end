import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import styles from "./App.module.css";

import Nav from "./Components/Navbar/Nav";
import Profile from "./Components/profilecard/profile";
// import Home from "./Pages/Home";
import Name from "./Pages/Name";
import Projects from "./Pages/Projects";
import Exp from "./Pages/Exp";
import Tools from "./Pages/Tools";
import Blogs from "./Pages/Blogs";
import Admin from "./Pages/Admin";
import BlogDetails from "./Pages/BlogDetails";
import Contact from "./Pages/Contact";
import Resume from "./Pages/Resume";
import AdminLogin from "./Pages/AdminLogin";
import Protected from "./Pages/Protected";


function AppContent() {
  const location = useLocation();

  const isAdminPage = location.pathname === "/Admin";
  

  return (
    <>
      {!isAdminPage && <Nav />}

          <div className={styles.mainContentFlex}>
        <div>
      <Profile  />
      </div>
      <div className={styles.div2}>
      <Name path="/name"/>
      <Projects path="/projects"/>
      <Exp path="/experience" />
      <Tools path="/tools"/>
      <Blogs />
    
      <Routes>
        <Route path="/AdminLogin" element={< AdminLogin/>} />
         <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/Admin" element={<Protected element={<Admin />} />}/>
        <Route path="/resume" element={<Resume />} />

      </Routes>
        <Contact />
      </div>
      
      </div>
      
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;