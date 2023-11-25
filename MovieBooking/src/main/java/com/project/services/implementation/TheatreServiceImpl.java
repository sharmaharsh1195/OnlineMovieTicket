package com.project.services.implementation;

import com.project.entities.Theatre;
import com.project.repository.TheatreRepository;
import com.project.services.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TheatreServiceImpl implements TheatreService {
    @Autowired
    private TheatreRepository theatreRepository;

    @Override
    public Theatre saveTheatre(Theatre theatre) {
        return    theatreRepository.save(theatre);

    }

    @Override
    public List<Theatre> getTheatrelist() {
      return   theatreRepository.findAll();
    }

    @Override
    public Theatre getTheatre(Long id) {
        return theatreRepository.findById(id).orElse(null);
    }

    @Override
    public List<Theatre> getAllTheatreByMovies(Long movieDetailId) {
//        return theatreRepository.findByMoviesAvailable_MovieDetailId(movieDetailId);

    return theatreRepository.findAll();
    }


}
