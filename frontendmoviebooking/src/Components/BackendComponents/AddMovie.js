import React, { useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
const AddMovie = ({onMovieAdded}) => {
    const [movieDetails, setMovieDetails] = useState({
        title: "",
        description: "",
        year: "",
        rating: "",
        runtime: "",
        genre: "",
        
    });

    const [posterImage, setPosterImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    const changeHandler = (e) => {
        const value = e.target.value;
        setMovieDetails({ ...movieDetails, [e.target.name]: value });
    }

    const handlePosterImageChange = (e) => {
        setPosterImage(e.target.files[0]);
    }

    const handleBackgroundImageChange = (e) => {
        setBackgroundImage(e.target.files[0]);
    }
    const saveMovie = async () => {
      try {
          const formData = new FormData();
          formData.append("title", movieDetails.title);
          formData.append("description", movieDetails.description);
          formData.append("year", movieDetails.year);
          formData.append("rating", movieDetails.rating);
          formData.append("runtime", movieDetails.runtime);
          formData.append("genre", movieDetails.genre);
          formData.append("posterImage", posterImage);
          formData.append("backgroundImage", backgroundImage);
  
          const response = await axios.post("http://localhost:9090/admin/addmovie", formData);
  
          console.log(response);
  
          if (onMovieAdded) {
              onMovieAdded();
          }
  
          // Reset form fields
          setMovieDetails({
              title: "",
              description: "",
              year: "",
              rating: "",
              runtime: "",
              genre: ""
          });
  
          setPosterImage(null);
          setBackgroundImage(null);
      } catch (error) {
          console.error(error);
      }
  };
  



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
      Movie Name
      </label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Movie Name"
        onChange={(e)=>changeHandler(e)}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
    <div class="mb-5">
      <label
        for="Movie Description"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Movie Description 
      </label>
      <textarea
      rows="5" cols="60"
        name="description"
        id="description"
        onChange={(e)=>changeHandler(e)}
        placeholder="Enter Movie Description"
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>

    <div class="mb-5">
      <label
        for="Movie Release Date"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Enter Release Date
      </label>
      <input
        type="date"
        name="year"
        id="year"
        placeholder=""
        onChange={(e)=>changeHandler(e)}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
    <div class="mb-5">
      <label
        for="Movie Rating"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Enter Rating(A,UA,4+)
      </label>
      <input
        type="text"
        name="rating"
        id="rating"
        placeholder="Enter Rating"
        onChange={(e)=>changeHandler(e)}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>
    
    <div class="mb-5">
      <label
        for="Movie Genre"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Entre Movie Genre
      </label>
      <input
        type="text"
        name="genre"
        id="genre"
        placeholder="Enter Genre"
        onChange={(e)=>changeHandler(e)}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>

    <div class="mb-5">
      <label
        for="Movie Runtime"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Entre Movie Runtime
      </label>
      <input
        type="text"
        name="runtime"
        id="runtime"
        placeholder="Enter Movie Runtime"
        onChange={(e)=>changeHandler(e)}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>

    <div class="mb-5">
      <label
        for="Movie FrontPostr"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Add Movie Front Poster
      </label>
      <input
        type="file"
        name="posterImage"
        id="posterImage"
        placeholder=""
        onChange={handlePosterImageChange}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>

    <div class="mb-5">
      <label
        for="Movie Background Poster"
        class="mb-3 block text-base font-medium  text-gray-900 truncate dark:text-white"
      >
        Add Movie Background Poster
      </label>
      <input
        type="file"
        name="backgroundImage"
        id="backgroundImage"
        placeholder=""
        onChange={handleBackgroundImageChange}
        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
      />
    </div>

    <div>
    <Button variant="contained" color="success" onClick={saveMovie} >
Submit
</Button>
        

    </div>
 </div>
</div>
</div>
</>
  );
}

export default AddMovie;
