package com.project.services.implementation;

import com.project.entities.Shows;
import com.project.repository.ShowRepository;
import com.project.services.ShowsService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;


import java.util.List;

@Service
public class ShowsServiceImpl implements ShowsService {

    @Autowired
    private ShowRepository showRepository;


    @Override
    public Shows addShow(Shows shows) {
        return showRepository.save(shows);
    }

    @Override
    @Transactional
    public List<Shows> getAllShows(Long movieDetailId) {
//        return showRepository.findByMovieDetail_MovieDetailId(movieDetailId);
        if (movieDetailId != null) {
            return showRepository.findByMovieDetail_MovieDetailId(movieDetailId);
        } else {
            // If not filtering, load all shows
            return showRepository.findAll();
        }
    }




        public Shows getShowDetails(Long showId) {
            return showRepository.findById(showId)
                    .orElseThrow(() -> new CustomRuntimeException("Show not found with id: " + showId));
        }

        // Other service methods...


    @ResponseStatus(HttpStatus.NOT_FOUND)
    class CustomRuntimeException extends RuntimeException {
        public CustomRuntimeException(String message) {
            super(message);
        }
    }
}
