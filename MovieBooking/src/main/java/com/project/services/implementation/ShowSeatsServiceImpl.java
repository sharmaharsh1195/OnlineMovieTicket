package com.project.services.implementation;

import com.project.entities.ShowSeats;
import com.project.repository.SeatRepository;
import com.project.services.ShowSeatsService;
//import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional

public class ShowSeatsServiceImpl implements ShowSeatsService {

    @Autowired
    private SeatRepository seatRepository;

    @Override
    public void bookSeats(Long showId, List<String> selectedSeats) {

        List<ShowSeats> showSeatsList = seatRepository.findByshows_showId(showId);

        for (String seatNumber : selectedSeats) {
            ShowSeats selectedSeat = findSeatByNumber(showSeatsList, seatNumber);

            if (selectedSeat != null && selectedSeat.isAvailable()) {

                if (selectedSeat.isLocked() && isLockTimeExpired(selectedSeat.getLockTime())) {
                    selectedSeat.setLocked(false);
                    selectedSeat.setLockTime(null);
                }


                selectedSeat.setAvailable(false);
                selectedSeat.setLocked(true);
                selectedSeat.setSeatSelectionTime(LocalDateTime.now());
                selectedSeat.setLockTime(LocalDateTime.now()); // Set the lock time


                seatRepository.save(selectedSeat);

                System.out.println("Seat booked: " + selectedSeat.getSeatNumber());
            } else {
                // Handle the case where the selected seat is not available or not found
                System.out.println("Seat not available or not found: " + seatNumber);
                // You may throw an exception, log a message, or handle it in a way that makes sense for your application
            }
        }
    }

    @Override
    public void lockSeat(Long showId, String seatNumber) {
        ShowSeats seat = seatRepository.findByshows_showIdAndSeatNumber(showId, seatNumber);

        if (seat != null && seat.isAvailable()) {

            seat.setLocked(true);
            seat.setLockTime(LocalDateTime.now()); // Set the lock time


            seatRepository.save(seat);

            System.out.println("Seat locked: " + seat.getSeatNumber());
        } else {

            System.out.println("Seat not available or not found: " + seatNumber);

        }
    }

    private boolean isLockTimeExpired(LocalDateTime lockTime) {
        return lockTime != null && LocalDateTime.now().minusMinutes(1).isAfter(lockTime);
    }


    @Scheduled(fixedRate = 60000) // Run every 1 minute (in milliseconds)
    public void unlockExpiredSeats() {
        List<ShowSeats> lockedSeats = seatRepository.findLockedSeats();
        System.out.println("unlockExpiredSeats running");

        for (ShowSeats lockedSeat : lockedSeats) {
            System.out.println("Seat: " + lockedSeat.getSeatNumber() + ", Lock Time: " + lockedSeat.getLockTime() + ", Current Time: " + LocalDateTime.now());
            if (isLockTimeExpired(lockedSeat.getLockTime())) {

                lockedSeat.setLocked(false);
                lockedSeat.setLockTime(null);


                seatRepository.save(lockedSeat);

                System.out.println("Seat unlocked after 3 minutes: " + lockedSeat.getSeatNumber());
            }
        }
    }

    private ShowSeats findSeatByNumber(List<ShowSeats> showSeatsList, String seatNumber) {
        for (ShowSeats seat : showSeatsList) {
            if (seat.getSeatNumber().equals(seatNumber)) {
                return seat;
            }
        }
        return null;
    }
}
