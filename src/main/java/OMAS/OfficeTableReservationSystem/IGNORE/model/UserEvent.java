package OMAS.OfficeTableReservationSystem.IGNORE.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEvent {
    private Long id;
    private Users user;
    private Events event;
}
