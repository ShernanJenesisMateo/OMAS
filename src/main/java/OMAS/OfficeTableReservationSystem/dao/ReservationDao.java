package OMAS.OfficeTableReservationSystem.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import OMAS.OfficeTableReservationSystem.model.Reservation;

@Mapper
public interface ReservationDao {

    void save(Reservation body);

    List<Reservation> reservationsPerSeat(Long seat_id);
    
}
