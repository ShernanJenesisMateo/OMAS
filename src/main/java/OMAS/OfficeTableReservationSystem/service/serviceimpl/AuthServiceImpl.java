package OMAS.OfficeTableReservationSystem.service.serviceimpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.dao.UserDao;
import OMAS.OfficeTableReservationSystem.model.PersonalInfoInput;
import OMAS.OfficeTableReservationSystem.model.User;
import OMAS.OfficeTableReservationSystem.model.UserInput;
import OMAS.OfficeTableReservationSystem.service.AuthService;
import OMAS.OfficeTableReservationSystem.service.JwtService;
import OMAS.OfficeTableReservationSystem.shared.AuthRequest;
import OMAS.OfficeTableReservationSystem.shared.AuthResponse;
import OMAS.OfficeTableReservationSystem.shared.RegisterRequest;

import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    
    private final UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

     @Override
    public AuthResponse register(RegisterRequest request) {
        var user = User.builder()
                .emp_id(request.getEmp_id())
                .fname(request.getFname())
                .lname(request.getLname())
                .mname(request.getMname())
                .email(request.getEmail())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .position_id(request.getPosition_id())
                .dept_id(request.getDept_id())
                .section_id(request.getSection_id())
                .status_code(request.getStatus_code())
                .img_src(request.getImg_src())
                .build();

        UserInput userAccount = new UserInput();

        userAccount.setEmp_id(user.getEmp_id());
        userAccount.setUsername(user.getUsername());
        userAccount.setPassword(user.getPassword());
        userAccount.setPosition_id(user.getPosition_id());
        userAccount.setDept_id(user.getDept_id());
        userAccount.setSection_id(user.getSection_id());
        userAccount.setStatus_code(user.getStatus_code());
        userAccount.setImg_src(user.getImg_src());

        // userDao.save(user);
        userDao.insertUser(userAccount);

        PersonalInfoInput personalInfo = new PersonalInfoInput();

        personalInfo.setEmp_id(user.getEmp_id());
        personalInfo.setFname(user.getFname());
        personalInfo.setLname(user.getLname());
        personalInfo.setMname(user.getMname());
        personalInfo.setEmail(user.getEmail());

        userDao.addPersonalInfo(personalInfo);

        var jwtToken = jwtService.generateToken(user);

        return AuthResponse
                .builder()
                .token(jwtToken)
                .build();
    }

    @Override
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(), 
                    request.getPassword()));

            var user = userDao.findByUsername(request.getUsername())
                    .orElseThrow();
    
            var jwtToken = jwtService.generateToken(user);
    
            return AuthResponse
                    .builder()
                    .token(jwtToken)
                    .build();
        }

}
