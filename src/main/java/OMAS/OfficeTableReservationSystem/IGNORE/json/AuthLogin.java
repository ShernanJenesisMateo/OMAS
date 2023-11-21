package OMAS.OfficeTableReservationSystem.IGNORE.json;

import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthLogin {
    @NotEmpty
    private String username;
    @NotEmpty
    private String password;
}
