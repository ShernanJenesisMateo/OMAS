package OMAS.OfficeTableReservationSystem.dao;

import org.apache.ibatis.annotations.Mapper;

import OMAS.OfficeTableReservationSystem.model.Reservation;

@Mapper
public interface ReservationDao {

    void save(Reservation body);
    
}
