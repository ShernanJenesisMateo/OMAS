package OMAS.OfficeTableReservationSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMAS.OfficeTableReservationSystem.model.Reservation;
import OMAS.OfficeTableReservationSystem.service.ReservationService;

@RestController
@RequestMapping("/reserve/")
public class ReservationController {
    
    @Autowired
    public ReservationService reservationService;

    @PostMapping("save/{seat_id}")
    public ResponseEntity<String> save(@PathVariable Long seat_id, @RequestBody Reservation body) {
        try {
            body.setSeat_id(seat_id);
            body.setEmp_id("101");
            return reservationService.save(body);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
