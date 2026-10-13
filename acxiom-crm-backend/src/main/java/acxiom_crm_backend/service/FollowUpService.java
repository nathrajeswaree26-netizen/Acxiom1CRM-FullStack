
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.FollowUp;
import acxiom_crm_backend.repository.FollowUpRepository;
import org.springframework.stereotype.Service;

@Service
public class FollowUpService extends CrudService<FollowUp> {
    public FollowUpService(FollowUpRepository repository) {
        super(repository);
    }
}
