package OMAS.OfficeTableReservationSystem.service.serviceimpl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.dao.UserDao;
import OMAS.OfficeTableReservationSystem.service.AuthService;
import OMAS.OfficeTableReservationSystem.service.JwtService;
import OMAS.OfficeTableReservationSystem.shared.AuthRequest;
import OMAS.OfficeTableReservationSystem.shared.AuthResponse;

import lombok.RequiredArgsConstructor;
import lombok.var;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    
    private final UserDao userDao;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

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
