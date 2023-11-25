package com.project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.serializer.BlobSerializer;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Data
@Builder
@Setter
@Getter
//@AllArgsConstructor
//@NoArgsConstructor
public class Movie_Details {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long movieDetailId;

    private String title;

    private String description;

    private String year;

    private String   rating;

    private Integer   runtime;

    private String    genre;
    @JsonSerialize(using = BlobSerializer.class)
   @Lob
    private Blob posterImage;

    @JsonSerialize(using = BlobSerializer.class)
    @Lob
    private Blob  backgroundImage;

    @OneToMany(mappedBy ="movieDetail",cascade = CascadeType.ALL) //onetomany and mapped by this is owning side which has foreign key
//    @JsonManagedReference("movieShows")
//    @JsonIgnoreProperties("movieDetail")
    @JsonIgnore
    private List<Shows> moviesShows=new ArrayList<Shows>();



    @ManyToOne
    @JsonBackReference("theatreMovies")
    private Theatre theatre;



    @OneToMany(mappedBy = "movie_details",cascade = CascadeType.ALL)
    @JsonManagedReference("movieCasts")
    private List<Cast> movie_cast=new ArrayList<>();


    public Movie_Details() {
    }

    public void setTheatre(Theatre theatre) {
        if (Objects.equals(this.theatre, theatre)) {
            return;
        }

        this.theatre = theatre;

        if (theatre != null && !theatre.getMoviesAvailable().contains(this)) {
            theatre.getMoviesAvailable().add(this);
        }
    }

    public Theatre getTheatre() {
        return theatre;
    }

    public Movie_Details(Long movieDetailId, String title, String description, String year, String rating, Integer runtime, String genre, Blob posterImage, Blob backgroundImage, List<Shows> moviesShows, Theatre theatre, List<Cast> movie_cast) {
        this.movieDetailId = movieDetailId;
        this.title = title;
        this.description = description;
        this.year = year;
        this.rating = rating;
        this.runtime = runtime;
        this.genre = genre;
        this.posterImage = posterImage;
        this.backgroundImage = backgroundImage;
        this.moviesShows = moviesShows;
        this.theatre = theatre;
        this.movie_cast = movie_cast;
    }

    public Movie_Details(Long movieDetailId) {
        this.movieDetailId = movieDetailId;
    }


}
