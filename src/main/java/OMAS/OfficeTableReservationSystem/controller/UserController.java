package OMAS.OfficeTableReservationSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import OMAS.OfficeTableReservationSystem.model.UserInfoOutput;
import OMAS.OfficeTableReservationSystem.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    public UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserInfoOutput> getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }
}
