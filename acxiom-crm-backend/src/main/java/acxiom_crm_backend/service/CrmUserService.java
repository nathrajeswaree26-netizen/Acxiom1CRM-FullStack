
package acxiom_crm_backend.service;

import acxiom_crm_backend.entity.CrmUser;
import acxiom_crm_backend.repository.CrmUserRepository;
import org.springframework.stereotype.Service;

@Service
public class CrmUserService extends CrudService<CrmUser> {
    public CrmUserService(CrmUserRepository repository) {
        super(repository);
    }
}
