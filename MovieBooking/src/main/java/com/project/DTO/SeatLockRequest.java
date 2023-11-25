package com.project.DTO;

public class SeatLockRequest {
    private Long showId;
    private String seatNumber;

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public SeatLockRequest(Long showId, String seatNumber) {
        this.showId = showId;
        this.seatNumber = seatNumber;
    }
}
