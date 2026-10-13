
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.Lead;
import acxiom_crm_backend.repository.LeadRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class LeadService extends CrudService<Lead> {
    public LeadService(LeadRepository repository) {
        super(repository);
    }
}
