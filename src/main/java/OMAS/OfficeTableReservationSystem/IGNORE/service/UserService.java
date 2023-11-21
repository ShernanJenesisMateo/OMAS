package OMAS.OfficeTableReservationSystem.IGNORE.service;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.AdminLoginDto;
import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersOutDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;
import jakarta.servlet.http.HttpSession;

public interface UserService {

    public List<UsersOutDto> getAllUsers();

    public Map<String, String> signUp(Users user);

    public Users getUserById(Long userId);

    public Users getLoggedUser(HttpSession session);

    public String editprofile(@Valid HttpSession session, Model model);

    public ResponseEntity<?> updateUser(
        @Valid @PathVariable Long id,
        @RequestParam(value = "img_src", required = false) MultipartFile photo,
        @RequestParam("fname") String fname,
        @RequestParam("lname") String lname,
        // @RequestParam("address") String address,
        // @RequestParam("contact") String contact,
        @RequestParam("username") String username,
        @RequestParam("email") String email);

    public ResponseEntity<?> updatePass(
        @Valid @PathVariable("emp_id")
        Long id,
        @RequestBody Map<String, String> passMap);

    public UsersOutDto login(AdminLoginDto loginData);

    public Map<String, String> checkSession(HttpSession session);

    public ResponseEntity<Object> searchUsers(@RequestBody Map<String, String> payload, HttpSession session);
}
