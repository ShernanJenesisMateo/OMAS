// Aries

package OMAS.OfficeTableReservationSystem.IGNORE.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersOutDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;
import OMAS.OfficeTableReservationSystem.IGNORE.service.UserService;
import jakarta.servlet.http.HttpSession;

import javax.validation.Valid;

@RestController
@SessionAttributes("userSession")
public class UserController {

    @Autowired
    public UserService userService;

    // Get all users
    @GetMapping("/users")
    @ResponseBody
    public Map<String, Object> getAllUsers(HttpSession session) {

        List<UsersOutDto> listUsers = userService.getAllUsers();
        for (UsersOutDto user : listUsers) {
            user.setId(user.getEmp_id());
        }
        Map<String, Object> outMap = new HashMap<String, Object>();
        outMap.put("data", listUsers);
        return outMap;
    }

    // Register User
    @PostMapping("/createUser")
    @ResponseBody
    public Map<String, String> signUp(@Valid @RequestBody Users user) {
        return userService.signUp(user);
    }

    @GetMapping("/loggedUser")
    @CrossOrigin
    public ResponseEntity<Users> getLoggedUser(HttpSession session) {
        Users dbUser = userService.getLoggedUser(session);

        if (dbUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(dbUser);
    }

    // editprofile page
    @GetMapping("/editprofile")
    public String editprofile(@Valid HttpSession session, Model model) {
        return userService.editprofile(session, model);
    }

    // Edit User
    @PutMapping("edituser/{id}")
    @ResponseBody
    public ResponseEntity<?> updateUser(
            @Valid @PathVariable Long id,
            @RequestParam(value = "img_src", required = false) MultipartFile photo,
            @RequestParam("fname") String fname,
            @RequestParam("lname") String lname,
            @RequestParam("username") String username,
            @RequestParam("email") String email) {
        return userService.updateUser(id, photo, fname, lname, username, email);
    }

    // Edit User pass
    @PutMapping("editpass/{emp_id}")
    @ResponseBody
    public ResponseEntity<?> updatePass(@Valid @PathVariable("emp_id") Long id,
            @RequestBody Map<String, String> passMap) {
        return userService.updatePass(id, passMap);
    }

    // // Login httpsession
    // @PostMapping("/loginUser")
    // @ResponseBody
    // @CrossOrigin
    // public Map<String, String> login(@RequestBody Map<String, String> loginData,
    // HttpSession session) {
    // return userService.login(loginData, session);
    // }

    // Check httpsession
    @GetMapping("/checkSession")
    public Map<String, String> checkSession(HttpSession session) {
        return userService.checkSession(session);
    }

    // Logout remove httpsession
    // @GetMapping("/logout")
    // public String logout(HttpSession session) {
    // return userService.logout(session);
    // }

    // Search users
    @PostMapping("/search")
    public ResponseEntity<Object> searchUsers(@RequestBody Map<String, String> payload, HttpSession session) {
        return userService.searchUsers(payload, session);
    }
}
