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
      updatedPortfolio.is_active = JSON.parse(updatedPortfolio.is_active);
      
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
    <div className="table-container" style={{ overflowX: 'auto' }}>
      <h2 className='font-semibold text-3xl uppercase'> Manage Portfolios</h2>
      <table className="mt-2 border-collapse border border-gray-400 text-black">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Name</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Graduation Year</th>
            <th className="border border-gray-400 px-4 py-2">University</th>
            <th className="border border-gray-400 px-4 py-2">Status</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {portfolios.map(portfolio => (
            <tr key={portfolio.id} className={portfolio.id === editId ? "" : "bg-gray-100"}>
              <td className="border text-blue-500 underline border-gray-400 px-4 py-2">
              <Link to={`/manage-portfolio/${portfolio.id}`}>
                {portfolio.id}
                </Link></td>
              <td>
                {portfolio.id === editId ? (
                  <React.Fragment>
                    <input type='text' className="mb-1" placeholder="first name" value={updatedPortfolio.customer_first_name || portfolio.customer_first_name} name="customer_first_name" onChange={handleInputChange} />
                    <input type='text' placeholder="last name" value={updatedPortfolio.customer_last_name || portfolio.customer_last_name} name="customer_last_name" onChange={handleInputChange} />
                  </React.Fragment>
                ) : (
                  `${portfolio.customer_first_name} ${portfolio.customer_last_name}`
                )}
              </td>
              <td>
                {portfolio.id === editId ? (
                  <input type='text' placeholder='customer@email.com' value={updatedPortfolio.customer_email || portfolio.customer_email} name="customer_email" onChange={handleInputChange} />
                ) : (
                  portfolio.customer_email
                )}
              </td>
              <td>
                {portfolio.id === editId ? (
                  <input type='text' placeholder='2022' value={updatedPortfolio.graduation_year || portfolio.graduation_year} name="graduation_year" onChange={handleInputChange} />
                ) : (
                  portfolio.graduation_year
                )}
              </td>
              <td>
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
              <td>
                {portfolio.id === editId ? (
                  <input type="checkbox" name="is_active" value={updatedPortfolio.is_active || portfolio.is_active} defaultChecked={updatedPortfolio.is_active || portfolio.is_active} onChange={handleInputChange} />
                ) : (
                  portfolio.is_active ? 'Active' : 'Inactive'
                )}
              </td>
              <td>
                {portfolio.id === editId ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : (
                  <React.Fragment>
                    <button  className="bg-slate-400 mr-4" onClick={() => handleEdit(portfolio.id)}>Edit</button>
                    <button className='mr-4' onClick={() => handleDelete(portfolio.id)}>Delete</button>
                  </React.Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortfolioList;
