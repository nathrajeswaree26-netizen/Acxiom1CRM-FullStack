
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.Opportunity;
import acxiom_crm_backend.repository.OpportunityRepository;
import org.springframework.stereotype.Service;

@Service
public class OpportunityService extends CrudService<Opportunity> {
    public OpportunityService(OpportunityRepository repository) {
        super(repository);
    }
}
