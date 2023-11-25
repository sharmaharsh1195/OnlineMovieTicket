package com.project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data

public class Shows {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long showId;

    private String showDate;

    private String showStartTiming;

    public Long getShowId() {
        return showId;
    }

    public void setShowId(Long showId) {
        this.showId = showId;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public String getShowStartTiming() {
        return showStartTiming;
    }

    public void setShowStartTiming(String showStartTiming) {
        this.showStartTiming = showStartTiming;
    }

    public String getShowEndTiming() {
        return showEndTiming;
    }

    public void setShowEndTiming(String showEndTiming) {
        this.showEndTiming = showEndTiming;
    }

    public Movie_Details getMovieDetail() {
        return movieDetail;
    }

    public void setMovieDetail(Movie_Details movieDetail) {
        this.movieDetail = movieDetail;
    }

    public Theatre getTheatre() {
        return theatre;
    }

    public void setTheatre(Theatre theatre) {
        this.theatre = theatre;
    }

    public List<ShowSeats> getSeats() {
        return seats;
    }

    public void setSeats(List<ShowSeats> seats) {
        this.seats = seats;
    }

    private String showEndTiming;


    @ManyToOne
    @JoinColumn(name = "movieDetailId")
//    @JsonBackReference("movieShows")
    @JsonProperty("movieDetailId")
//    @JsonIgnore
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "moviesShows"})
    private Movie_Details movieDetail;


    @ManyToOne
    @JoinColumn(name = "theatreId")
//    @JsonBackReference("theatreShows")
    @JsonProperty("theatreId")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "showsAvailable", "moviesAvailable"})
    private Theatre theatre;



    @OneToMany(mappedBy = "shows", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ShowSeats> seats = new ArrayList<>();

    public void initializeSeats() {
        for (int i = 1; i <= 50; i++) {
            ShowSeats seat = new ShowSeats();
            seat.setSeatNumber("Seat " + i);
            seat.setShows(this); // Set the owning side of the relationship
            seats.add(seat);
        }
    }

}
