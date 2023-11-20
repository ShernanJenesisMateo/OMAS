package OMAS.OfficeTableReservationSystem.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {
    private String emp_id;
    private String username;
    private String password;
    private Long position_id;
    private Long dept_id;
    private Long section_id;
    private String status_code;
    private String img_src;
}
