package eu.trentorise.smartcampus.citizenportal.models;

import java.io.Serializable;

public class UserCS implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String nome;
	private String cognome;
	
	private String sesso;
	private String dataNascita;
	private String provinciaNascita;
	private String codiceFiscale;
	private String cellulare;
	private String email;
	
	private String indirizzoRes;
	private String capRes;
	private String cittaRes;
	private String ProvinciaRes;
	private String cittadinanza;
	
	
	public UserCS(){
		super();
		// TODO Auto-generated constructor stub
	}

	public UserCS(String nome, String cognome, String sesso,
			String dataNascita, String provinciaNascita, String codiceFiscale,
			String cellulare, String email, String indirizzoRes, String capRes,
			String cittaRes, String provinciaRes, String cittadinanza) {
		super();
		this.nome = nome;
		this.cognome = cognome;
		this.sesso = sesso;
		this.dataNascita = dataNascita;
		this.provinciaNascita = provinciaNascita;
		this.codiceFiscale = codiceFiscale;
		this.cellulare = cellulare;
		this.email = email;
		this.indirizzoRes = indirizzoRes;
		this.capRes = capRes;
		this.cittaRes = cittaRes;
		ProvinciaRes = provinciaRes;
		this.cittadinanza = cittadinanza;
	}

	public String getNome() {
		return nome;
	}

	public String getCognome() {
		return cognome;
	}

	public String getSesso() {
		return sesso;
	}

	public String getDataNascita() {
		return dataNascita;
	}

	public String getProvinciaNascita() {
		return provinciaNascita;
	}

	public String getCodiceFiscale() {
		return codiceFiscale;
	}

	public String getCellulare() {
		return cellulare;
	}

	public String getEmail() {
		return email;
	}

	public String getIndirizzoRes() {
		return indirizzoRes;
	}

	public String getCapRes() {
		return capRes;
	}

	public String getCittaRes() {
		return cittaRes;
	}

	public String getProvinciaRes() {
		return ProvinciaRes;
	}

	public String getCittadinanza() {
		return cittadinanza;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

	public void setSesso(String sesso) {
		this.sesso = sesso;
	}

	public void setDataNascita(String dataNascita) {
		this.dataNascita = dataNascita;
	}

	public void setProvinciaNascita(String provinciaNascita) {
		this.provinciaNascita = provinciaNascita;
	}

	public void setCodiceFiscale(String codiceFiscale) {
		this.codiceFiscale = codiceFiscale;
	}

	public void setCellulare(String cellulare) {
		this.cellulare = cellulare;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setIndirizzoRes(String indirizzoRes) {
		this.indirizzoRes = indirizzoRes;
	}

	public void setCapRes(String capRes) {
		this.capRes = capRes;
	}

	public void setCittaRes(String cittaRes) {
		this.cittaRes = cittaRes;
	}

	public void setProvinciaRes(String provinciaRes) {
		ProvinciaRes = provinciaRes;
	}

	public void setCittadinanza(String cittadinanza) {
		this.cittadinanza = cittadinanza;
	}
	
	
	
}	

