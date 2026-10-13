
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.AuditLog;
import acxiom_crm_backend.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

@Service
public class AuditLogService extends CrudService<AuditLog> {
    public AuditLogService(AuditLogRepository repository) {
        super(repository);
    }
}
