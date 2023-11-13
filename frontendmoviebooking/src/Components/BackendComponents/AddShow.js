    import React, { useEffect, useState } from 'react';
    import { Button } from '@mui/material';
    import axios from 'axios';

    const AddShow = ({theatreId}) => {


    const [movieList, setMovieList] = useState([]);
    const [shows, setShows] = useState({
        movieDetailId:'', 
        showDate:'',
        showStartTiming:'',
        showEndTiming:'',
        theatreId:theatreId
    });

    const getAllMovies = async () => {
        try {
        const movieListResponse = await axios.get("http://localhost:9090/admin/movielist");
        setMovieList(movieListResponse.data);
        } catch (error) {
        console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShows((prevShows) => ({
        ...prevShows,
        [name]: value,
        }));
    };
    

    const saveShow = () => {
        const showData = {
            movieDetailId: Number(shows.movieDetailId), // Convert to number
            showDate: shows.showDate,
            showStartTiming: shows.showStartTiming,
            showEndTiming: shows.showEndTiming,
            theatreId: Number(shows.theatreId),
        };
        console.log(showData)

        const addShowResponse = axios.post("http://localhost:9090/admin/addshow", showData)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    
   

    useEffect(() => {
        getAllMovies();
    }, []);

    return (
        <div class="flex items-center justify-center p-12 dark:bg-gray-800 dark:border-gray-700">
        <div class="mx-auto w-96 max-w-[550px] pt-20">
            <div>
            <div class="mb-5">
                <label
                for="movie"
                class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
                >
                Select Movie
                </label>
                <select
                name="movieDetailId" // Use the appropriate field name for movie ID
                id="movieDetailId"
                value={shows.movieDetailId}
                onChange={(e) => handleChange(e)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                >
                <option value="">Select a movie</option>
                {movieList.map((movie) => (
                    <option key={movie.movieDetailId} value={movie.movieDetailId}>
                    {movie.title}
                    </option>
                ))}
                </select>
            </div>
            <div class="mb-5">
                <label
                for="showDate"
                class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
                >
                Show Date
                </label>
                <input
                type="date"
                name="showDate"
                id="showDate"
                placeholder="Enter Date"
                value={shows.showDate}
                onChange={(e) => handleChange(e)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div class="mb-5">
                <label
                for="showStartTiming"
                class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
                >
                Show Start Time
                </label>
                <input
                type="time"
                name="showStartTiming"
                id="showStartTiming"
                placeholder="Enter Start Timing"
                value={shows.showStartTiming}
                onChange={(e) => handleChange(e)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <div class="mb-5">
                <label
                for="showEndTiming"
                class="mb-3 block text-base font-medium text-gray-900 truncate dark:text-white"
                >
                Show End Time
                </label>
                <input
                type="time"
                name="showEndTiming"
                id="showEndTiming"
                placeholder="Enter End Time"
                value={shows.showEndTiming}
                onChange={(e) => handleChange(e)}
                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
            </div>
            <Button variant="contained" color="success" onClick={saveShow}>
                Submit
            </Button>
            </div>
        </div>
        </div>
    );
    };

    export default AddShow;
