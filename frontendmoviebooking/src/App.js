
import AddTheatre from './Components/BackendComponents/AddTheatre';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TheatreCard from './Components/BackendComponents/TheatreCard';
import AddMovie from './Components/BackendComponents/AddMovie';
import MovieCard from './Components/BackendComponents/MovieCard';
import AddShow from './Components/BackendComponents/AddShow';
import ShowCard from './Components/BackendComponents/ShowCard';
import AddCast from './Components/BackendComponents/AddCast';
import SignUp from './Components/SignUp';
import OrderSummary from './Components/FrontendComponents/OrderSummary/OrderSummary';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './Components/FrontendComponents/Home/Home';
import Details from './Components/FrontendComponents/Home/DetailPage.js/Details';
import TheatreList from './Components/FrontendComponents/TheatrePage/TheatreList';
import Login from './Components/SignIn';
import  Navbar from './Components/FrontendComponents/NavBar/Navbar';
import { createContext, useReducer } from 'react';
import SeatBook from './Components/FrontendComponents/SeatBook/SeatBook';
import Payment from './Components/FrontendComponents/Payment/Payment';
import Upload from './Components/FrontendComponents/Upload';



export const UserContext=createContext();


const Routing=()=>{
  return(<BrowserRouter>
    <Routes>

    <Route path='/admin' element={<AddTheatre/>}/>
    <Route path="/addtheatre" element={<TheatreCard/>}/>
    <Route path="/addmovie" element={<MovieCard/>}/>
    <Route path="/addshows/:theatreId" element={<ShowCard/>}/>
    <Route path="/addcast/:movieDetailId" element={<AddCast/>}/>
    <Route path="/details/:movieDetailId" element={<Details/>}/>
    <Route path="/theatre/:movieDetailId" element={<TheatreList/>}/>
    <Route path="/seatBook/:showId" element={<SeatBook/>}/>
    <Route path="/registeration" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<Login/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/ordersummary/:showId" element={<OrderSummary />} />
    <Route path="/payment/:showId" element={<Payment />} />
    <Route path="/uploadFile" element={<Upload />} />
    


    </Routes>
    
    </BrowserRouter>
)
}


function App() {
  
  return (
    <>
    {/* <UserContext.Provider value={{state,logindispatch}}> */}
    <Navbar/>

    <Routing/>
    {/* </UserContext.Provider> */}
    
    </>
  );
}

export default App;
