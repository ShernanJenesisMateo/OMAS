package OMAS.OfficeTableReservationSystem.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import OMAS.OfficeTableReservationSystem.model.Reservation;

public interface ReservationService {
    public ResponseEntity<String> save(Reservation body);

    public ResponseEntity<List<Reservation>> reservationsPerSeat(Long seat_id);
}
