
import { useState,useMemo } from "react";
// import "./table.css";
import sort from "./assets/sortnew.jpg";
import edit from "./assets/editIcon.png";
import del from "./assets/deletei.png";

const Sort = ({ employees, onDelete, onEdit }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });

  const sortedEmployees = useMemo(() => {
    const sortedArray = [...employees].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        // console.log(" from 1 condition",a[sortConfig.key])
        return sortConfig.direction === "ascending" ? -1 : 1;
      } else if (a[sortConfig.key] > b[sortConfig.key]) {
        // console.log("from ", a[sortConfig.key])
        return sortConfig.direction === "ascending" ? 1 : -1;
    }
    // console.log(sortedArray);
      return 0;
    });
    console.log(sortedArray,"soted Array");
    return sortedArray;
  }, [employees, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    console.log(direction+"from request =sort" );
    setSortConfig({ key, direction });
  };

  if (!employees || employees.length === 0) {
    return <h1>Match Not Found</h1>;
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => requestSort("name")}>
              Name <img src={sort} alt="sort icon" />
            </th>
            <th onClick={() => requestSort("role")}>
              Role <img src={sort} alt="sort icon" />
            </th>
            <th onClick={() => requestSort("experience")}>
              Experience <img src={sort} alt="sort icon" />
            </th>
            <th onClick={() => requestSort("projectName")}>
              Project Name <img src={sort} alt="sort icon" />
            </th>
            <th>
              Actions 
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.experience}</td>
              <td>{employee.projectName}</td>
              <td className="btn">
                <img src={edit} alt="" className="edit" onClick={() => onEdit(employee?.id)} />
                <img src={del} alt="" className="del" onClick={() => onDelete(employee?.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sort;
