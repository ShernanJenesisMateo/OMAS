package OMAS.OfficeTableReservationSystem.service;

import org.springframework.stereotype.Service;

import OMAS.OfficeTableReservationSystem.shared.AuthRequest;
import OMAS.OfficeTableReservationSystem.shared.AuthResponse;

@Service
public interface AuthService {
    
    public AuthResponse authenticate(AuthRequest request);
}
