
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.Activity;
import acxiom_crm_backend.repository.ActivityRepository;
import org.springframework.stereotype.Service;

@Service
public class ActivityService extends CrudService<Activity> {
    public ActivityService(ActivityRepository repository) {
        super(repository);
    }
}
