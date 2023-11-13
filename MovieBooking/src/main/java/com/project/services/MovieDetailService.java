package com.project.services;

import com.project.entities.Movie_Details;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface MovieDetailService {



    List<Movie_Details> getMovieList();

//  public   void saveMovie(MultipartFile posterImage, String year, String rating, Integer runtime, String genre, MultipartFile backgroundImage, String title, String description) throws IOException;


    public void CreateMovie(Movie_Details details);
    public Movie_Details findByMovieDetailsId(Long id);



}
