import React, { useEffect, useState } from 'react'
import EmployeeService from '../services/EmployeeService';

export default function ListEmployee() {
    const [employees, setEmployees ] = useState([]);

    const getAllEmployee = ()=>{
        EmployeeService.getAllEmployee().then((response)=>{
            setEmployees(response.data);
            console.log(response.data);
          }).catch(error=>{
            console.log(error)
          })
    }
    useEffect( () => {
      getAllEmployee()
    }, [])
    const deleteEmployee = (id)=>{
        EmployeeService.deleteEmployee(id).then((response)=>{
            console.log(response.data);
            getAllEmployee();
        }).catch(error=>{
            console.log(error);
        })
    }
    
  return (
    <div className='container'>
       <h2 className="text-center">Employee List</h2>
       <a href='/add-employee' className='btn btn-primary mb-2'>Add Employee</a>
       <div className='row'>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                    
                </tr>
            </thead>
            <tbody>
                {employees.map(employee=>(
                    <tr key={employee._id}>
                    <td>{employee._id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.emailId}</td>
                        <td>
                        <a href={`/edit-employee/${employee._id}`} className='btn btn-info pl-3'>Update</a>
                        <span className="ml-2 pl-2"></span> 
                        <button className='btn btn-danger pl-3' onClick={() => deleteEmployee(employee.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
       </div>
    </div>
  )
}
