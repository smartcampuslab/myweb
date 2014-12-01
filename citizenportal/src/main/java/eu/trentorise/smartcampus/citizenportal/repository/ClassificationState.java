package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="class_state") 	 	
public class ClassificationState {
	
	@Id
	private String id;
	private String name;
	private String type;
	private String state;

	public ClassificationState() {
		super();		
	}

	public ClassificationState(String id, String name, String type, String state) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.state = state;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public String getType() {
		return type;
	}

	public String getState() {
		return state;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setState(String state) {
		this.state = state;
	}

	@Override
	public String toString() {
		return "ClassificationState [id=" + id + ", name=" + name + ", type="
				+ type + ", state=" + state + "]";
	}
	
}
