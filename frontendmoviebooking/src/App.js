
import './App.css';
import AddTheatre from './Components/BackendComponents/AddTheatre';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TheatreCard from './Components/BackendComponents/TheatreCard';
import AddMovie from './Components/BackendComponents/AddMovie';
import MovieCard from './Components/BackendComponents/MovieCard';
import AddShow from './Components/BackendComponents/AddShow';
import ShowCard from './Components/BackendComponents/ShowCard';
import AddCast from './Components/BackendComponents/AddCast';


import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './Components/FrontendComponents/Home/Home';
import Details from './Components/FrontendComponents/DetailPage/Details';
function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

    <Route path='/admin' element={<AddTheatre/>}/>
    <Route path="/addtheatre" element={<TheatreCard/>}/>
    <Route path="/addmovie" element={<MovieCard/>}/>
    <Route path="/addshows/:theatreId" element={<ShowCard/>}/>
    <Route path="/addcast/:movieDetailId" element={<AddCast/>}/>
    <Route path="/details/:movieDetailId" element={<Details/>}/>
    <Route path="/" element={<Home/>}/>

    </Routes>
    
    </BrowserRouter>

    </>
  );
}

export default App;
