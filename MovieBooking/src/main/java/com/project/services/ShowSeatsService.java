package com.project.services;

import java.util.List;

public interface ShowSeatsService {
    void bookSeats(Long showId, List<String> selectedSeats);
    void lockSeat(Long showId, String seatNumber);
}
