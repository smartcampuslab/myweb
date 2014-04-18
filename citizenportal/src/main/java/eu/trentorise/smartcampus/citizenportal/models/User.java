package eu.trentorise.smartcampus.citizenportal.models;

import java.io.Serializable;
import java.util.List;

public class User implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private Long userId;
	private String name;
	private String surname;
	private String gender;
	private Long dateOfBirth;
	private String address;
	private String mail;
	private String phone;
	private String taxCode;
	
	// for show services extra
	private List<String> extraServices;
	
	public User(){
		super();
		// TODO Auto-generated constructor stub
	}

	public User(Long userId, String name, String surname, String gender,
			Long dateOfBirth, String address, String mail, String phone, String taxCode) {
		super();
		this.userId = userId;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.address = address;
		this.mail = mail;
		this.phone = phone;
	}

	public Long getUserId() {
		return userId;
	}

	public String getName() {
		return name;
	}

	public String getSurname() {
		return surname;
	}

	public String getGender() {
		return gender;
	}

	public Long getDateOfBirth() {
		return dateOfBirth;
	}

	public String getAddress() {
		return address;
	}

	public String getMail() {
		return mail;
	}

	public String getPhone() {
		return phone;
	}
	
	public String getTaxCode() {
		return taxCode;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setDateOfBirth(Long dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public void setTaxCode(String taxCode){
		this.taxCode = taxCode;
	}

	public List<String> getExtraServices() {
		return extraServices;
	}

	public void setExtraServices(List<String> extraServices) {
		this.extraServices = extraServices;
	}
	
}
