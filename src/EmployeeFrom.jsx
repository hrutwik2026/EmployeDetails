import { useState, useEffect } from 'react';
// import "./form.css";

const EmployeeForm = ({ onSubmit, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.name.trim() && !formData.role.trim() && !formData.projectname.trim()){
            alert('All field is required')
            return;
        }
        // if(!formData.experience.trim || isNaN(formData.experience)){
        //     alert('Experience should be un number:')
        //     return;
        // }
        onSubmit(formData);
    };

    return (
        <div className='formDiv  shadow-lime-950  '> 
        
        <form onSubmit={handleSubmit} className='form mb-40 w-1/3  mt-36 ml-96 p-6 rounded-lg' style={{boxShadow:" 0px 0px 29px rgba(0, 5, 0, 0.9)"}}>
            <label className='font-bold ml-2'>Name:</label><br/>
            <input className='w-full rounded-md h-8 border border-gray-900 hover:bg-slate-300 m-1' type="text" name="name" value={formData.name} onChange={handleChange} required /><br/>
            <label  className='font-bold ml-2'>Role:</label><br/>
            <input className='w-full rounded-md h-8 border border-gray-900 hover:bg-slate-300 m-1' type="text" name="role" value={formData.role} onChange={handleChange} required /><br/>
            <label  className='font-bold ml-2'>Experience:</label><br/>
            <input className='w-full rounded-md h-8 border border-gray-900 hover:bg-slate-300 m-1' type="text" name="experience" value={formData.experience} onChange={handleChange} required /><br/>
            <label  className='font-bold ml-2'>Project Name:</label><br/>
            <input className='w-full rounded-md h-8 border border-gray-900 hover:bg-slate-300 m-1' type="text" name="projectname" value={formData.projectname} onChange={handleChange} required /><br/>
            <button  className='font-bold w-full text-cyan-500 bg-gray-900 rounded-lg mt-4 h-8 hover:bg-slate-600 hover:text-black'   type="submit">Submit</button>
        </form>
      
        </div>
    );
};

export default EmployeeForm;
