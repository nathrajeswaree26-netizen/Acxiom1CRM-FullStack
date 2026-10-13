
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.Lead;
import acxiom_crm_backend.service.LeadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class LeadController {
    private final LeadService service;

    public LeadController(LeadService service) {
        this.service = service;
    }

    @GetMapping
    public List<Lead> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Lead getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Lead create(@RequestBody Lead lead) {
        lead.setId(null);
        return service.create(lead);
    }

    @PutMapping("/{id}")
    public Lead update(@PathVariable Long id, @RequestBody Lead lead) {
        service.findById(id);
        lead.setId(id);
        return service.update(id, lead);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
