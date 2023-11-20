package OMAS.OfficeTableReservationSystem.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountInput {
    
    private String emp_id;

    private String fname;

    private String lname;

    private String mname;

    private String email;

    private String username;

    private String password;

    private String confirm_password;

    private Long position_id;

    private Long dept_id;

    private Long section_id;

    private String status_code;

    // @NotNull(message = "Role ID should not be empty.")
    // @Digits(integer = 9, fraction = 0, message = "The Role ID is invalid, it should be up to 9 digits long.")
    // private Long role_id;
    
    private String img_src;
}
