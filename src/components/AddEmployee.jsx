import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

function AddEmployee() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    const employee = { firstName, lastName, emailId };
    if(id){
        try {
            const response = await EmployeeService.updateEmployee(id,employee);
            console.log(response.data);
            navigate('/employees'); // Use navigate function to navigate to a different route
            } catch (error) {
            console.log(error);
            }
    }
    else{
        try {
        const response = await EmployeeService.createEmployee(employee);
        console.log(response.data);
        navigate('/employees'); // Use navigate function to navigate to a different route
        } catch (error) {
        console.log(error);
        }
    }
  }

  useEffect(() => {
    if (id) {
      EmployeeService.getEmployeeById(id)
        .then((response) => {
            console.log(response)
          if (response) {
            const { firstName, lastName, emailId } = response.data;
            // Check if response is not null or undefined
            setFirstName(firstName || '');
            setLastName(lastName || '');
            setEmailId(emailId || '');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]); // Include id in the dependency array to re-run the effect when it changes

  const title = () => {
    if (id) {
      return <h2 className='text-center'>Update Employee</h2>;
    } else {
      return <h2 className='text-center'>Add Employee</h2>;
    }
  }

  return (
    <div>
      <br />
      <br />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
            {title()}
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name : </label>
                  <input type='text' placeholder='Enter First Name' name='firstName' className='form-control' value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name : </label>
                  <input type='text' placeholder='Enter Last Name' name='lastName' className='form-control' value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Email Id : </label>
                  <input type='text' placeholder='Enter Email Id' name='emailId' className='form-control' value={emailId} onChange={(e) => setEmailId(e.target.value)}></input>
                </div>
                <button className='btn btn-success' onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                {<button className='btn btn-danger md-2' onClick={() => navigate('/employees')}>Cancel</button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee;
