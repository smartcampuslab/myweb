package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user_data_epu_prov")
public class UserDataEpuProv {
	
	@Id
	private String id;
	private String practiceId;
	private String ric;
	private String ricTaxCode;
	private String ricBirthDay;
	private String ricBirthPlace;
	private String ricBirthCountry;
	private String protocol;
	private String practiceOpeningDate;
	private String practiceClosingDate;
	private String ente;
	private String resCity;
	private String resStreet;
	private String resPhone;
	private String addressName;
	private String addressCity;
	private String addressPlace;
	private String addressPostalCode;
	private String addressStreet;
	private String addressMail;
	private String addressPhone;
	private String feeAmount;
	
	public UserDataEpuProv() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDataEpuProv(String practiceId, String ric, String ricTaxCode,
			String ricBirthDay, String ricBirthPlace, String ricBirthCountry,
			String protocol, String practiceOpeningDate,
			String practiceClosingDate, String ente, String resCity,
			String resStreet, String resPhone, String addressName,
			String addressCity, String addressPlace, String addressPostalCode,
			String addressStreet, String addressMail, String addressPhone,
			String feeAmount) {
		super();
		this.practiceId = practiceId;
		this.ric = ric;
		this.ricTaxCode = ricTaxCode;
		this.ricBirthDay = ricBirthDay;
		this.ricBirthPlace = ricBirthPlace;
		this.ricBirthCountry = ricBirthCountry;
		this.protocol = protocol;
		this.practiceOpeningDate = practiceOpeningDate;
		this.practiceClosingDate = practiceClosingDate;
		this.ente = ente;
		this.resCity = resCity;
		this.resStreet = resStreet;
		this.resPhone = resPhone;
		this.addressName = addressName;
		this.addressCity = addressCity;
		this.addressPlace = addressPlace;
		this.addressPostalCode = addressPostalCode;
		this.addressStreet = addressStreet;
		this.addressMail = addressMail;
		this.addressPhone = addressPhone;
		this.feeAmount = feeAmount;
	}

	public String getId() {
		return id;
	}

	public String getPracticeId() {
		return practiceId;
	}

	public String getRic() {
		return ric;
	}

	public String getRicTaxCode() {
		return ricTaxCode;
	}

	public String getRicBirthDay() {
		return ricBirthDay;
	}

	public String getRicBirthPlace() {
		return ricBirthPlace;
	}

	public String getRicBirthCountry() {
		return ricBirthCountry;
	}

	public String getProtocol() {
		return protocol;
	}

	public String getPracticeOpeningDate() {
		return practiceOpeningDate;
	}

	public String getPracticeClosingDate() {
		return practiceClosingDate;
	}

	public String getEnte() {
		return ente;
	}

	public String getResCity() {
		return resCity;
	}

	public String getResStreet() {
		return resStreet;
	}

	public String getResPhone() {
		return resPhone;
	}

	public String getAddressName() {
		return addressName;
	}

	public String getAddressCity() {
		return addressCity;
	}

	public String getAddressPlace() {
		return addressPlace;
	}

	public String getAddressPostalCode() {
		return addressPostalCode;
	}

	public String getAddressStreet() {
		return addressStreet;
	}

	public String getAddressMail() {
		return addressMail;
	}

	public String getAddressPhone() {
		return addressPhone;
	}

