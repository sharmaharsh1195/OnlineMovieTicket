package com.project.DTO;

import java.util.List;

import java.util.List;

public class SeatBookingRequest {
    private Long showId;
    private List<String> selectedSeats;

    // Getters and setters

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public List<String> getSelectedSeats() {
        return selectedSeats;
    }

    public void setSelectedSeats(List<String> selectedSeats) {
        this.selectedSeats = selectedSeats;
    }
}

