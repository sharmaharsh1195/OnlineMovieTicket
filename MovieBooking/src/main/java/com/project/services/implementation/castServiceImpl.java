package com.project.services.implementation;

import com.project.entities.Cast;
import com.project.entities.Movie_Details;
import com.project.repository.CastRepository;
import com.project.services.CastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
@Service
public class castServiceImpl implements CastService {


    @Autowired
    private CastRepository castRepository;

    @Override
    public void saveCast(Cast cast, Movie_Details movie) throws IOException {


        cast.setMovie_details(movie);
        castRepository.save(cast);
    }
}

