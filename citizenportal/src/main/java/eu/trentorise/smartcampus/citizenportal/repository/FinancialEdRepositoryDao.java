package eu.trentorise.smartcampus.citizenportal.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface FinancialEdRepositoryDao extends CrudRepository<FinancialEd, String>{
	
	public FinancialEd findByCode(String code);
	public FinancialEd findByCategoryAndTool(String category, String tool);
	
}
