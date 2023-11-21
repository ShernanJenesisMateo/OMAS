package OMAS.OfficeTableReservationSystem.IGNORE.model;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Locations {

  private Long id;

    @NotNull
    @Size(max = 100)
    private String name;
}
