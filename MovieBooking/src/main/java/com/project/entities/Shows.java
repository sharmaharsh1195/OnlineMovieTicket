package com.project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Getter
@Setter
public class Shows {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long showId;

    private String showDate;

    private String showStartTiming;


    private String showEndTiming;


    @ManyToOne
    @JoinColumn(name = "movieDetailId")
    @JsonBackReference("movieShows")
    @JsonProperty("movieDetailId")
    private Movie_Details movieDetail;


    @ManyToOne
    @JoinColumn(name = "theatreId")
    @JsonBackReference("theatreShows")
    @JsonProperty("theatreId")
    private Theatre theatre;



    @OneToMany(mappedBy ="shows",cascade = CascadeType.ALL)
    private List<ShowSeats>seats=new ArrayList<>();




}
