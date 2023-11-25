package com.project.repository;

import com.project.entities.Shows;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowRepository extends JpaRepository<Shows,Long> {
    public List<Shows> findByMovieDetail_MovieDetailId(Long movieDetailId);
}
