
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.CrmUser;
import acxiom_crm_backend.service.CrmUserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CrmUserController {
    private final CrmUserService service;

    public CrmUserController(CrmUserService service) {
        this.service = service;
    }

    @GetMapping
    public List<CrmUser> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public CrmUser getById(@PathVariable Long id) { return service.findById(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CrmUser create(@RequestBody CrmUser user) {
        user.setId(null);
        return service.create(user);
    }

    @PutMapping("/{id}")
    public CrmUser update(@PathVariable Long id, @RequestBody CrmUser user) {
        service.findById(id);
        user.setId(id);
        return service.update(id, user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
