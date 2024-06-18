import { useEffect, useRef, useState } from "react";
import EmployeeTable from "./EmployeeTbale";
import EmployeeForm from "./EmployeeFrom";
import SearchEmp from "./searchEmp";
import Sort from "./sort";
import profile from "./assets/pro11.png";
import home from "./assets/home2.webp";
import addEmp from "./assets/addEmp2.png";
import st3 from "./assets/st3.png";
import post2 from "./assets/post3.png";
import cer3 from "./assets/certificates3.png";
import media2 from "./assets/media2.webp";
import con2 from "./assets/contact3.png";
import logo from "./assets/empower.webp";


const App = () => {

  const [employees, setEmployees] = useState([
    { id: 1, name: "hk", role: "Developer", experience: "5 ", projectname: "Project A" },
  { id: 2, name: "jk", role: "Designer", experience: "3 ", projectname: "Project B" },
    { id: 1, name: "hk", role: "Developer", experience: "5 ", projectname: "Project A" },
    { id: 2, name: "jk", role: "Designer", experience: "3 ", projectname: "Project B" },
    { id: 3, name: "sk", role: "Manager", experience: "8", projectname: "Project C" },
    { id: 4, name: "rk", role: "Analyst", experience: "6", projectname: "Project D" },
    { id: 5, name: "tk", role: "Tester", experience: "4", projectname: "Project E" },
    { id: 6, name: "ak", role: "Engineer", experience: "7", projectname: "Project F" },
    { id: 7, name: "mk", role: "Architect", experience: "9", projectname: "Project G" },
    { id: 8, name: "pk", role: "Consultant", experience: "10", projectname: "Project H" },
   
 
  ]);

  const [countOf,setCountOf]= useState()
  // const data=fetch("http://localhost:3000/api/data").then(response=> {return response.json()}).then(data=>setEmployees(data) ).catch(err=>console.error('there is problem to fetch data',err))
  const [loading, setLoading] = useState(false);

  const [currentp,setCurrentP]= useState(1);
  const recordPerPage=10;
  
 

    
    useEffect(()=>{
      const fetchData=async()=>{
        setLoading(true); // Start loading
        try{

        const response=await fetch(`http://localhost:3000/api/data?page=${currentp}&recordpage=${recordPerPage}`);
        const data=await response.json();
        console.log(data);
        // eslint-disable-next-line no-debugger
       
          const newData = [...employees, ...data]
          setEmployees(data);

          console.log(employees," data insdie the employee array");
        
        }catch(err){
          console.error('there is problem to fetch data',err)
        }finally {
          setLoading(false); // Stop loading
        }
      }
  fetchData();
},[currentp])


useEffect(()=>{

  async function getAllData(){
    const data= await fetch("http://localhost:3000/countUsers")
    const res=await data.json()
    setCountOf(res);
    console.log(countOf,"from app countfo",res," from res app");
  }
  getAllData()
},[])





  const [currentPage, setCurrentPage] = useState("home");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDelete = async(id) => {
    try {
      await fetch(`http://localhost:3000/api/data/${id}`, {
        method: 'DELETE'
      });
      setEmployees(employees.filter((employee) => employee.id !== id)); 
    }catch(err){
      console.log();
    }

    

    console.log(employees.filter((employee) => employee.id !== id));
    
  };
  
  

  const handleEdit = (id) => {
    const employee = employees.find((emp) => emp.id === id);
    setEditingEmployee(employee);
    setCurrentPage("edit");
  };

  

  const handleSubmit = async (formData) => {
    if (editingEmployee) {
      try {
        const response = await fetch(`http://localhost:3000/api/data/${editingEmployee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const updatedEmployee = await response.json();
        setEmployees(
          employees.map((emp) =>
            emp.id === editingEmployee.id ? updatedEmployee : emp
          )
        );
        setEditingEmployee(null);
      } catch (err) {
        console.error("something went wrong", err);
      }
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    setCurrentPage("home");
  };

  const  handlePost=async(formData)=>{
    try{
      await fetch("http://localhost:3000/api/add",{
        method:"POST",
        headers:{ 
          "Content-type":"application/json",
        },
        body:JSON.stringify(formData),
      })
    }
  catch(err){
    console.error("something went wrong",err)
  }
}
  return (
    <div className="container mx-auto" >
      <nav className="header bg-gradient-to-l from-gray-400 via-gray-900 to-black text-white p-4 h-20 ">
        <h1 className="text-2xl w-2/3 font-bold text-center mt-3 ml-80 text-slate-300 hover:text-3xl hover:text-white ">Employee Profile: Personalized Insights and Records</h1>
        <img className="profile w-10 h-10 rounded-full absolute top-4 right-3" src={profile} alt="" />
      </nav>

      <div className="flex h-full">
        <div className="sidebar flex-none basis-[17%] bg-gradient-to-t from-gray-400 via-gray-900 to-black text-white p-4 w-60  " style={{height:"90vh"}}>
          <div className="logo absolute top-6 left-14"><img src={logo} alt=""/></div>
          <div className="content mt-20 ml-6">
            <h2>
              <button className="w-40 flex hover:rounded-lg hover:bg-gray-900 items-center m-4 text-lg hover:text-black hover:text-xl" onClick={() => setCurrentPage("home")}>
                <img className="homeIcon w-6 h-6 mr-2 " src={home} alt="Home" /> Home
              </button>
            </h2>
            <h2>
              <button className=" w-40 hover:rounded-lg hover:text-black hover:bg-gray-800 flex items-center m-4 text-lg hover:text-xl" onClick={() => setCurrentPage("add")}>
                <img className="empIcon w-6 h-6 mr-2" src={addEmp} alt="Add Employee" /> Add Employee
              </button>
            </h2>
            <h2 className="flex hover:rounded-lg hover:bg-gray-700 items-center m-4 hover:text-gray-950 text-lg hover:text-xl   "><img className="homeIcon w-6 h-6 mr-2" src={st3} alt="Get Started" /> Get Started</h2>
            <h2 className="flex hover:rounded-lg hover:bg-gray-700 items-center m-4 hover:text-gray-950 text-lg hover:text-xl  "><img className="homeIcon w-6 h-6 mr-2" src={post2} alt="Posts" /> Posts</h2>
            <h2 className="flex hover:rounded-lg hover:bg-gray-700 items-center m-4 hover:text-gray-950 text-lg hover:text-xl  "><img className="homeIcon w-6 h-6 mr-2" src={cer3} alt="Certificates" /> Certificates</h2>
            <h2 className="flex hover:rounded-lg hover:bg-gray-700 items-center m-4 hover:text-gray-950 text-lg hover:text-xl  "><img className="homeIcon w-6 h-6 mr-2" src={media2} alt="Media" /> Media</h2>
            <h2 className="flex hover:rounded-lg hover:bg-gray-700 items-center m-4 hover:text-gray-950 text-lg hover:text-xl  "><img className="homeIcon w-6 h-6 mr-2" src={con2} alt="Contact" /> Contact</h2>
          </div>
        </div>

        <div className="flex-none basis-[81%] ml-4">
          {currentPage === "home" && (
            <EmployeeTable employees={employees} onDelete={handleDelete}  onEdit={handleEdit}
            setCurrentP={setCurrentP} currentp={currentp} countOf={countOf} loading={loading}/>
          )}
          {currentPage === "add" && (
            <EmployeeForm
              onSubmit={handleSubmit}
              initialValues={{ name: "", role: "", experience: "", projectname: "" }}
              />
          )}
          {currentPage === "edit" && (
            <EmployeeForm onSubmit={handleSubmit}  initialValues={editingEmployee} />
          )}
          {currentPage === "search" && (
            <SearchEmp employees={employees} onDelete={handleDelete} onEdit={handleEdit} />
          )}
          {currentPage === "sort" && (
            <Sort employees={employees} onDelete={handleDelete} onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
//   function prePage(){
//     if(currentp!==1){
//       setCurrentP(currentp-1)
//   }
// }
//   function changeCurrentPage(id){
//       setCurrentP(id)
//   }

//   function nextPage(){

//     if(currentp !== nPage){
//       setCurrentP(currentp+1)
//   }
// }
};

export default App;
