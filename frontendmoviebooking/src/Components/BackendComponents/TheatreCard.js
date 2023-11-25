import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import SearchBarTheatreComponent from './SearchBarTheatreComponent';
import AddTheatre from './AddTheatre';
import { useNavigate } from 'react-router-dom';

const TheatreCard = () => {
    const [theatrelist, setTheatreList] = useState([]);
    const [isToggle, setToggle] = useState(false);
    const navigate = useNavigate();

    const getAllTheatre = async () => {
        try {
            const theatreListResponse = await axios.get("http://localhost:9090/admin/theatrelist");
            setTheatreList(theatreListResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllTheatre();
    }, [isToggle]);

    const handleTheatreAdded = () => {
        // Function to be executed when a new theatre is added
        // This function triggers the re-render of TheatreCard
        setToggle(!isToggle);
    };

    return (
        <>
            <SearchBarTheatreComponent />
            <Button  variant="outlined" color="primary" onClick={()=>{setToggle(!isToggle)}}>
  Add More theatres
</Button>

<Button  variant="outlined" color="secondary" onClick={()=>{
    navigate("/addmovie")
}} >
  Add New Movies
</Button>
            <div className='flex justify-evenly'>

                <div className='flex-1 px-4 mt-20 ml-5'>
                    <div className="w-full max-w-md p-4 bg-white border border-blue-500 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-xl font-bold leading-none text-blue-500 ">Theatre List</h5>
                        </div>
                        <div className="flow-root">
                            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                {theatrelist.map((theatre) => (
                                    <li className="py-3 sm:py-4" key={theatre.theatreId}>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {/* Add an icon or image here if needed */}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-blue-500 truncate dark:text-black">
                                                    {theatre.theatreName}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                    {theatre.theatreAddress}, {theatre.theatreCity}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-blue-500 dark:text-white">
                                                <Button variant="contained" color="success" onClick={() => navigate(`/addshows/${theatre.theatreId}`)}>
                                                    Add Shows
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
                    {isToggle && <AddTheatre onTheatreAdded={handleTheatreAdded}/>}
                </div>
            </div>
        </>
    );
}

export default TheatreCard;
