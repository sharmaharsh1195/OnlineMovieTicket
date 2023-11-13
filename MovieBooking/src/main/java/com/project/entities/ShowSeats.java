package com.project.entities;

import jakarta.persistence.*;

@Entity
public class ShowSeats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long seatId;

    private boolean isAvailable = false;


    @ManyToOne
    private Shows shows;
}
