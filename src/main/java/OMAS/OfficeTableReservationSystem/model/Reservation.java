package OMAS.OfficeTableReservationSystem.model;

import java.sql.Date;
import java.sql.Time;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
    private Long reservation_id;
    private Long seat_id;
    private String emp_id;
    private Date start_date;
    private Date end_date;
    private Time start_time;
    private Time end_time;
}
