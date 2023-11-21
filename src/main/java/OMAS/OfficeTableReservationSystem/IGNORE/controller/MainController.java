// Aries

package OMAS.OfficeTableReservationSystem.IGNORE.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersOutDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Events;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;
import OMAS.OfficeTableReservationSystem.IGNORE.model.WeatherData;
import OMAS.OfficeTableReservationSystem.IGNORE.service.MainService;
import jakarta.servlet.http.HttpSession;

import javax.validation.Valid;

@RestController
@RequestMapping("/main")
public class MainController {

    @Autowired
    private MainService mainService;

    // Dashboard Page
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard(HttpSession session) {

        UsersOutDto user = (UsersOutDto) session.getAttribute("userSession");

        mainService.dashboard(user.getEmp_id().toString());

        List<Events> allEvents = mainService.dashboard(user.getEmp_id().toString());

        LocalDateTime today = LocalDateTime.now();
        List<Events> todaysEvents = allEvents.stream()
                .filter(event -> event.getStart().toLocalDate().equals(today.toLocalDate()))
                .collect(Collectors.toList());

        // Fetch Events For Tomorrow
        LocalDateTime tom = LocalDateTime.now().plusDays(1);
        List<Events> tomEvents = allEvents.stream()
                .filter(event -> event.getStart().toLocalDate().equals(tom.toLocalDate()))
                .collect(Collectors.toList());

        // Open Weather API
        String apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Pasig&units=metric&appid=b5e35da3557f68bd8edc2b6032dddc77";
        WeatherData weatherData = new RestTemplate().getForObject(apiUrl, WeatherData.class);

        Map<String, Object> data = new HashMap<>();
        data.put("today", todaysEvents);
        data.put("tomorrow", tomEvents);
        data.put("weatherData", weatherData);

        return ResponseEntity.ok(data);
    }

    // Get All Events Of Logged User
    @GetMapping("/events")
    @CrossOrigin
    public ResponseEntity<Map<String, Object>> getAllEvents(HttpSession session) {
        UsersOutDto user = (UsersOutDto) session.getAttribute("userSession");
        Map<String, Object> data = new HashMap<String, Object>();

        if (null != user) {
            List<Events> eventsLst = mainService.getAllEvents();
            data.put("data", eventsLst);
        } else {
            // Do something here if no session
        }

        return ResponseEntity.ok(data);
    }


    // Save Event
    @PostMapping("/saveEvent")
    @ResponseBody
    public ResponseEntity<Long> saveEvent(@Valid @RequestBody Events event) {
        return mainService.saveEvent(event);
    }

    // Save Participant
    @PostMapping("/saveEventParticipants")
    @ResponseBody
    public ResponseEntity<Map<String, String>> saveEventParticipants(@Valid @RequestBody Map<String, Object> payload) {
        return mainService.saveEventParticipants(payload);
    }


    // Get Invdividual Event
    @GetMapping("/timetable/{id}")
    @ResponseBody
    public Events getEventById(@PathVariable("id") Long id) {
        return mainService.getEventById(id);
    }

    // Fetch Participant For Event
    @GetMapping("/events/{eventId}/users")
    @ResponseBody
    public List<Users> getAllUsersForEvent(@PathVariable Long eventId) {
        return mainService.getAllUsersForEvent(eventId);
    }

    // Delete Event
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        return mainService.deleteEvent(id);
    }

    // Edit Event
    @PutMapping("edit/{id}")
    @ResponseBody
    public ResponseEntity<?> updateEvent(@Valid @PathVariable Long id, @RequestBody Events updatedEvent) {
        return mainService.updateEvent(id, updatedEvent);
    }

    // Delete Participant For Event
    @DeleteMapping("/delete/{eventId}/edit")
    @ResponseBody
    public Long deleteParticipantsByEventId(@PathVariable Long eventId) {
        return mainService.deleteParticipantsByEventId(eventId);
    }

    // Get all locations
    @GetMapping("/locations")
    @ResponseBody
    public Map<String, Object> getAllUsers() {
        return mainService.getAllLocations();
    }
}