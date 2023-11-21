package OMAS.OfficeTableReservationSystem.IGNORE.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Collectors;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
// import org.springframework.web.multipart.MultipartFile;

import OMAS.OfficeTableReservationSystem.IGNORE.dao.MainDao;
import OMAS.OfficeTableReservationSystem.IGNORE.dao.UserDao;
import OMAS.OfficeTableReservationSystem.IGNORE.dto.AdminLoginDto;
import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersOutDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Events;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;
import OMAS.OfficeTableReservationSystem.IGNORE.service.UserService;
import jakarta.servlet.http.HttpSession;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    public UserDao userDao;
    @Autowired
    private MainDao mainDao;

    @Autowired
    public BCryptPasswordEncoder bCryptPasswordEncoder;

    //temp
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }
    //temp

    @Override
    public List<UsersOutDto> getAllUsers() {
        return userDao.getAllUser();
    }

    @Override
    @Deprecated
    public Map<String, String> signUp(Users user) {
        Map<String, String> response = new HashMap<>();

        if (userDao.findByUsername(user.getUsername()) != null) {
            response.put("status", "taken");
        } else {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userDao.insertUser(user);
            response.put("status", "success");
        }

        return response;
    }

    @Override
    public Users getUserById(Long userId) {
        return userDao.getUserById(userId.toString());
    }

    @Override
    public Users getLoggedUser(HttpSession session) {
        UsersOutDto user = (UsersOutDto) session.getAttribute("userSession");

        if (user == null) {
            return null; // User is not logged in
        }
        //temp userService
        Users dbUser = userDao.getUserById(user.getEmp_id().toString());
        return dbUser;
    }

    @Override
    @Deprecated
    public String editprofile(@Valid HttpSession session, Model model) {
        // UsersOutDto user = (UsersOutDto) session.getAttribute("user");
        // if (user == null) {
        //     return "redirect:/login";
        // } else {
        //     // Get User Information
        //     Long userid = user.getId();
        //     Users dbUser = userDao.getUserById(userid);
        //     model.addAttribute("user", dbUser);
        //     return "editprofile";
        // }
        return "";
    }

    @Override
    @Deprecated
    public ResponseEntity<?> updateUser(
        @Valid @PathVariable Long id,
        @RequestParam(value = "img_src", required = false) MultipartFile photo,
        @RequestParam("fname") String fname,
        @RequestParam("lname") String lname,
        // @RequestParam("address") String address,
        // @RequestParam("contact") String contact,
        @RequestParam("username") String username,
        @RequestParam("email") String email
    ) {
        Users existingUser = userDao.getUserById(id.toString());
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        // Check if updated username already exists
        // if (username != null && !username.equals(existingUser.getUsername())) {
        //     Users usernameExists = userDao.findByUsername(username);
        //     if (usernameExists != null && !usernameExists.getId().equals(id)) {
        //         return ResponseEntity.badRequest().body("Username already exists.");
        //     }
        // }

        // Update user details
        existingUser.setFname(fname);
        existingUser.setLname(lname);
        // existingUser.setAddress(address);
        // existingUser.setContact(contact);
        existingUser.setUsername(username);
        existingUser.setEmail(email);
        long maxFileSize = 5 * 1024 * 1024;
        String contentType = photo.getContentType();
        // Handle profile picture update
        if (photo != null && !photo.isEmpty()) {
            try {
                if (photo.getSize() > maxFileSize) {
                    return ResponseEntity.badRequest().body("File size exceeds the maximum limit.");
                }else if (!contentType.equals("image/jpeg") && !contentType.equals("image/png") && !contentType.equals("image/jpg")){
                    return ResponseEntity.badRequest().body("Invalid file type. Only image files are allowed.");
                }else{
                    // Save the profile picture file to a desired location
                    String originalFileName = photo.getOriginalFilename();
                    String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
                    String fileName = UUID.randomUUID().toString() + "." + extension;

                    // ProfilePhotos Path
                    String filePath = "C:/Users/aries/Desktop/Timetable Project/React/timetable/FrontEnd/public/ProfilePhotos/" + fileName;
                    Files.copy(photo.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
                    // Update the profile picture field in the existing user object
                    existingUser.setImg_src(fileName);

                };
            } catch (IOException e) {
                // Handle file upload error
                return ResponseEntity.badRequest().body("Failed to upload profile picture.");
            }
        }

        // Save the updated user object to the database
        userDao.updateUser(existingUser);
        return ResponseEntity.ok(existingUser);
    }

    @Override
    @Deprecated
    public ResponseEntity<?> updatePass(@Valid @PathVariable("emp_id") Long id, @RequestBody Map<String, String> passMap) {
        Users existingUser = userDao.getUserById(id.toString());
        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        String oldPass = passMap.get("oldpass");
        String newPass = passMap.get("newpass");

        // Check if old password is correct
        if (!BCrypt.checkpw(oldPass, existingUser.getPassword())) {
            return ResponseEntity.badRequest().body("Wrong old password");
        }

        // Hash and set the new password
        String hashedPass = BCrypt.hashpw(newPass, BCrypt.gensalt());
        existingUser.setPassword(hashedPass);

        // Save the updated user object to the database
        userDao.updateUser(existingUser);

        return ResponseEntity.ok(existingUser);
    }

    @Override
    public UsersOutDto login(AdminLoginDto loginData) {
        String username = loginData.getUsername();

        UsersOutDto user = userDao.findByUsername(username);

        return user;
    }

    @Override
    public Map<String, String> checkSession(HttpSession session) {
        Map<String, String> response = new HashMap<>();
        UsersOutDto userSession = (UsersOutDto) session.getAttribute("userSession");
        if (userSession != null) {
            response.put("status", "success");
        } else {
            response.put("status", "error");
        }
        return response;
    }

    // @Override
    // public String logout(HttpSession session) {

    //     return "{\"status\":\"success\"}";
    // }

    @Override
    public ResponseEntity<Object> searchUsers(@RequestBody Map<String, String> payload, HttpSession session) {
        String searchWord = payload.get("searchWord");
        List<Users> users = userDao.searchUser(searchWord);
        List<String> userIds = users.stream().map(user -> String.valueOf(user.getId())).collect(Collectors.toList());
        LocalDateTime startTime = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endTime = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        List<Events> events = mainDao.getUserbyEventId(String.join(",", userIds), startTime, endTime);

            Map<String, Object> response = new HashMap<>();
            if (users.isEmpty()) {
                response.put("userresult", "nouser");
            } else {
                response.put("users", users);
                if (events.isEmpty()) {
                    response.put("eventresult", "noevent");
                } else {
                    response.put("events", events);
                }
            }
            return ResponseEntity.ok(response);
    }

}
