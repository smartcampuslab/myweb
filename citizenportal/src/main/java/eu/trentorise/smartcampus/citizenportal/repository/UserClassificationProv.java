package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user_class_prov") 	 	
public class UserClassificationProv {
	
	@Id
	private String id;
	private int position;
	private String practiceId;
	private String financialEdCode;
	private String ricName;
	private int famComponents;
	private String score;
	
	public UserClassificationProv() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserClassificationProv(int position, String practiceId, String financialEdCode,
			String ricName, int famComponents, String score) {
		super();
		this.position = position;
		this.practiceId = practiceId;
		this.financialEdCode = financialEdCode;
		this.ricName = ricName;
		this.famComponents = famComponents;
		this.score = score;
	}

	public String getId() {
		return id;
	}

	public int getPosition() {
		return position;
	}

	public String getPracticeId() {
		return practiceId;
	}

	public String getFinancialEdCode() {
		return financialEdCode;
	}

	public String getRicName() {
		return ricName;
	}

	public int getFamComponents() {
		return famComponents;
	}

	public String getScore() {
		return score;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public void setPracticeId(String practiceId) {
		this.practiceId = practiceId;
	}

	public void setFinancialEdCode(String financialEdCode) {
		this.financialEdCode = financialEdCode;
	}

	public void setRicName(String ricName) {
		this.ricName = ricName;
	}

	public void setFamComponents(int famComponents) {
		this.famComponents = famComponents;
	}

	public void setScore(String score) {
		this.score = score;
	}

	@Override
	public String toString() {
		return "UserClassificationProv [id=" + id + ", position=" + position
				+ ", practiceId=" + practiceId + ", financialEdCode="
				+ financialEdCode + ", ricName=" + ricName + ", famComponents="
				+ famComponents + ", score=" + score + "]";
	}

	
}
