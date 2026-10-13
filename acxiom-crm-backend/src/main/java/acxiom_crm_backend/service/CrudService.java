
package acxiom_crm_backend.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public abstract class CrudService<T> {
    protected final JpaRepository<T, Long> repository;

    protected CrudService(JpaRepository<T, Long> repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<T> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public T findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Record not found: " + id));
    }

    public T create(T entity) {
        return repository.save(entity);
    }

    public T update(Long id, T entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Record not found: " + id);
        }
        return repository.save(entity);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Record not found: " + id);
        }
        repository.deleteById(id);
    }
}
