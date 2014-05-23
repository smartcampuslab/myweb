package eu.trentorise.smartcampus.citizenportal.models;

import java.io.Serializable;

public class Practice implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String id;
	private String code;
	private String name;
	private int type;	// 1 edil abitativa, 2 assegni
	private long openingDate;
	private int state;
	
	public Practice() {
		super();
		// TODO Auto-generated constructor stub
	}
		
	public Practice(String id, String code, String name, int type, long openingDate,
			int state) {
		super();
		this.id = id;
		this.code = code;
		this.name = name;
		this.type = type;
		this.openingDate = openingDate;
		this.state = state;
	}

	public String getId() {
		return id;
	}
	
	public String getCode() {
		return code;
	}
	
	public String getName() {
		return name;
	}
	
	public int getType() {
		return type;
	}

	public long getOpeningDate() {
		return openingDate;
	}
	
	public int getState() {
		return state;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public void setName(String name) {
		this.name = name;
	}

	public void setType(int type) {
		this.type = type;
	}
	
	public void setOpeningDate(long openingDate) {
		this.openingDate = openingDate;
	}
	
	public void setState(int state) {
		this.state = state;
	}

}
