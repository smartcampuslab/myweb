package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;

public interface UserDataEpuProvRepositoryDao extends CrudRepository<UserDataEpuProv, String>{
	
	// All method of spring CrudRepository
	// Save, findOne, findAll, count, delete, exists
	
	public UserDataEpuProv findByPracticeId(String practiceId);

}
