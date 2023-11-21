package OMAS.OfficeTableReservationSystem.IGNORE.service;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import OMAS.OfficeTableReservationSystem.IGNORE.model.Events;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;

public interface MainService {

    public List<Events> dashboard(String userId);

    public List<Events> getAllEvents();

    public ResponseEntity<Long> saveEvent(@Valid @RequestBody Events event);

    public ResponseEntity<Map<String, String>> saveEventParticipants(@Valid @RequestBody Map<String, Object> payload);

    public Events getEventById(@PathVariable("id") Long id);

    public List<Users> getAllUsersForEvent(@PathVariable Long eventId);

    public ResponseEntity<Void> deleteEvent(@PathVariable Long id);

    public ResponseEntity<?> updateEvent(@Valid @PathVariable Long id, @RequestBody Events updatedEvent);

    public Long deleteParticipantsByEventId(@PathVariable Long eventId);

    public Map<String, Object> getAllUsers();

    public Map<String, Object> getAllLocations();
}
