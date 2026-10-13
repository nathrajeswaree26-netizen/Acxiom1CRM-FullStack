
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.Activity;
import acxiom_crm_backend.service.ActivityService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ActivityController {
    private final ActivityService service;

    public ActivityController(ActivityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Activity> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Activity getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Activity create(@RequestBody Activity activity) {
        activity.setId(null);
        return service.create(activity);
    }

    @PutMapping("/{id}")
    public Activity update(@PathVariable Long id, @RequestBody Activity activity) {
        service.findById(id);
        activity.setId(id);
        return service.update(id, activity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
