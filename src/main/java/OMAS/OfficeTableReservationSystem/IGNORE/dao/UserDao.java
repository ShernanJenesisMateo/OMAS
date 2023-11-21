package OMAS.OfficeTableReservationSystem.IGNORE.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersOutDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Locations;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;


public interface UserDao {

    Users getUserById(String emp_id);

    List<UsersOutDto> getAllUser();

    UsersOutDto findByUsername(String username);

    Users findByEmail(String email);

    Users findByPass(String password);

    Long insertUser(Users users);

    void updateUser(Users users);

    void deleteUserById(Long id);

    Users findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    List<Users> searchUser(String searchWord);

    List<Locations> getAllLocations();

}
