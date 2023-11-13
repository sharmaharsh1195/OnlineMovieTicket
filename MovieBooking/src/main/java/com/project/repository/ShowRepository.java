package com.project.repository;

import com.project.entities.Shows;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShowRepository extends JpaRepository<Shows,Long> {
}
