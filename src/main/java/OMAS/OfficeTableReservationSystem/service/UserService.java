package OMAS.OfficeTableReservationSystem.service;

import org.springframework.http.ResponseEntity;

import OMAS.OfficeTableReservationSystem.model.UserInfoOutput;

public interface UserService {

    public ResponseEntity<UserInfoOutput> getUserById(String id);
}
