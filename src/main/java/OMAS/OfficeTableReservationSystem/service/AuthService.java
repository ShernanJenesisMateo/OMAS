package OMAS.OfficeTableReservationSystem.service;

import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.shared.AuthRequest;
import OMAS.OfficeTableReservationSystem.shared.AuthResponse;
import OMAS.OfficeTableReservationSystem.shared.RegisterRequest;

@Service
public interface AuthService {

    public AuthResponse register(RegisterRequest request);
    
    public AuthResponse authenticate(AuthRequest request);
}
