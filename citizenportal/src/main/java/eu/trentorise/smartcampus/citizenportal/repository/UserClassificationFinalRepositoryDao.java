package eu.trentorise.smartcampus.citizenportal.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface UserClassificationFinalRepositoryDao extends CrudRepository<UserClassificationFinal, String> {

	// All method of spring CrudRepository
		// Save, findOne, findAll, count, delete, exists

		List<UserClassificationFinal> findByFinancialEdCode(String code);
		
		List<UserClassificationFinal> findByFinancialEdCodeOrderByPositionAsc(String code);
		
		public UserClassificationFinal findByPracticeId(String practiceId);
	
}
