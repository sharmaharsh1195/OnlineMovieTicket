
import React, {useEffect, useState} from "react"
import "./details.css"
import { useParams } from "react-router-dom"
import axios from "axios"

const Details = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { movieDetailId } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        console.log("moviedetailfrompara"+movieDetailId)
        axios.get(`http://localhost:9090/admin/movie/${movieDetailId}`)
            .then((res) => {
                setMovie(res.data); // Use res.data instead of moviedetailresponse
                console.log(res.data);
            })
            .catch((error) => {
                console.error("Error fetching movie details:", error);
            });
    };
    
    return (
        <div className="movie">
            <div className="movie__intro">
            {currentMovieDetail && currentMovieDetail.backgroundImage && (
                            <img
                                className="movie__poster"
                                src={`data:image/jpeg;base64,${currentMovieDetail.backgroundImage}`}
                                alt={currentMovieDetail.title}
                            />
                        )}
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                    {currentMovieDetail && currentMovieDetail.posterImage && (
                            <img
                                className="movie__poster"
                                src={`data:image/jpeg;base64,${currentMovieDetail.posterImage}`}
                                alt={currentMovieDetail.title}
                            />
                        )}
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.description : ""}</div>
                       
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.year : ""}</div>
                        
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            
           
        
        </div>
    )

}

export default Details
