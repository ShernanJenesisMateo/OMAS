// Aries
package OMAS.OfficeTableReservationSystem.IGNORE.model;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

//Users database model
@Alias("users")
//lombok
@Setter
@Getter
public class Users {

    private Long id;

    private Long emp_id;

    @NotBlank
    @Size(max = 150)
    private String fname;

    @NotBlank
    @Size(max = 150)
    private String lname;

    // @NotBlank
    // @Size(max = 100)
    // private String address;

    // @NotBlank
    // @Size(max = 11)
    // private String contact;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 150)
    private String email;

    @Size(max = 255)
    private String img_src;

    @NotBlank
    @Size(max = 32)
    private String password;
    private List<Events> events;


}
