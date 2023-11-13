package com.project.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.project.serializer.BlobSerializer;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;

@Entity
@Data
@Setter
@Getter
public class Cast {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
    private Long castId;

    private String castName;

    private String castCharacterName;

    @ManyToOne
    @JoinColumn(name = "movieDetailId")
    @JsonBackReference("movieCasts")
    @JsonProperty("movieDetailId")
    private Movie_Details movie_details;

    @JsonSerialize(using = BlobSerializer.class)
    @Lob
    private Blob castImage;




}
