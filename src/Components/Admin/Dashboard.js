import React, { useContext, useState } from 'react';
import Navbar from '../Navbar';
import { DataContext } from '../DataState';

const Dashboard = () => {
  const { isAdmin, products,fetchData,ServerUrl } = useContext(DataContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEvent = (e) => {
    e.preventDefault();
    // Convert image to base64
    if (!name || !description || !price || !imageFile) {
      alert("Please fill all the details");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      fetch(`${ServerUrl}//api/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,description,price,image:base64String}),
      }).then((res) => res.json()).then((data) => alert(data.msg));
      // AddCourse();
    };
    reader.readAsDataURL(imageFile);
    fetchData();
  };
  const handleUpdate = async(id) => {
    setIsUpdating(true);
    // let url=`${ServerUrl}/api/events/add`;
    // if(isUpdating){
    //   url = `${ServerUrl}/api/events/update`;
    // }
    console.log(`${ServerUrl}/api/product/fetchone`);
    const res = await fetch(`${ServerUrl}/api/product/fetchone`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    })
    const result = await res.json();
    console.log(result);
    setIsUpdating(false);
    fetchData();
  };
  
  const handleDelete = async(id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const res = await fetch(`${ServerUrl}/api/product/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await res.json();
      alert(result.msg);
    }
    fetchData();
  };

  return (
    <>
      <Navbar />
      Admin Dashboard
      <form className='m-5' style={{ border: "1px solid black", borderRadius: "15px", padding: "20px" }}>
        <h3 className='fs-3 text-center font-monospace'>Add a New Course</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Enter the name of the Course</label>
          <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input type="number" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="mb-3">
          <input type="file" accept='image/*' className="form-control" id="photo" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary m-auto d-block" onClick={handleEvent}>
          {isUpdating ? "Update the Course" : "Add New Course"}
        </button>
      </form>
      <div className='d-grid' style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
        {products.length>0?
          products.map((item, index) => (
            <div key={index} className="card m-5">
              <img src={item.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title"><strong>Course name:</strong> {item.course_name}</h5>
                <p className="card-text"><strong>Description:</strong> {item.description}</p>
                <p className="card-text"><strong>Price:</strong> Rs.{item.price}/-</p>
                <button className="btn btn-primary m-1" onClick={() => handleUpdate(item._id)}>Update</button>
                <button className="btn btn-primary m-1" onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            </div>
          ))
          :<h5 className='text-center'>No courses found</h5>
        }
      </div>
    </>
  );
};

export default Dashboard;
