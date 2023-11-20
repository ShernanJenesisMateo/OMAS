package OMAS.OfficeTableReservationSystem.service;

import org.springframework.http.ResponseEntity;

import OMAS.OfficeTableReservationSystem.model.Reservation;

public interface ReservationService {
    public ResponseEntity<String> save(Reservation body);
}
