package OMAS.OfficeTableReservationSystem.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import OMAS.OfficeTableReservationSystem.model.User;

@Mapper
public interface UserDao {

    Optional<User> findByUsername(String username);
    
    void save(User user);    
}
