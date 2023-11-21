package OMAS.OfficeTableReservationSystem.IGNORE.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UsersOutDto {
    private Long id;

    private Long emp_id;

    private String fname;

    private String lname;

    private String username;

    private String email;

    private String img_src;

    private String password;
}
