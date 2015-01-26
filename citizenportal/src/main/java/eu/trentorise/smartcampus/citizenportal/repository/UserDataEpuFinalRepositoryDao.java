package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;

public interface UserDataEpuFinalRepositoryDao  extends CrudRepository<UserDataEpuFinal, String>{

	// All method of spring CrudRepository
	// Save, findOne, findAll, count, delete, exists
		
	public UserDataEpuFinal findByPracticeId(String practiceId);
	
}
