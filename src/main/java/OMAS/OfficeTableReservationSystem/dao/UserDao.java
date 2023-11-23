package OMAS.OfficeTableReservationSystem.dao;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import OMAS.OfficeTableReservationSystem.model.PersonalInfoInput;
import OMAS.OfficeTableReservationSystem.model.User;
import OMAS.OfficeTableReservationSystem.model.UserInfoOutput;
import OMAS.OfficeTableReservationSystem.model.UserInput;
import OMAS.OfficeTableReservationSystem.model.UserOutput;

@Mapper
public interface UserDao {

    Optional<User> findByUsername(String username);
    
    void save(User user);    

    void addPersonalInfo (PersonalInfoInput body);

    void insertUser (UserInput body);

    // List<Role> getAllRolesOfUser();

    UserOutput findUserByUsername (String username);

    UserInfoOutput getUserById(String id);
}
