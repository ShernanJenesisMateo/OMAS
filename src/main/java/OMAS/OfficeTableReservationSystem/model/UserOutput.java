package OMAS.OfficeTableReservationSystem.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserOutput {
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
