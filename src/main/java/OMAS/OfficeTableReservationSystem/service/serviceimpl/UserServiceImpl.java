package OMAS.OfficeTableReservationSystem.service.serviceimpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.dao.UserDao;
import OMAS.OfficeTableReservationSystem.model.UserInfoOutput;
import OMAS.OfficeTableReservationSystem.service.UserService;

@Service
public class UserServiceImpl implements UserService{
    
    @Autowired
    public UserDao userDao;

    public ResponseEntity<UserInfoOutput> getUserById(String id) {
    return ResponseEntity.ok(userDao.getUserById(id));
  }
}
