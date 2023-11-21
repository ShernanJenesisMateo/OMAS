//Aries
package OMAS.OfficeTableReservationSystem.IGNORE.model;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.type.Alias;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


//Event database model
@Alias("events")
@Getter
@Setter
public class Events {

  private Long id;

  @NotNull
  @Size(max = 100)
  private String title;

  @NotNull
  @Size(max = 100)
  private String description;

  @NotNull
  @Size(max = 100)
  private String location;

  private String links;

  @NotNull
  @Size(max = 15)
  private String color;

  private List<Users> people;

  @NotNull
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
  private LocalDateTime start;

  @NotNull
  @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
  private LocalDateTime end;

}
