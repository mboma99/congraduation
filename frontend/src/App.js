import './App.css';
import React, { useState, useEffect, Component } from 'react';
import Login from './components/customer/form/Login';
import CusotmerAccount from './components/customer/CustomerAccount';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/navigation/Footer';
import Background from './backgrounds/Background';


function App() {
  const [token, setToken] = useState(null);
  let backgroundSelection = '1B223C';
  useEffect(() => {
    const auth = localStorage.getItem("auth_token")
    setToken(auth)
  }, [token])
  let Component
  switch (window.location.pathname) {
    case "/":
      Component = <Home />
      break
    case "/about":
      Component = <About />
      break
    case "/account":
      if (token === null ) {
        Component = <Login />
      } else {
        Component = <CusotmerAccount />
      }
  }

  if (Component.type === Home) {
    backgroundSelection = 'D9D9D9';
  }

  return (
    <div className={`relative overflow-hidden bg-[#${backgroundSelection}] font-outfit`}>
      <div className="flex flex-col max-w-screen-xl mx-auto relative z-10">
        <div className='flex-grow'>
          {Component}
        </div>
        <Footer />
      </div>
    </div>
  )

}

export default App;
