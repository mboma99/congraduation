import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UniversitySelect from '../UniversitySelect';

const PortfolioList = ({ photographer_id }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditID] = useState('');
  const [updatedPortfolio, setUpdatedPortfolio] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setUpdatedPortfolio((prevPortfolio) => ({ ...prevPortfolio, [name]: newValue }));
  };
  
const handleUniversityChange = (e) => {
  const { value } = e.target;
  setUpdatedPortfolio((prevPorfolio) => ({ ...prevPorfolio, university_id: value }));
};


  const auth_token = localStorage.getItem("auth_token");
  const auth_token_type = localStorage.getItem("auth_token_type");
  const token = auth_token_type + " " + auth_token;

  const options = [
    { value: "", label: "Select University" },
    { value: "1", label: "De Montfort University" },
    { value: "2", label: "Staffordshire University" },
    { value: "3", label: "Nottingham Trent University" },
    { value: "4", label: "Birmingham University" }
]

const getUniversityName = (id) => {
  const selectedOption = options.find(option => option.value === id);
  return selectedOption ? selectedOption.label : "Unknown";
};

  useEffect(() => {
    axios
      .get(`http://localhost:8000/portfolio/all_portfolios/${photographer_id}`, {
        headers: { Authorization: token },
        photographer_id: photographer_id
      })
      .then((response) => {
        setPortfolios(response.data.result);
      })
      .catch((error) => {
        console.error('Error fetching portfolios:', error);
        setError('Error: Portfolios not found for the specified photographer.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const handleEdit = (id) => {
    setEditID(id)
  }

  const handleUpdate = () => {
    console.log(updatedPortfolio);
    if (Object.keys(updatedPortfolio).length !== 0) {
      if (updatedPortfolio.graduation_year) {
        updatedPortfolio.graduation_year = parseInt(updatedPortfolio.graduation_year);
      }
      if (updatedPortfolio.is_active){
        updatedPortfolio.is_active = JSON.parse(updatedPortfolio.is_active);
      }
      
      axios
        .put(`http://localhost:8000/portfolio/update_portfolio/${editId}`, updatedPortfolio, {
          headers: { Authorization: token },
        })
        .then((response) => {
          //reload the page
          window.location.reload();
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };



  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this portfolio?");
    if (isConfirmed) {
      axios.delete(`http://localhost:8000/portfolio/delete_portfolio/${id}`, {
        headers: { Authorization: token },
      })
        .then((response) => {
          setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <><h2 className='font-semibold text-xl md:text-3xl uppercase'> Manage Portfolios</h2>
    <div className="overflow-auto rounded-xl mt-5">
      <table className="border-collapse text-black pointer">
        <thead>
          <tr className=" bg-gray-300 border-b-2 border-gray-400">
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">ID</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">Name</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">Email</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">Graduation Year</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">Actions</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">University</th>
            <th className="border-gray-400 pl-2 pr-3 md:p-4 md:w-full">Status</th>
          </tr>
        </thead>
        <tbody className=' divide-y'>
          {portfolios.map(portfolio => (
            <tr key={portfolio.id} className={portfolio.id === editId ? "bg-[#d8c9c9] text-sm text-gray-800" : "px-10 py-10 text-sm text-gray-800 bg-gray-100"}>
              <td className=" text-blue-500 font-semibold hover:underline border-gray-400 px-4 py-2">
              <Link to={`/manage-portfolio/${portfolio.id}`}>
                {portfolio.id}
                </Link></td>
              <td className='p-3 whitespace-nowrap'>
                {portfolio.id === editId ? (
                  <React.Fragment>
                    <input  type='text' className="mb-2 pl-1" placeholder="first name" value={updatedPortfolio.customer_first_name || portfolio.customer_first_name} name="customer_first_name" onChange={handleInputChange} />
                    <input className="pl-1" type='text' placeholder="last name" value={updatedPortfolio.customer_last_name || portfolio.customer_last_name} name="customer_last_name" onChange={handleInputChange} />
                  </React.Fragment>
                ) : (
                  `${portfolio.customer_first_name} ${portfolio.customer_last_name}`
                )}
              </td>
              <td className="whitespace-nowrap pl-3 pr-3">
                {portfolio.id === editId ? (
                  <input className="pl-1" type='text' placeholder='customer@email.com' value={updatedPortfolio.customer_email || portfolio.customer_email} name="customer_email" onChange={handleInputChange} />
                ) : (
                  portfolio.customer_email
                )}
              </td>
              <td className='border-gray-400'>
                {portfolio.id === editId ? (
                  <input className="pl-1" type='text' placeholder='2022' value={updatedPortfolio.graduation_year || portfolio.graduation_year} name="graduation_year" onChange={handleInputChange} />
                ) : (
                  portfolio.graduation_year
                )}
              </td>
              <td className="whitespace-nowrap pl-3 pr-3">
                {portfolio.id === editId ? (
                  <select className=' mb-4 block text-sm py-3 px-3 rounded-3xl w-full border-r-8 border-transparent outline-none focus:ring focus:outline-none'
                  value={updatedPortfolio.university_id}
                  onChange={handleUniversityChange}>
                  {options.map((data) => {
                      if (data.value === "") {
                          return (
                              <option key={data.label} value={data.value} disabled>
                                  {data.label}
                              </option>
                          );
                      } else {
                          return (
                              <option key={data.label} value={data.value}>
                                  {data.label}
                              </option>
                          );
                      }
                  })}
              </select>
                ) : (
                  getUniversityName(portfolio.university_id)
                )}
              </td>
              <td  className="whitespace-nowrap">
                <span className={`bg-opacity-50 rounded-2xl tracking-wider p-1.5 uppercase text-xs cursor-default ${portfolio.is_active ? "bg-green-500" : "bg-yellow-200"}`} >
                {portfolio.id === editId ? (
                  <input type="checkbox" name="is_active" value={updatedPortfolio.is_active || portfolio.is_active} defaultChecked={updatedPortfolio.is_active || portfolio.is_active} onChange={handleInputChange} />
                ) : (
                  portfolio.is_active ? 'Active' : 'Inactive'
                )}
                </span>
              </td>
              <td className="pl-2.5 whitespace-nowrap">
                {portfolio.id === editId ? (
                  <button className="hover:font-bold transition" onClick={handleUpdate}>Update</button>
                ) : (
                  <React.Fragment>
                    <button  className="text-blue-500 hover:font-bold mr-4" onClick={() => handleEdit(portfolio.id)}>Edit</button>
                    <button className='text-red-500 hover:font-bold mr-4' onClick={() => handleDelete(portfolio.id)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default PortfolioList;
