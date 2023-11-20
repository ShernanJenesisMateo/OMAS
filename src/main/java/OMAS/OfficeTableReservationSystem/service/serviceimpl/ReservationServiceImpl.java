package OMAS.OfficeTableReservationSystem.service.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.dao.ReservationDao;
import OMAS.OfficeTableReservationSystem.model.Reservation;
import OMAS.OfficeTableReservationSystem.service.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService{

    @Autowired
    private ReservationDao reservationDao;

    @Override
    public ResponseEntity<String> save(Reservation body) {
        reservationDao.save(body);
        return ResponseEntity.ok("Seat reserved");
    }
    
}
