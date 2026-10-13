
package acxiom_crm_backend.controller;

import acxiom_crm_backend.entity.AuditLog;
import acxiom_crm_backend.service.AuditLogService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit-logs")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuditLogController {
    private final AuditLogService service;

    public AuditLogController(AuditLogService service) {
        this.service = service;
    }

    @GetMapping
    public List<AuditLog> getAll() { return service.findAll(); }

    @GetMapping("/{id}")
    public AuditLog getById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AuditLog create(@RequestBody AuditLog log) {
        log.setId(null);
        return service.create(log);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { service.delete(id); }
}
