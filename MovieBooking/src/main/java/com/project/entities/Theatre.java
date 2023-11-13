package com.project.entities;

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
@AllArgsConstructor
public class Theatre {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long theatreId;
    private String theatreName;
    private String theatreAddress;
    private String theatreCity;
    private String theatreState;

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
    @JsonManagedReference("theatreShows")
    private List<Shows> shows_available = new ArrayList<>();

    @OneToMany(mappedBy = "theatre", cascade = CascadeType.ALL)
    @JsonManagedReference("theatreMovies")
    private List<Movie_Details> movies_available = new ArrayList<>();


    public Theatre() {
    }

    public Theatre(Long theatreId)
    {
        this.theatreId = theatreId;
    }
    public void setMovieDetail(Movie_Details movieDetail) {
        if (movieDetail != null) {
            movieDetail.setTheatre(this);
            if (!movies_available.contains(movieDetail)) {
                movies_available.add(movieDetail);
            }
        }
    }

}
