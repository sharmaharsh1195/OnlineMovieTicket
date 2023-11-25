import React, { useState } from 'react';

import { Button } from '@mui/material';
import axios from 'axios';




const AddTheatre = ({onTheatreAdded}) => {
    const[theatreDetails,setTheatreDetails]=useState({
        theatreName:"",
        theatreAddress:"",
        theatreCity:"",
        theatreState:""
    });


    const handleChange=(e)=>
    {
        const value=e.target.value;
        setTheatreDetails({...theatreDetails,[e.target.name]:value});
    }



    const saveTheatreDetails=(e)=>
    {
        e.preventDefault();

        const addresponse= axios.post("http://localhost:9090/admin/addtheatre",theatreDetails,{headers: {
          'Content-Type': 'application/json',
        }})
            .then((response)=>{
                console.log(response)
                setTheatreDetails({
                  theatreName: "",
                  theatreAddress: "",
                  theatreCity: "",
                  theatreState: "",
                });
              
                if (onTheatreAdded) {
                  onTheatreAdded();
              }
            })
            .catch((err)=>{
                console.log(err)
            })
            // onTheatreAdded();
    }



  return (
    
<div class="flex items-center justify-center p-12 dark:bg-gray-800 dark:border-gray-700">

  <div class="mx-auto w-full max-w-[550px] pt-20">
    <div>
      <div class="mb-5">
        <label
          for="name"
          class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
        >
        Theatre Name
        </label>
        <input
          type="text"
          name="theatreName"
          id="name"
          value={theatreDetails.theatreName}
          placeholder="Full Name"
          onChange={(e) => handleChange(e)}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="Theatre Address"
          class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
        >
          Theatre Address
        </label>
        <input
          type="text"
          name="theatreAddress"
          id="theatreAddress"
          value={theatreDetails.theatreAddress}
          placeholder="Enter Address"
          onChange={(e) => handleChange(e)}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="Theatre City"
          class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
        >
          Theatre City
        </label>
        <input
          type="text"
          name="theatreCity"
          id="theatreCity"
          value={theatreDetails.theatreCity}
          placeholder="Enter city"
          onChange={(e) => handleChange(e)}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      
      <div class="mb-5">
        <label
          for="Theatre State"
          class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
        >
          Theatre State
        </label>
        <input
          type="text"
          name="theatreState"
          value={theatreDetails.theatreState}
          id="theatreState"
          placeholder="Enter State"
          onChange={(e) => handleChange(e)}
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div>
      <Button variant="contained" color="success" onClick={saveTheatreDetails}>
  Submit
</Button>
          

      </div>
   </div>
  </div>
</div>
  );
}

export default AddTheatre;
