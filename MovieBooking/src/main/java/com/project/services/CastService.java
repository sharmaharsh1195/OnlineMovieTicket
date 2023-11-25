package com.project.services;

import com.project.entities.Cast;
import com.project.entities.Movie_Details;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CastService {

    public void saveCast(Cast cast, Movie_Details movie) throws IOException;
}

