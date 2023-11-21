package OMAS.OfficeTableReservationSystem.dao;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import OMAS.OfficeTableReservationSystem.model.PersonalInfoInput;
import OMAS.OfficeTableReservationSystem.model.User;
import OMAS.OfficeTableReservationSystem.model.UserInput;

@Mapper
public interface UserDao {

    Optional<User> findByUsername(String username);
    
    void save(User user);    

    void addPersonalInfo (PersonalInfoInput body);

    void insertUser (UserInput body);

    // List<Role> getAllRolesOfUser();
}
