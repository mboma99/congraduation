import logo from './logo.svg';
import './App.css';
import Login from './form/Login';
import Register from './form/Register';
import RegisterInfo from './form/RegisterInfo';

function App() {
  return (
    <div className="min-h-screen bg-customIndigo flex justify-center items-center font-outfit">
      <div className='py-1 px-1 z-20 w-80'>
        <RegisterInfo/>
      </div>
    
    </div>
  );
}

export default App;
