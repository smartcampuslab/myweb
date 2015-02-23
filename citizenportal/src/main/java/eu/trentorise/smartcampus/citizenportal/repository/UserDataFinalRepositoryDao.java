package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;

public interface UserDataFinalRepositoryDao  extends CrudRepository<UserDataFinal, String>{
	
	// All method of spring CrudRepository
	// Save, findOne, findAll, count, delete, exists
	public UserDataFinal findByPracticeId(String practiceId);
	
}
