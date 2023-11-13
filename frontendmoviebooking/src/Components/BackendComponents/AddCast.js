import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddCast = () => {

    const [castDetail, setCastDetail] = useState({
        castName: "",
        castCharacterName: ""
    });

    const [castImage, setCastImage] = useState(null);
 

    const changeHandler = (e) => {
        const value = e.target.value;
        setCastDetail({ ...castDetail, [e.target.name]: value });
    }

    const handleCastImage = (e) => {
        setCastImage(e.target.files[0]);
    }


       const{movieDetailId}= useParams();
 

    const saveCast = () => {
        const formData = new FormData();
        formData.append("castName", castDetail.castName);
        formData.append("castCharacterName", castDetail.castCharacterName);
        formData.append("castImage", castImage);
       
        console.log(formData) 

        axios.post(`http://localhost:9090/admin/addcast/${movieDetailId}`, formData)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });

    }



  return (
    <>
    <div class="flex items-center justify-center p-12 dark:bg-gray-800 dark:border-gray-700">
    
    <div class="mx-auto w-full max-w-[550px] pt-20">
      <div>
        <div class="mb-5">
          <label
            for="name"
            class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
          >
          Cast Name
          </label>
          <input
            type="text"
            name="castName"
            id="castName"
            placeholder="Cast Name"
            onChange={(e)=>changeHandler(e)}
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div class="mb-5">
          <label
            for="Movie Description"
            class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
          >
            Cast Character Name 
          </label>
          <textarea
          rows="5" cols="60"
            name="castCharacterName"
            id="castCharacterName"
            onChange={(e)=>changeHandler(e)}
            placeholder="Enter Character Name"
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
    
        
        <div class="mb-5">
          <label
            for="Cast Photo"
            class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
          >
            Add Cast Photo
          </label>
          <input
            type="file"
            name="castImage"
            id="castImage"
            placeholder=""
            onChange={handleCastImage}
            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
    
        
    
        <div>
        <Button variant="contained" color="success" onClick={saveCast} >
    Submit
    </Button>
            
    
        </div>
     </div>
    </div>
    </div>
    </>
  )
}

export default AddCast
