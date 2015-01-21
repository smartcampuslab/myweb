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
	private String position;
	
	public UserDataProv() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public UserDataProv(String ricTaxCode, String ric, String practiceId,
			String mail, String phone, String position) {
		super();
		this.ricTaxCode = ricTaxCode;
		this.ric = ric;
		this.practiceId = practiceId;
		this.mail = mail;
		this.phone = phone;
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

	public void setPosition(String position) {
		this.position = position;
	}

	@Override
	public String toString() {
		return "UserDataProv [id=" + id + ", ricTaxCode=" + ricTaxCode
				+ ", ric=" + ric + ", practiceId=" + practiceId + ", mail="
				+ mail + ", phone=" + phone + ", position=" + position + "]";
	}

	public String toJSONString(){
		String correctedMail = mail;
		String correctedPhone = phone;
		if (correctedMail != null){
			correctedMail = "\"" + correctedMail + "\"";
		}
		if (correctedPhone != null){
			correctedPhone = "\"" + correctedPhone + "\"";
		}
		return "{" +
				"  \"practiceId\": \"" + practiceId  + "\"," +
				"  \"ric\": \"" + ric  + "\"," +
				"  \"ricTaxCode\": \"" + ricTaxCode  + "\"," +
				"  \"mail\": " + correctedMail  + "," +
				"  \"phone\": " + correctedPhone  + "," +
				"  \"position\": " + position + 
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
