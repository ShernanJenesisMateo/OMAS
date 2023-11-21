package OMAS.OfficeTableReservationSystem.IGNORE.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import OMAS.OfficeTableReservationSystem.IGNORE.dao.MainDao;
import OMAS.OfficeTableReservationSystem.IGNORE.dao.UserDao;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Events;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;
import OMAS.OfficeTableReservationSystem.IGNORE.service.MainService;

@Service
@Transactional
public class MainServiceImpl implements MainService{

    @Autowired
    MainDao mainDao;

    @Autowired
    UserDao userDao;

    @Override
    public List<Events> dashboard(String userId) {

        List<Events> allEvents = mainDao.getUserEvent(userId);

        return allEvents;
    }

    @Override
    public List<Events> getAllEvents() {

        return mainDao.getAllEvents();
    }

    @Override
    public ResponseEntity<Long> saveEvent(@Valid @RequestBody Events event) {
        mainDao.insertEvent(event);
        Long eventId = event.getId();
        return ResponseEntity.ok(eventId);
    }

    @Override
    @SuppressWarnings("unchecked")
    public ResponseEntity<Map<String, String>> saveEventParticipants(@Valid @RequestBody Map<String, Object> payload) {
        Long eventId = ((Number) payload.get("eventId")).longValue();
        List<Long> participantIds = (List<Long>) payload.get("participantIds");
        if (!participantIds.isEmpty()) {
            mainDao.insertEventParticipants(eventId, participantIds);
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", "Success");
        return ResponseEntity.ok(response);
    }

    @Override
    public Events getEventById(@PathVariable("id") Long id) {
        return mainDao.getEventById(id);
    }

    @Override
    public List<Users> getAllUsersForEvent(@PathVariable Long eventId) {
        return mainDao.getUsersByEventId(eventId);
    }

    @Override
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        mainDao.deleteEventById(id);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<?> updateEvent(@Valid @PathVariable Long id, @RequestBody Events updatedEvent) {
        Events existingEvent = mainDao.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }

        // Event Object
        existingEvent.setTitle(updatedEvent.getTitle());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setLinks(updatedEvent.getLinks());
        existingEvent.setColor(updatedEvent.getColor());
        existingEvent.setStart(updatedEvent.getStart());
        existingEvent.setEnd(updatedEvent.getEnd());

        // Save Updated Object to Database
        mainDao.updatedEvent(existingEvent);
        return ResponseEntity.ok(existingEvent);
    }

    public Long deleteParticipantsByEventId(@PathVariable Long eventId) {
        mainDao.deleteParticipant(eventId);
        return eventId;
    }

    public Map<String, Object> getAllUsers() {
        Map<String, Object> response = new HashMap<>();
        // response.put("locations", mainDao.getAllLocations());

        return response;
    }

    @Override
    public Map<String, Object> getAllLocations() {
        Map<String, Object> response = new HashMap<>();
        response.put("locations", mainDao.getAllLocations());

        return response;
    }
}
