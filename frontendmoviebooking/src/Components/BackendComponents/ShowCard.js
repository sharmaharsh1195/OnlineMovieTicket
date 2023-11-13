import React, { useEffect, useState } from 'react';
import AddShow from './AddShow';
import { Button } from '@mui/material';
import axios from 'axios'
import SearchBarTheatreComponent from './SearchBarTheatreComponent';
import { useParams } from 'react-router-dom';
const ShowCard = () => {


    const [showList,setShowList]=useState([])
    const [isToggle,setToogle]=useState(false)
    
    const { theatreId } = useParams();

    

    const getAllShows= async()=>{

        try{
            const showlistresponse=await axios.get(`http://localhost:9090/admin/showlist/${theatreId}`)
            console.log(showlistresponse.data)
            setShowList(showlistresponse.data)
        }
        catch(error){
            console.log(error)
        }

       

    }
   



  return (
    <>

    <SearchBarTheatreComponent />


    <Button  variant="outlined" color="primary" onClick={()=>{setToogle(!isToggle)}}>
  Add More Shows
</Button>

<Button variant="contained" color="success" onClick={getAllShows}>
   Get ALl Shows
 </Button>


    <div className='flex justify-evenly  '>


    
    <div className='flex-1 px-4 mt-20 ml-5'>


   
<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Show List</h5>
       
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {showList.map((show)=>(
                 <li   className="py-3 sm:py-4">
                 <div  className="flex items-center space-x-4">
                     <div className="flex-shrink-0">
                        
                     </div>
                     <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {show.showDate}
                         </p>
                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                             {show.showStartTiming},
                             {show.showEndTiming}
                         </p>
                     </div>
                     <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    
 
                     </div>
                 </div>
             </li>
            ))}
            
        </ul>
   </div>
</div>


</div>
<div className='flex-1'>

{isToggle&&<AddShow   theatreId={theatreId}/>}
</div>
</div>
</>
  );
}

export default ShowCard;
