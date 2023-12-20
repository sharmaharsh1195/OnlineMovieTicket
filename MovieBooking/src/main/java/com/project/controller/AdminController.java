package com.project.controller;


import com.project.DTO.SeatBookingRequest;
import com.project.DTO.SeatLockRequest;
import com.project.entities.Cast;
import com.project.entities.Movie_Details;
import com.project.entities.Shows;
import com.project.entities.Theatre;
import com.project.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.sql.Blob;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")

public class AdminController {

    @Autowired
    private TheatreService theatreService;

    @Autowired
    private MovieDetailService movieService;
@Autowired
    private CastService castService;
    @Autowired
    private ShowsService showsService;

    @Autowired
    private ShowSeatsService seatsService;
    //theatre admin side controller
    @PostMapping("/addtheatre")
    public ResponseEntity<?> saveTheatre(@RequestBody Theatre theatre) {

        Theatre local = theatreService.saveTheatre(theatre);
        if (local != null) {
           return ResponseEntity.ok("theatre is added");
        }
        return ResponseEntity.badRequest().body("theatre not added");
    }


   @GetMapping("/theatrelist")
   @ResponseBody
    public List<Theatre> getTheatrelist()
   {
       return theatreService.getTheatrelist();
   }



//end of theatre side controller

 //************************************************************************************************

 //************************************************************************************************

 //movie side controller


        @PostMapping("/addmovie")
        public ResponseEntity<?> saveMovie(
                @RequestParam("posterImage") MultipartFile posterImage,
                @RequestParam("backgroundImage") MultipartFile backgroundImage,
                @RequestParam("title") String title,
                @RequestParam("description") String description,
                @RequestParam("year") String year, // Change the parameter type to String
                @RequestParam("rating") String rating,
                @RequestParam("runtime") Integer runtime,
                @RequestParam("genre") String genre
        ) throws SQLException {
            try {
                byte[] bytes = posterImage.getBytes();
                Blob posterblob = new javax.sql.rowset.serial.SerialBlob(bytes);

                byte[] bytes2 = backgroundImage.getBytes();
                Blob backgroundblob = new javax.sql.rowset.serial.SerialBlob(bytes2);
                Movie_Details movieDetails = new Movie_Details();
                movieDetails.setPosterImage(posterblob);
                movieDetails.setBackgroundImage(backgroundblob);
                movieDetails.setTitle(title);
                movieDetails.setDescription(description);
                movieDetails.setYear(year);
                movieDetails.setRating(rating);
                movieDetails.setRuntime(runtime);
                movieDetails.setGenre(genre);

               movieService.CreateMovie(movieDetails);
//                movieService.saveMovie(posterImage, year, rating, runtime, genre,backgroundImage,title,description);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            return ResponseEntity.ok("movie is added");
        }


        @GetMapping("/movielist")
 @ResponseBody
 public List<Movie_Details> getMovieList()
 {
     return movieService.getMovieList();
 }


    @GetMapping("/movie/{id}")
    @ResponseBody
    public Movie_Details getMovieById(@PathVariable("id") Long id) throws IOException {
        return movieService.findByMovieDetailsId(id);
    }
    //show side




    @PostMapping("/addshow")
    public ResponseEntity<?> addShow(@RequestBody Shows shows) {
        System.out.println("Received shows: " + shows);

        Movie_Details localmovie = shows.getMovieDetail();
        System.out.println("Movie_Details: " + localmovie);


        if (localmovie != null) {
            Theatre localtheater = shows.getTheatre();
            System.out.println("Theatre: " + localtheater);

            Shows newshow = new Shows();
            newshow.setMovieDetail(localmovie);
            newshow.setTheatre(localtheater);
            newshow.setShowDate(shows.getShowDate());
            newshow.setShowStartTiming(shows.getShowStartTiming());
            newshow.setShowEndTiming(shows.getShowEndTiming());

            // Initialize seats for the new show
            newshow.initializeSeats();

            // Save the show after initializing seats
            Shows local = showsService.addShow(newshow);

            if (local != null) {
                return ResponseEntity.ok("Show is added");
            }

            return ResponseEntity.badRequest().body("Show not added");
        }

        return ResponseEntity.badRequest().body("Invalid Movie_Details in the request");
    }



//getting seats
@GetMapping("/showdetail/{showId}")
public ResponseEntity<?> getShowDetails(@PathVariable Long showId) {
    try {
        Shows show = showsService.getShowDetails(showId);
        return ResponseEntity.ok(show);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching show details");
    }
}

    //addcast controller side

    @PostMapping("/addcast/{movieDetailId}")
    public void  addCast(@PathVariable("movieDetailId") Long movieDetailId,
                                     @RequestParam("castName") String castName,
                                      @RequestParam("castCharacterName") String castCharacterName,
                                     @RequestParam("castImage") MultipartFile castImage
                                     ) throws SQLException, IOException {
        byte[] bytes = castImage.getBytes();
        Blob castblob = new javax.sql.rowset.serial.SerialBlob(bytes);

        Cast cast=new Cast();
        cast.setCastImage(castblob);
        cast.setCastName(castName);
        cast.setCastCharacterName(castCharacterName);


            Movie_Details localmovie = movieService.findByMovieDetailsId(movieDetailId);

            System.out.println("in controller"+castName+"    "+castCharacterName);


        try {
            castService.saveCast(cast, localmovie);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }




    @GetMapping("/shows/{movieDetailId}")
    @ResponseBody
    public List<Shows> getAllTheatreByMovies(@PathVariable("movieDetailId") Long movieDetailId) {
        return showsService.getAllShows(movieDetailId);
    }



    @PostMapping("/seatbooking")
    @ResponseBody
    public void bookSelectedSeats(@RequestBody SeatBookingRequest seatBookingRequest) {
        // Extract showId and selectedSeats from the request
        Long showId = seatBookingRequest.getShowId();
        List<String> selectedSeats = seatBookingRequest.getSelectedSeats();

        // Now you can use showId and selectedSeats in your business logic
        // ...

        seatsService.bookSeats(showId, selectedSeats);


        // For demonstration purposes, you can print the received data
        System.out.println("Show ID: " + showId);
        System.out.println("Selected Seats: " + selectedSeats);


    }



    @PostMapping("/lockseat")
    public ResponseEntity<String> lockSeat(@RequestBody SeatLockRequest request) {
        Long showId = request.getShowId();
        String seatNumber = request.getSeatNumber();

        // Call the service method to lock the seat
        seatsService.lockSeat(showId, seatNumber);

        // Return success message or appropriate response
        return ResponseEntity.ok("Seat locked successfully");
    }

}

