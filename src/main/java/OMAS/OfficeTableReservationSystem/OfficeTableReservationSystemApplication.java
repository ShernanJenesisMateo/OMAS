package OMAS.OfficeTableReservationSystem;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("OMAS.OfficeTableReservationSystem.dao")
public class OfficeTableReservationSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfficeTableReservationSystemApplication.class, args);
	}

}
