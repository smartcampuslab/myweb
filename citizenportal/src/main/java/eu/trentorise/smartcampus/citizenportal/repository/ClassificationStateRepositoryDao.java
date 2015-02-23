package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;

public interface ClassificationStateRepositoryDao extends CrudRepository<ClassificationState, String>{
	
	public ClassificationState findByName(String name);
	
}
