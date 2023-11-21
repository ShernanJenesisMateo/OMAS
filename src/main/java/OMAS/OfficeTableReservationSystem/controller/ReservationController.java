package OMAS.OfficeTableReservationSystem.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMAS.OfficeTableReservationSystem.dao.UserDao;
import OMAS.OfficeTableReservationSystem.model.Reservation;
import OMAS.OfficeTableReservationSystem.model.UserOutput;
import OMAS.OfficeTableReservationSystem.service.ReservationService;

@RestController
@RequestMapping("/reserve/")
public class ReservationController {
    
    @Autowired
    public ReservationService reservationService;

    @Autowired
    public UserDao userDao;

    @PostMapping("save/{seat_id}")
    public ResponseEntity<String> save(@PathVariable Long seat_id, @RequestBody Reservation body) {
        try {
            // Example using Spring Security
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String loggedInUserId = authentication.getName(); // Assuming the username is the user ID
            UserOutput username = userDao.findUserByUsername(loggedInUserId);
            
            body.setSeat_id(seat_id);
            body.setEmp_id(username.getEmp_id());
            return reservationService.save(body);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
