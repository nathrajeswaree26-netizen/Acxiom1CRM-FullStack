
package acxiom_crm_backend.repository;

import acxiom_crm_backend.entity.CrmUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrmUserRepository extends JpaRepository<CrmUser, Long> {
}
