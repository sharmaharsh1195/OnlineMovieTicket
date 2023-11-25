package com.project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long theatreId;
    private String theatreName;
    private String theatreAddress;
    private String theatreCity;
    private String theatreState;

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
//    @JsonManagedReference("theatreShows")
//    @JsonIgnoreProperties("theatre")
    @JsonIgnore
    private List<Shows> showsAvailable = new ArrayList<>();

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
//    @JsonManagedReference("theatreMovies")
    private List<Movie_Details> moviesAvailable = new ArrayList<>();


    public Theatre(Long theatreId, String theatreName, String theatreAddress, String theatreCity, String theatreState, List<Shows> showsAvailable, List<Movie_Details> moviesAvailable) {
        this.theatreId = theatreId;
        this.theatreName = theatreName;
        this.theatreAddress = theatreAddress;
        this.theatreCity = theatreCity;
        this.theatreState = theatreState;
        this.showsAvailable = showsAvailable;
        this.moviesAvailable = moviesAvailable;
    }

    public Theatre() {
    }

    public Theatre(Long theatreId)
    {
        this.theatreId = theatreId;
    }
    public void setMovieDetail(Movie_Details movieDetail) {
        if (movieDetail != null) {
            movieDetail.setTheatre(this);
            if (!moviesAvailable.contains(movieDetail)) {
                moviesAvailable.add(movieDetail);
            }
        }
    }

}
