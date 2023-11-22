package OMAS.OfficeTableReservationSystem.model;

import java.sql.Timestamp;

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
    private Timestamp start_date;
    private Timestamp end_date;
}
