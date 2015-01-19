package eu.trentorise.smartcampus.citizenportal.repository;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="ed_fin")
public class FinancialEd {
	
	@Id
	private String id;
	private String code;
	private String period;
	private String category;
	private String tool;
	
	public FinancialEd() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public FinancialEd(String code, String period, String category, String tool) {
		super();
		this.code = code;
		this.period = period;
		this.category = category;
		this.tool = tool;
	}

	public String getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public String getPeriod() {
		return period;
	}

	public String getCategory() {
		return category;
	}

	public String getTool() {
		return tool;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setTool(String tool) {
		this.tool = tool;
	}

	@Override
	public String toString() {
		return "FinancialEd [id=" + id + ", code=" + code + ", period="
				+ period + ", category=" + category + ", tool=" + tool + "]";
	}

}
