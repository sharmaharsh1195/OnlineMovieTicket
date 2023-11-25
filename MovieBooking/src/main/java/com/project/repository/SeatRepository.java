package com.project.repository;

import com.project.entities.ShowSeats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SeatRepository extends JpaRepository<ShowSeats, Long> {

    List<ShowSeats> findByshows_showId(long id);

    List<ShowSeats> findByshows_showIdAndIsAvailableTrue(long id);

    List<ShowSeats> findByshows_showIdAndIsLockedTrue(long id);

    ShowSeats findByshows_showIdAndSeatNumber(long id, String seatNumber);


    // Change this query
    @Query("SELECT s FROM ShowSeats s WHERE s.isLocked = true")
    List<ShowSeats> findLockedSeats();

}