	public String getFeeAmount() {
		return feeAmount;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setPracticeId(String practiceId) {
		this.practiceId = practiceId;
	}

	public void setRic(String ric) {
		this.ric = ric;
	}

	public void setRicTaxCode(String ricTaxCode) {
		this.ricTaxCode = ricTaxCode;
	}

	public void setRicBirthDay(String ricBirthDay) {
		this.ricBirthDay = ricBirthDay;
	}

	public void setRicBirthPlace(String ricBirthPlace) {
		this.ricBirthPlace = ricBirthPlace;
	}

	public void setRicBirthCountry(String ricBirthCountry) {
		this.ricBirthCountry = ricBirthCountry;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	public void setPracticeOpeningDate(String practiceOpeningDate) {
		this.practiceOpeningDate = practiceOpeningDate;
	}

	public void setPracticeClosingDate(String practiceClosingDate) {
		this.practiceClosingDate = practiceClosingDate;
	}

	public void setEnte(String ente) {
		this.ente = ente;
	}

	public void setResCity(String resCity) {
		this.resCity = resCity;
	}

	public void setResStreet(String resStreet) {
		this.resStreet = resStreet;
	}

	public void setResPhone(String resPhone) {
		this.resPhone = resPhone;
	}

	public void setAddressName(String addressName) {
		this.addressName = addressName;
	}

	public void setAddressCity(String addressCity) {
		this.addressCity = addressCity;
	}

	public void setAddressPlace(String addressPlace) {
		this.addressPlace = addressPlace;
	}

	public void setAddressPostalCode(String addressPostalCode) {
		this.addressPostalCode = addressPostalCode;
	}

	public void setAddressStreet(String addressStreet) {
		this.addressStreet = addressStreet;
	}

	public void setAddressMail(String addressMail) {
		this.addressMail = addressMail;
	}

	public void setAddressPhone(String addressPhone) {
		this.addressPhone = addressPhone;
	}

	public void setFeeAmount(String feeAmount) {
		this.feeAmount = feeAmount;
	}

	@Override
	public String toString() {
		return "UserDataEpuProv [id=" + id + ", practiceId=" + practiceId
				+ ", ric=" + ric + ", ricTaxCode=" + ricTaxCode
				+ ", ricBirthDay=" + ricBirthDay + ", ricBirthPlace="
				+ ricBirthPlace + ", ricBirthCountry=" + ricBirthCountry
				+ ", protocol=" + protocol + ", practiceOpeningDate="
				+ practiceOpeningDate + ", practiceClosingDate="
				+ practiceClosingDate + ", ente=" + ente + ", resCity="
				+ resCity + ", resStreet=" + resStreet + ", resPhone="
				+ resPhone + ", addressName=" + addressName + ", addressCity="
				+ addressCity + ", addressPlace=" + addressPlace
				+ ", addressPostalCode=" + addressPostalCode
				+ ", addressStreet=" + addressStreet + ", addressMail="
				+ addressMail + ", addressPhone=" + addressPhone
				+ ", feeAmount=" + feeAmount + "]";
	}
	
	public String toJSONString() {
		return "{ " +
				"	\"practiceId\": \"" + practiceId + "\"," +
				"	\"ric\": \"" + ric + "\"," +
				" 	\"ricTaxCode\": \"" + ricTaxCode + "\"," +
				"	\"ricBirthDay\": \""+ ricBirthDay + "\"," +
				" 	\"ricBirthPlace\": \"" + ricBirthPlace + "\"," +
				" 	\"ricBirthCountry\": \"" + ricBirthCountry + "\"," +
				" 	\"protocol\": \"" + protocol + "\"," +
				" 	\"practiceOpeningDate\": \"" + practiceOpeningDate + "\"," +
				" 	\"practiceClosingDate\": \"" + practiceClosingDate + "\"," +
				" 	\"ente\": \"" + ente + "\"," +
				" 	\"resCity\": \"" + resCity + "\"," +
				" 	\"resStreet\": \"" + resStreet + "\"," +
				" 	\"resPhone\": \"" + resPhone + "\"," +
				" 	\"addressName\": \"" + addressName + "\"," +
				" 	\"addressCity\": \"" + addressCity + "\"," +
				" 	\"addressPlace\": \"" + addressPlace + "\"," +
				" 	\"addressPostalCode\": \"" + addressPostalCode + "\"," +
				" 	\"addressStreet\": \"" + addressStreet + "\"," +
				" 	\"addressMail\": \"" + addressMail + "\"," +
				" 	\"addressPhone\": \"" + addressPhone + "\"," +
				" 	\"feeAmount\": \"" + feeAmount + "\"" +
			   "}";
	}
	
}
