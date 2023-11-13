package com.project.repository;

import com.project.entities.Movie_Details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface Moviedetailrepository extends JpaRepository<Movie_Details,Long> {

  Optional<Movie_Details> findByTitle(String filename);

  Optional<Movie_Details> findByMovieDetailId(Long id);
}
