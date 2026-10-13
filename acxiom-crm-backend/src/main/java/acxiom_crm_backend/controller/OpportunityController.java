
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.Opportunity;
import acxiom_crm_backend.service.OpportunityService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opportunities")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OpportunityController {
    private final OpportunityService service;

    public OpportunityController(OpportunityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Opportunity> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public Opportunity getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Opportunity create(@RequestBody Opportunity opportunity) {
        opportunity.setId(null);
        return service.create(opportunity);
    }

    @PutMapping("/{id}")
    public Opportunity update(@PathVariable Long id,
                              @RequestBody Opportunity opportunity) {
        service.findById(id);
        opportunity.setId(id);
        return service.update(id, opportunity);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
