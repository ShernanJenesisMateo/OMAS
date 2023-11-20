package OMAS.OfficeTableReservationSystem.shared;

import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    
    private String emp_id;

    private String fname;

    private String lname;

    private String mname;
    
    private String email;
    
    private String username;
     
    private String password;

    private Long position_id;

    private Long dept_id;
    
    private Long section_id;

    private String status_code;
    
    private String img_src;
}
