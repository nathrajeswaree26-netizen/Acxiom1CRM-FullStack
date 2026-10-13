
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.FollowUp;
import acxiom_crm_backend.service.FollowUpService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follow-ups")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class FollowUpController {
    private final FollowUpService service;

    public FollowUpController(FollowUpService service) {
        this.service = service;
    }

    @GetMapping
    public List<FollowUp> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public FollowUp getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FollowUp create(@RequestBody FollowUp followUp) {
        followUp.setId(null);
        return service.create(followUp);
    }

    @PutMapping("/{id}")
    public FollowUp update(@PathVariable Long id, @RequestBody FollowUp followUp) {
        service.findById(id);
        followUp.setId(id);
        return service.update(id, followUp);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
