package eu.trentorise.smartcampus.citizenportal.models;

import java.io.Serializable;

public class Service implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private String addressUrl;
	private String name;
	
	public Service(){
		super();
	}
	
	public Service(String addressUrl, String name) {
		super();
		this.addressUrl = addressUrl;
		this.name = name;
	}
	public String getAddressUrl() {
		return addressUrl;
	}
	public String getName() {
		return name;
	}
	public void setAddressUrl(String addressUrl) {
		this.addressUrl = addressUrl;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	

}
