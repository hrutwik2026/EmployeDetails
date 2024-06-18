// import "./table.css";
import { useState } from "react";
import edit from "./assets/editIcon.png";
import del from "./assets/deletei.png";

const SearchEmp = ({ employees, onDelete, onEdit }) => {
  const [searchData, setSearchData] = useState('');

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };

  const searchEmp = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <>
    {/* <h1>hello</h1>   */}
      <input className="serachBar"
        type="text"
        placeholder="Search by name"
        onChange={handleSearch}
      />
      {searchEmp.length === 0 ? 
        <h1 className="matchnot">Match Not Found</h1>
       : 
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Experience</th>
              <th>Project Name</th>
              <th>Actions</th>
            </tr>   
          </thead>
          <tbody>
            {searchEmp?.map((employee) => (
              <tr key={employee?.id}>
                <td>{employee?.name}</td>
                <td>{employee?.role}</td>
                <td>{employee?.experience}</td>
                <td>{employee?.projectName}</td>
                <td className="btn">
                <img src={edit} alt="edit icon" className="edit" onClick={() => onEdit(employee.id)} />
                <img src={del} alt="delete icon" className="del" onClick={() => onDelete(employee.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default SearchEmp;
