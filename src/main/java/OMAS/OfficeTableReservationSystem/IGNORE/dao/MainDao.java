package OMAS.OfficeTableReservationSystem.IGNORE.dao;

import java.time.LocalDateTime;
import java.util.List;

import OMAS.OfficeTableReservationSystem.IGNORE.model.Events;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Locations;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;

public interface MainDao {

    List<Events> todayEvent(LocalDateTime today);

    Events getEventById(Long id);

    List<Events> getAllEvents();

    Long insertEvent(Events events);

    void updatedEvent(Events event);

    void deleteEventById(Long id);

    List<Users> getUsersByEventId(Long eventId);

    List<Events> getUserEvent(String userid);

    List<Events> getUserbyEventId(String userIds, LocalDateTime startTime,LocalDateTime endTime);

    void insertEventParticipants(Long eventId, List<Long> participantIds);

    void deleteParticipant(Long eventId);

    List<Locations> getAllLocations();

}
