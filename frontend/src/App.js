import './App.css';
import React, { useState } from 'react';
import Login from './components/customer/form/Login';
import Register from './components/customer/form/Register';
import Forgot from './components/customer/form/Forgot';
import RegisterInfo from './components/customer/form/RegisterInfo';
import Footer from './components/navigation/Footer';

function App() {

  const [page, setPage] = useState("login")

  const selectedPage = () => {
    if (page === "login") {
      return <Login setPage={setPage} />
    }
    if (page === "register") {
      return <Register setPage={setPage} />
    }
    if (page === "registerinfo") {
      return <RegisterInfo setPage={setPage} />
    }
    if (page === "forgot") {
      return <Forgot setPage={setPage} />
    }
  }
  return (
    <div className="relative overflow-hidden bg-[#1B223C] font-outfit">
    <div className="flex flex-col max-w-screen-xl mx-auto relative z-10">
      <div className='flex-grow'>
        {selectedPage()}
        
      </div>
      <Footer />
    </div>
  </div>  
  );

}

export default App;
