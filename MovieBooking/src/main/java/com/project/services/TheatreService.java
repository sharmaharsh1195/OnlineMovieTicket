package com.project.services;

import com.project.entities.Theatre;

import java.util.List;
import java.util.Optional;


public interface TheatreService {
    public Theatre saveTheatre(Theatre theatre);


   public List<Theatre> getTheatrelist();


   public Theatre getTheatre(Long id);



   public  List<Theatre> getAllTheatreByMovies(Long movieDetailId);
}
