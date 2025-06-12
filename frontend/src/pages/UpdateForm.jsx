// import React, { useState, useEffect } from 'react';

// const UpdateForm = ({ blog, onCancel, onUpdate }) => {
//   const [title, setTitle] = useState(blog.title);//pehle se hi fill rehega
//   const [description, setDescription] = useState(blog.description);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(blog._id, { title, description }); //onupdate funtion as parameter pass karliya 
//   };

//   return (
//     <div className="border p-4 rounded shadow max-w-xl mx-auto bg-white">
//       <h2 className="text-xl font-semibold mb-3 text-center">Update Blog</h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter title"
//           className="border p-2 rounded"
//           required
//         />
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Enter description"
//           className="border p-2 rounded"
//           rows="4"
//           required
//         />
//         <div className="flex gap-2 justify-end">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             Update
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateForm;
// UpdateForm.jsx
import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';



//react  toast 

const UpdateForm = ({ blog, onCancel, refreshBlogs }) => {
  const [title, setTitle] = useState(blog.title);
  const [description, setDescription] = useState(blog.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`https://resourceblog-1.onrender.com/api/blogs/${blog._id}`, {
        title,
        description
      });
      console.log("Blog updated:", res.data);
      toast.success("blog updated successfully blog.");

      onCancel();        // hide the form after updating
      refreshBlogs();    // reload all blogs again
    } catch (err) {
      console.log("Error updating blog:", err);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow max-w-xl mx-auto bg-white">
      <h2 className="text-xl font-semibold mb-3 text-center">Update Blog</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        className="border p-2 rounded w-full mb-3"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description"
        className="border p-2 rounded w-full mb-3"
        rows="4"
        required
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </form>
  );
};

export default UpdateForm;
