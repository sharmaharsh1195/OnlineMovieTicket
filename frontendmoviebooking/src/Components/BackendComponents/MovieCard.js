import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios'
import SearchBarTheatreComponent from './SearchBarTheatreComponent';
import AddMovie from './AddMovie';
import { useNavigate } from 'react-router-dom';

const MovieCard = () => {


    const [movieList,setMovieList]=useState([])
    const [isToggle,setToogle]=useState(false)
    
    const navigate=useNavigate();

    

    const getAllMovies= async()=>{
        try{
            const movielistresponse=await axios.get("http://localhost:9090/admin/movielist")
            setMovieList(movielistresponse.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
       
        getAllMovies();
    },[isToggle])

   const handlerMovieAdded=()=>{
    setToogle(!isToggle);
   }


  return (
    <>

    <SearchBarTheatreComponent />


    <Button  variant="outlined" color="primary" onClick={()=>{setToogle(!isToggle)}}>
  Add More Movies
</Button>



    <div className='flex justify-evenly  '>


    
    <div className='flex-1 px-4 mt-20 ml-5'>


   
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Movie List</h5>
       
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {movieList.map((movie)=>(
                 <li   className="py-3 sm:py-4">
                 <div  className="flex items-center space-x-4">
                     <div className="flex-shrink-0">
                        
                     </div>
                     <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium text-blue-600 truncate text-blue-600">
                            {movie.title}
                         </p>
                         <p className="text-sm text-blue-600 truncate dark:text-blue-300">
                             {movie.rating},
                             {movie.genre}
                         </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                     <Button variant="contained" color="success" onClick={()=>{navigate(`/addcast/${movie.movieDetailId}`)}}>
   Add Cast
 </Button>
                     </div>
                 </div>
             </li>
            ))}
            
        </ul>
   </div>
</div>


</div>
<div className='flex-1'>

{isToggle&&<AddMovie  oneMovieAdded={handlerMovieAdded}/>}
</div>
</div>
</>
  );
}

export default MovieCard;
