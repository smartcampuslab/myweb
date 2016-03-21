package eu.trentorise.smartcampus.citizenportal.models;

import java.io.Serializable;

public class Municipality implements Serializable {

	private static final long serialVersionUID = 1L;
	private String id;
	private String description;
	
	public Municipality() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Municipality(String id, String description) {
		this.id = id;
		this.description = description;
	}

	public String getId() {
		return id;
	}

	public String getDescription() {
		return description;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
