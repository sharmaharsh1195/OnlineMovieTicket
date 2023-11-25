package com.project.repository;

import com.project.entities.Theatre;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TheatreRepository extends JpaRepository<Theatre,Long> {

    public  List<Theatre> findByTheatreName(String theatreName);

    List<Theatre> findByMoviesAvailable_MovieDetailId(Long movieDetailId);
}
