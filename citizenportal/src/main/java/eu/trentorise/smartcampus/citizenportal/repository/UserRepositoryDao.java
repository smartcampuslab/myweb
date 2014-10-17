package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.repository.CrudRepository;
import eu.trentorise.smartcampus.citizenportal.repository.User;

public interface UserRepositoryDao extends CrudRepository<User, String>{
	
	public User findByUsername(String username);
	
}
