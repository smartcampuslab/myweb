package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user_data_prov") 	 
public class UserDataProv {
	
	@Id
	private String id;
	private String ricTaxCode;
	private String ric;
	private String practiceId;
	private String mail;
	private String phone;
	private String address;
	private String city;
	private String position;
	private String mailResult;
	private String manualEdited;

	public UserDataProv() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDataProv(String ricTaxCode, String ric, String practiceId,
			String mail, String phone, String address, String city, String position) {
		super();
		this.ricTaxCode = ricTaxCode;
		this.ric = ric;
		this.practiceId = practiceId;
		this.mail = mail;
		this.phone = phone;
		this.address = address;
		this.city = city;
		this.position = position;
	}

	public String getId() {
		return id;
	}

	public String getRicTaxCode() {
		return ricTaxCode;
	}

	public String getRic() {
		return ric;
	}

	public String getPracticeId() {
		return practiceId;
	}

	public String getMail() {
		return mail;
	}

	public String getPhone() {
		return phone;
	}

	public String getPosition() {
		return position;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setRicTaxCode(String ricTaxCode) {
		this.ricTaxCode = ricTaxCode;
	}

	public void setRic(String ric) {
		this.ric = ric;
	}

	public void setPracticeId(String practiceId) {
		this.practiceId = practiceId;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getMailResult() {
		return mailResult;
	}

	public void setMailResult(String mailResult) {
		this.mailResult = mailResult;
	}

	public String getManualEdited() {
		return manualEdited;
	}

	public void setManualEdited(String manualEdited) {
		this.manualEdited = manualEdited;
	}


	@Override
	public String toString() {
		return "UserDataProv [id=" + id + ", ricTaxCode=" + ricTaxCode
				+ ", ric=" + ric + ", practiceId=" + practiceId + ", mail="
				+ mail + ", phone=" + phone + ", address=" + address
				+ ", city=" + city + ", position=" + position + ", mailResult="
				+ mailResult + ", manualEdited=" + manualEdited + "]";
	}

	public String toJSONString() {
		String correctedMail = mail;
		String correctedPhone = phone;
		String correctedAddress = address;
		String correctedCity = city;
		String correctedMailResult = mailResult;
		String correctedManualEdited = manualEdited;
		if (correctedMail != null) {
			correctedMail = "\"" + correctedMail + "\"";
		}
		if (correctedPhone != null) {
			correctedPhone = "\"" + correctedPhone + "\"";
		}
		if (correctedAddress != null) {
			correctedAddress = "\"" + correctedAddress + "\"";
		}
		if (correctedCity != null) {
			correctedCity = "\"" + correctedCity + "\"";
		}
		if (correctedMailResult != null) {
			correctedMailResult = "\"" + correctedMailResult + "\"";
		}
		if (correctedManualEdited != null){
			correctedManualEdited = "\"" + correctedManualEdited + "\"";
		}
		return "{" +
				"  \"practiceId\": \"" + practiceId  + "\"," +
				"  \"ric\": \"" + ric  + "\"," +
				"  \"ricTaxCode\": \"" + ricTaxCode  + "\"," +
				"  \"mail\": " + correctedMail  + "," +
				"  \"address\": " + correctedAddress  + "," +
				"  \"city\": " + correctedCity  + "," +
				"  \"phone\": " + correctedPhone  + "," +
				"  \"position\": " + position + "," +
				"  \"mailResult\": " + correctedMailResult + "," +
				"  \"manualEdited\": " + correctedManualEdited +
				"}";
//		return "{" +
//		"  practiceId: \"" + practiceId  + "\"," +
//		"  ric: \"" + ric  + "\"," +
//		"  ricTaxCode: \"" + ricTaxCode  + "\"," +
//		"  mail: \"" + mail  + "\"," +
//		"  phone: \"" + phone  + "\"" +
//		"}";
	}

}
