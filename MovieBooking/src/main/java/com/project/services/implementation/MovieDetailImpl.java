package com.project.services.implementation;

import com.project.Exception.MovieNotFoundException;
import com.project.entities.Movie_Details;
import com.project.repository.Moviedetailrepository;
import com.project.services.ImageUtils;
import com.project.services.MovieDetailService;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class MovieDetailImpl  implements MovieDetailService {

    @Autowired
    private Moviedetailrepository moviedetailrepository;



    @Override
    @Transactional // Add this annotation to handle lazy loading in a transactional context
    public List<Movie_Details> getMovieList() {
        List<Movie_Details> movieList = (List<Movie_Details>) moviedetailrepository.findAll();

        // Initialize related entities explicitly to avoid lazy loading issues
        movieList.forEach(movie -> {
            Hibernate.initialize(movie.getMoviesShows());
            Hibernate.initialize(movie.getMovie_cast());
        });

        return movieList;
    }

    @Override
    public void CreateMovie(Movie_Details details) {
            moviedetailrepository.save(details);
    }



    @Override
    public Movie_Details findByMovieDetailsId(Long id) {
        return moviedetailrepository.findById(id)
                .orElseThrow(() -> new MovieNotFoundException("Movie not found with id: " + id));
    }


}
