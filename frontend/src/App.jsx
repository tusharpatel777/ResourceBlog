
import React, { useState, useEffect } from 'react'; // Import useEffect
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UpdateForm from './pages/UpdateForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask,setEditingTask]=useState(null);

  // Function to get blogs
  const getBlogs = async () => {
    try {
      const response = await axios.get("https://resourceblog-1.onrender.com/api/blogs");
      setBlogs(response.data);
      console.log("Blogs fetched:", response.data);
    } catch (error) {
      console.error("Error fetching the blogs:", error); // Use console.error for errors
    }
  };


  // Use useEffect to load blogs when the component mounts
  useEffect(() => {
    getBlogs();
    //  toast.success("Testing Toast!");
  }, []); // Empty array means this runs only once on mount 

  // Function to create a new blog
  const createBlog = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://resourceblog-1.onrender.com/api/blogs", { title, description });
      console.log("Blog created:", response.data);
      toast.success("Blog created successfully!");
      // Clear the form fields
      setTitle('');
      setDescription('');
      // Refresh the blog list to show the new one
      getBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
       toast.error("Failed to create blog.");
    }
  };


  const deleteBlog=async(id)=>{
    try {
     let response=await axios.delete(`https://resourceblog-1.onrender.com/api/blogs/${id}`);
     console.log(response.data);
      toast.success("Blog deleted successfully!");
     getBlogs();

    } catch (error) {
      console.log("error in delting this blog ",error);
       toast.error("Failed to delete blog.");
      
    }
  }

 //update this buddy
  // const updateBlog=async(id,updatedData)=>{
  //   try {
  //     const response=await axios.put(`http://localhost:5000/api/blogs/${id}`,updatedData); //simple req maari hai updae route pe 
  //     console.log(response.data);
  //     setEditingTask(null)
  //     getBlogs();
      
  //   } catch (error) {
  //     console.log("error in updating this blog ",error);
  //   }
  // }

  
  return (
    
    <div className='text-green-500 text-center font-bold p-5'>
      <h1 className='text-center text-3xl mb-4'>Resources</h1>
      
      {/* Form for creating a new blog */}
      <form onSubmit={createBlog} className='flex flex-col p-5 m-5 gap-3 border rounded shadow max-w-lg mx-auto'>
        <h2 className="text-xl">Create a New Blog</h2>
        <input 
          type="text" 
          placeholder='Enter title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className='border p-2 w-full rounded' 
          required
        />
        <textarea 
          placeholder='Enter description' 
          value={description} // FIXED TYPO HERE
          onChange={(e) => setDescription(e.target.value)} 
          className='border p-2 w-full rounded' 
          rows="4"
          required
        />
        <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
          Create Blog
        </button>
      </form>

      <button onClick={getBlogs} className='bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600'>
        Refresh Blogs
      </button>

      {/* Displaying the list of blogs */}

      {/* //api handling  */}
      <div className='space-y-4 max-w-2xl mx-auto'>

         {/* //agar editingtask true hai ti update form ko display kro jisme teen props hai */}
          {editingTask && (
            <UpdateForm 
              blog={editingTask} 
              onCancel={() => setEditingTask(null)} 
              refreshBlogs={getBlogs} 
            />
          )}

        {/* and on Update pe ={updateBlog} call krdiya */}
        {blogs.map((blog) => ( //ye saare blog pakde and ek ek ki fielding baitha di
          // BEST PRACTICE: Use a unique ID from the data as the key
          <div key={blog._id} className='border p-4 rounded shadow text-left'>
            <h2 className="text-2xl">{blog.title}</h2>
            <p className="text-gray-700 font-normal mt-2">{blog.description}</p>
            {/* <button onClick={()=>deleteBlog(blog._id)}>delete that particular blog</button> */}
            <div className='flex p-5 justify-end'>
              <FaEdit  onClick={()=>setEditingTask(blog)} className='w-[20px] h-[50px] mr-4'/>
              <MdDelete onClick={()=>deleteBlog(blog._id)} className='w-[20px] h-[50px] ' />
            {/* <button>edit krne ka</button> */}
            </div>
            
          </div>
        ))}
      </div>
       <ToastContainer position="top-right" autoClose={1000} />
    </div>
   
    
  );
};

export default App;