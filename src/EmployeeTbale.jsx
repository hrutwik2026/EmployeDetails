// import "./table.css";
import sort from "./assets/sortnew.jpg";
import editAni from "./assets/edit5.png";
import delAni from "./assets/deleteIcon.png";
import 'animate.css';
// import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.



import { useState, useMemo, useEffect } from "react";

const EmployeeTable = ({ employees, onDelete, onEdit ,currentp,setCurrentP,countOf,loading}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState('');
  // const [currentp,setCurrentP]= useState(1);
  const [filteredData, setFilteredData] = useState(employees);
  const [experienceFilter, setExperienceFilter] = useState(0);
 
  

  useEffect(() => {
    setFilteredData(employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      employee.experience >= experienceFilter
    ));
  }, [ employees,searchTerm,experienceFilter]);
  useEffect(()=>{
    setFilteredData(employees)},[employees]
  )

  // console.log(employees ,"from table");
  const sortedEmployees = useMemo(() => {
    const sortedArray = [...filteredData].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      const numA = parseFloat(valA);  
      const numB = parseFloat(valB);
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortConfig.direction === "ascending" ? numA - numB : numB - numA;}
        else{
      if (valA < valB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      } else if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }});
    return sortedArray;
  }, [filteredData, sortConfig]);

  const recordPerPage=10;
  const lastIndex=currentp * recordPerPage;
  const firstIndex= lastIndex - recordPerPage;
  // const records= sortedEmployees.slice(firstIndex,lastIndex) || sortedEmployees;
  const records= sortedEmployees
  // eslint-disable-next-line no-debugger
  

  const nPage=Math.ceil( countOf/recordPerPage);
    // const numberOfage= 1+ Math.round(nPage)
    const numbers = Array.from({ length: nPage }, (_, index) => index + 1);

    console.log("number of page",nPage);

  // const numbers=[...Array(nPage+1).keys()].slice(1);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  if (!employees || employees.length === 0  )
     {
    return (<h1>Match Not Found</h1>);
  }
  const handleExperienceChange = (event) => {
    setExperienceFilter(Number(event.target.value));
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  if (sortedEmployees === null) {
    return <h1>Match Not Found</h1>;
  }
  let style;
  // eslint-disable-next-line no-debugger
  // console.log(nextP);
  if(currentp === nPage){
    style=''
  }else{
     style=" w-14 ml-1 hover:bg-blue-700 hover:text-white hover:border border-blue-950 pl-3  rounded-lg";
  }
  let style2;
  if(currentp===1){
    style2=''
  }else{
    style2=" w-16 ml-1 hover:bg-blue-700 hover:text-white hover:border border-blue-950 pl-0  rounded-lg"
  }
  return (
    <>
        <input
          className="serachBar shadow-custom rounded-sm w-54 mt-5 hover:shadow-lg hover:bg-slate-100 hover:border-b border-red-950"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
       <div className="sliderContainer  flex flex-col justify-end items-end  mr-3" style={{marginTop:"-28px"}}  >
        <label className="font-bold" htmlFor="experienceSlider flex">Filter by Experience: {experienceFilter} years</label>
        <input className="w-48"
          id="experienceSlider"
          type="range"
          min="0"
          max="50"
          value={experienceFilter}
          onChange={handleExperienceChange}
        />
      </div>
      {loading && <div className=" border-t-4 border-b-4 border-slate-700 rounded-full w-16 h-16 ml-2 animate-spin"></div>}
      {/* <table className="shadow-custom rounded-lg mt-4 font-sans  justify-center table w-full h-auto border-collapse border border-gray-300 ">
        <thead className="">
          <tr className=" border border-gray-300 bg-gray-200  px-20 py-8 hover:bg-gray-300" >
            <th className="px-8 py-2 flex text-lg " onClick={() => requestSort("name")}>
              Name <img className="h-4 bg-slate-950 ml-3 mt-2 animate-slideIn"  src={sort} alt="sort icon" />
            </th>
            <th className="px-8 py-2  text-lg " onClick={() => requestSort("role")}>
              Role <img className="h-4"  src={sort} alt="sort icon" />
            </th>
            <th className="px-8 py-2 text-lg " onClick={() => requestSort("experience")}>
              Experience <img className="h-4 " src={sort} alt="sort icon" />
            </th>
            <th className="px-8 py-2 " onClick={() => requestSort("projectName")}>
              Project Name <img className="h-4 " src={sort} alt="sort icon" />
            </th>
            <th className="px-8 py-2 text-lg" >
              Actions 
            </th>
          </tr>
        </thead>
        <tbody className="border border-gray-300">
          { records.map((employee) => (
            <tr className="border border-gray-300 hover:bg-gray-200" key={employee.id}>
              <td className="px-6 py-2">{employee.name}</td>
              <td className="px-6 py-2">{employee.role}</td>
              <td className="px-6 py-2">{employee.experience}</td>
              <td className="px-6 py-2">{employee.projectname}</td>
              <td className="btn flex items-center justify-center ">
                <img  src={editAni} alt="" className="edit h-6 px-2  " onClick={() => onEdit(employee.id)} />
                <img src={delAni} alt="" className="del h-6" onClick={() => onDelete(employee.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      
      <table className="shadow-custom rounded-lg mt-4 font-sans justify-center table w-full h-auto border-collapse border border-gray-300">
  <thead>
    <tr className="border border-gray-300 bg-gray-200 px-20 py-8 hover:bg-gray-300 animate__animated animate__fadeIn">
      <th className="px-8 py-2 flex text-lg" onClick={() => requestSort("name")}>
        Name <img className="h-4 bg-slate-950 ml-3 mt-2 animate__animated animate__fadeInRight" src={sort} alt="sort icon" />
      </th>
      <th className="px-8 py-2 text-lg" onClick={() => requestSort("role")}>
        Role <img className="h-4 animate__animated animate__fadeInRight" src={sort} alt="sort icon" />
      </th>
      <th className="px-8 py-2 text-lg" onClick={() => requestSort("experience")}>
        Experience <img className="h-4 animate__animated animate__fadeInRight" src={sort} alt="sort icon" />
      </th>
      <th className="px-8 py-2" onClick={() => requestSort("projectName")}>
        Project Name <img className="h-4 animate__animated animate__fadeInRight" src={sort} alt="sort icon" />
      </th>
      <th className="px-8 py-2 text-lg">Actions</th>
    </tr>
  </thead>
  <tbody className="border border-gray-300">
    {records.map((employee) => (
      <tr className="border border-gray-300 hover:bg-gray-200 animate__animated animate__fadeIn" key={employee.id}>
        <td className="px-6 py-2">{employee.name}</td>
        <td className="px-6 py-2">{employee.role}</td>
        <td className="px-6 py-2">{employee.experience}</td>
        <td className="px-6 py-2">{employee.projectname}</td>
        <td className="btn flex items-center justify-center">
          <img src={editAni} alt="" className="edit h-6 px-2 animate__animated animate__fadeInLeft" onClick={() => onEdit(employee.id)} />
          <img src={delAni} alt="" className="del h-6 animate__animated animate__fadeInLeft" onClick={() => onDelete(employee.id)} />
        </td>
      </tr>
    ))}
  </tbody>
</table>

     <nav className=" ">
      <ul className="flex w-52 mt-6 rounded-2xl shadow-custom justify-center h-7">
            <li className={style2}>
              <a href="#" className="transition-transform duration-300 ease-in-out" onClick={prePage}>{currentp===1?"":<p className="animate-slideIn">prevPage</p>}</a>
            </li>
            {
              numbers.map((n,i)=>(
                
                  <li className=' ' key={i}> 
                    <a href="#" className="p-1 hover:border ml-0 mr-0 hover:text-white hover:bg-blue-700 hover:border-blue-950 h-8 transition-colors duration-300 ease-in-out animate-slideIn" onClick={()=>changeCurrentPage(n)}>{n}</a>
                  </li>
              ))
             
            }
            
            <li className={style}>
              <a href="#" className="transition-transform duration-300 ease-in-out" onClick={nextPage}>{currentp===nPage?'':<p className="animate-slideIn">Next</p>}</a>
              {/* <a href="#" className='w-16 ml-1 hover:bg-blue-700 hover:text-white hover:border border-blue-950 pl-0  rounded-lg' onClick={nextPage}>Next</a> */}
            </li>
      </ul>
     </nav>
    </>
  );
  function prePage(){
    if(currentp!==1){
      setCurrentP(currentp-1)
  }
}
  function changeCurrentPage(id){
      setCurrentP(id)
  }
  function nextPage(){
    
   
    // let a=1;
    //   a++;
    //   pageChange(a)
    if(currentp !== nPage){
      // eslint-disable-next-line no-debugger
      
      setCurrentP(currentp=>currentp+1)

  }
  }
  
};

export default EmployeeTable;
