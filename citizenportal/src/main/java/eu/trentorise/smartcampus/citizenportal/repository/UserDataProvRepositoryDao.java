package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;

public interface UserDataProvRepositoryDao extends CrudRepository<UserDataProv, String>{

	// All method of spring CrudRepository
	// Save, findOne, findAll, count, delete, exists
	public UserDataProv findByPracticeId(String practiceId);
	
}
