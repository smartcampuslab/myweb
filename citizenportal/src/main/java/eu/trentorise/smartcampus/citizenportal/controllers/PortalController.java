package eu.trentorise.smartcampus.citizenportal.controllers;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import eu.trentorise.smartcampus.aac.AACException;
//import eu.trentorise.smartcampus.citizenportal.models.SubjectDn;
import eu.trentorise.smartcampus.citizenportal.models.UserCS;
import eu.trentorise.smartcampus.citizenportal.repository.User;
import eu.trentorise.smartcampus.citizenportal.security.MongoUserDetailsService;
import eu.trentorise.smartcampus.citizenportal.service.EmailService;
import eu.trentorise.smartcampus.profileservice.ProfileServiceException;
import eu.trentorise.smartcampus.profileservice.model.AccountProfile;
import eu.trentorise.smartcampus.profileservice.model.BasicProfile;

@Controller
public class PortalController extends SCController{
	
	@Autowired
	@Value("${smartcampus.citizenportal.url}")
	private String mainURL;
	
	@Autowired
	@Value("${smartcampus.urlws.epu}")
	private String epuUrl;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MongoUserDetailsService mongoUserDetailsService;
	
	@Autowired
	private PracticeController practiceController;
	
	@Autowired
	private EmailService emailService;
	
	private static final Logger logger = Logger.getLogger(PortalController.class);
	
	/*
	 * OAUTH2
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/")
	public ModelAndView index_myweb(HttpServletRequest request) throws SecurityException, ProfileServiceException {
		Map<String, Object> model = new HashMap<String, Object>();
		BasicProfile user = null;
		try {
			model.put("token", getToken(request));
			user = profileService.getBasicProfile(getToken(request));
			model.put("user_id", user.getUserId());
			model.put("user_name", user.getName());
			model.put("user_surname", user.getSurname());
			logger.info(String
					.format("I am in get root. User id: " + user.getUserId()));
			AccountProfile account = profileService.getAccountProfile(getToken(request));
			
			Object[] objectArray = account.getAccountNames().toArray();
		
			Map <String, String> mappaAttributi = account.getAccountAttributes(objectArray[0].toString());
			
			UserCS utente = createUserCartaServiziByMap(mappaAttributi);
			
			logger.info(String.format("Account attributes info: %s", mappaAttributi));
			//String mail = getAttributeFromId("openid.ext1.value.email", mappaAttributi);
			//model.put("e_mail", mail);
			model.put("nome", utente.getNome());
			model.put("cognome", utente.getCognome());
			model.put("sesso", utente.getSesso());
			model.put("dataNascita", utente.getDataNascita());
			model.put("provinciaNascita", utente.getProvinciaNascita());
			model.put("luogoNascita", utente.getLuogoNascita());
			model.put("codiceFiscale", utente.getCodiceFiscale());
			model.put("cellulare", utente.getCellulare());
			model.put("email", utente.getEmail());
			model.put("indirizzoRes", utente.getIndirizzoRes());
			model.put("capRes", utente.getCapRes());
			model.put("cittaRes", utente.getCittaRes());
			model.put("provinciaRes", utente.getProvinciaRes());
			model.put("issuerdn", utente.getIssuersdn());
			//model.put("subjectdn", utente.getSubjectdn());
			//String base_tmp = utente.getBase64();
			//model.put("base64", base_tmp.compareTo("") == 0 ? "noAdmin" : base_tmp);
			model.put("base64", utente.getBase64());
			
		} catch (Exception ex){
			logger.error(String.format("Errore di conversione: %s", ex.getMessage()));
			return new ModelAndView("redirect:/logout");
		}
		
		
		// to get all profiles
		//getAllProfiles("5f54739a-5f54-48f0-b230-209bb419f53a");
		
		
		//SubjectDn subj = new SubjectDn(utente.getSubjectdn());
		//logger.error(String.format("Subjextdn : cn: %s; ou: %s: o: %s; c: %s", subj.getCn(), subj.getOu(),subj.getO(),subj.getC()));
		
		return new ModelAndView("index", model);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console/")
	public ModelAndView index_console(ModelMap model, Principal principal) {
//		Map<String, Object> model = new HashMap<String, Object>();
//		model.put("token", getToken(request));
//		BasicProfile user=profileService.getBasicProfile(getToken(request));
//		model.put("user_id", user.getUserId());
//		model.put("user_name", user.getName());
//		model.put("user_surname", user.getSurname());
//		logger.info(String
//				.format("I am in get root. User id: " + user.getUserId()));
//		AccountProfile account = profileService.getAccountProfile(getToken(request));
//		Object[] objectArray = account.getAccountNames().toArray();
//		Map <String, String> mappaAttributi = account.getAccountAttributes(objectArray[0].toString());
//		
//		UserCS utente = createUserCartaServiziByMap(mappaAttributi);
//		
//		logger.info(String.format("Account attributes info: %s", mappaAttributi));
//		model.put("nome", utente.getNome());
//		model.put("cognome", utente.getCognome());
//		model.put("sesso", utente.getSesso());
//		model.put("dataNascita", utente.getDataNascita());
//		model.put("provinciaNascita", utente.getProvinciaNascita());
//		model.put("luogoNascita", utente.getLuogoNascita());
//		model.put("codiceFiscale", utente.getCodiceFiscale());
//		model.put("cellulare", utente.getCellulare());
//		model.put("email", utente.getEmail());
//		model.put("indirizzoRes", utente.getIndirizzoRes());
//		model.put("capRes", utente.getCapRes());
//		model.put("cittaRes", utente.getCittaRes());
//		model.put("provinciaRes", utente.getProvinciaRes());
//		model.put("issuerdn", utente.getIssuersdn());
//		//model.put("subjectdn", utente.getSubjectdn());
//		model.put("base64", utente.getBase64());
		
		String name = principal.getName();
		String mailMessages = "";
		if(model !=null && model.containsKey("mailMessage")){
			mailMessages = model.get("mailMessage").toString();
		}
		User user = mongoUserDetailsService.getUserDetail(name);
		logger.error("I am in get root console. User id: " + name);
		logger.error("I am in get root console. mailMessages: " + mailMessages);
		model.addAttribute("user_name", user.getName());
		model.addAttribute("user_surname", user.getSurname());
		//model.addAttribute("mailMessage", "test messaggio successo");
		return new ModelAndView("console", model);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console/home")
	public ModelAndView index_console_msg(HttpServletRequest request, ModelMap model, Principal principal, 
			@RequestParam(required = false) String message,
			@RequestParam(required = false) String errorMessage) {

		String name = principal.getName();
		User user = mongoUserDetailsService.getUserDetail(name);
		logger.error("I am in get root console. User id: " + name);
		logger.error("I am in get root console. Message: " + message);
		model.addAttribute("user_name", user.getName());
		model.addAttribute("user_surname", user.getSurname());
		model.addAttribute("mailMessage", message);
		model.addAttribute("mailMessageErr", errorMessage);
		return new ModelAndView("console", model);
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/console/")
//	public String index_console(ModelMap model, Principal principal) {
//		//Map<String, Object> model = new HashMap<String, Object>();
//		//model.put("token", getToken(request));
//		//BasicProfile user=profileService.getBasicProfile(getToken(request));
//		//model.put("user_id", user.getUserId());
//		//model.put("user_name", user.getName());
//		//model.put("user_surname", user.getSurname());
//		//logger.info(String
//		//		.format("I am in get root. User id: " + user.getUserId()));
//		
//		String name = principal.getName();
//		logger.error("I am in get root console. User id: " + name);
//		model.addAttribute("user_name", name);
//		
//		//AccountProfile account = profileService.getAccountProfile(getToken(request));
//		//Object[] objectArray = account.getAccountNames().toArray();
//		//Map <String, String> mappaAttributi = account.getAccountAttributes(objectArray[0].toString());
//		return "console";
//	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/ifindex/")
	public ModelAndView index_iframe(HttpServletRequest request) throws SecurityException, ProfileServiceException {
		Map<String, Object> model = new HashMap<String, Object>();
		
		return new ModelAndView("ifindex", model);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/mobile")
	public ModelAndView secureMobile(HttpServletRequest request, @RequestParam String token)
			throws SecurityException, AACException {
		List<GrantedAuthority> list = Collections.<GrantedAuthority> singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		Authentication auth = new PreAuthenticatedAuthenticationToken(token, "", list);
		auth = authenticationManager.authenticate(auth);
		SecurityContextHolder.getContext().setAuthentication(auth);
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
				SecurityContextHolder.getContext());
		return new ModelAndView("redirect:/");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/check")
	public ModelAndView securePage(HttpServletRequest request, @RequestParam(required = false) String code, @RequestParam(required = false) String type)
			throws SecurityException, AACException {
		String redirectUri = mainURL + "/check";
		logger.info(String.format("I am in get check. RedirectUri = %s", redirectUri));
		//logger.info(String.format("type param = %s", type));
		String userToken = aacService.exchngeCodeForToken(code, redirectUri).getAccess_token();
		List<GrantedAuthority> list = Collections.<GrantedAuthority> singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		Authentication auth = new PreAuthenticatedAuthenticationToken(userToken, "", list);
		auth = authenticationManager.authenticate(auth);
		SecurityContextHolder.getContext().setAuthentication(auth);
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
				SecurityContextHolder.getContext());
		return new ModelAndView("redirect:/");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console_check")
	public ModelAndView securePageConsole(HttpServletRequest request, @RequestParam(required = false) String code)
			throws SecurityException, AACException {
		String redirectUri = mainURL + "/console_check";
		logger.info(String.format("I am in get check console. RedirectUri = %s", redirectUri));
		String userToken = aacService.exchngeCodeForToken(code, redirectUri).getAccess_token();
		List<GrantedAuthority> list = Collections.<GrantedAuthority> singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		Authentication auth = new PreAuthenticatedAuthenticationToken(userToken, "", list);
		auth = authenticationManager.authenticate(auth);
		SecurityContextHolder.getContext().setAuthentication(auth);
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
				SecurityContextHolder.getContext());
		// Only for tests and developing! Remove before distribution
		//practiceController.initPractices(request, "1");
		
		return new ModelAndView("redirect:/console/");
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/console/j_spring_security_check")
//	public ModelAndView securePageJConsole(ModelMap model)
//			throws SecurityException, AACException {
//		logger.info(String.format("I am in get check console."));
//		return new ModelAndView("redirect:/console/");
//	}

	@RequestMapping(method = RequestMethod.GET, value = "/login")
	public ModelAndView secure(HttpServletRequest request) {
		String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in get login"));
		return new ModelAndView(
				"redirect:"
						+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, null,
								"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/iframe_login")
	public ModelAndView secure_iframe(HttpServletRequest request) {
		logger.error(String.format("I am in get iframe login"));
//		return new ModelAndView(
//				"redirect:"
//						+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, null,
//								"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
		
		return new ModelAndView("ifindex");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/adc_login")
	public ModelAndView secureLogin(HttpServletRequest request) {
		String redirectUri = mainURL + "/check";
		logger.info(String.format("I am in get login adc"));
		return new ModelAndView(
				"redirect:"
						+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, "/adc",
								"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/console_login")
//	public ModelAndView secureConsole(HttpServletRequest request) {
//		String redirectUri = mainURL + "/console_check";
//		logger.error(String.format("I am in get login console"));
//		return new ModelAndView("redirect:"
//				+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, null,
//						"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
//		//To use the basic autentication I think is necessary to
//		// 1 - change the redirect Uri to a page with a login form
//		// 2 - in the login form invoke a new metho that check the user credential
//		// 3 - if success redirect to home_console else show the error
//	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console/console_login")
	public ModelAndView secureConsole(ModelMap model) {
		logger.error(String.format("I am in get login console"));
		//To use the basic autentication I think is necessary to
		// 1 - change the redirect Uri to a page with a login form
		// 2 - in the login form invoke a new metho that check the user credential
		// 3 - if success redirect to home_console else show the error
		return new ModelAndView("login_console");
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console/logout")
	public ModelAndView secureLogout(ModelMap model) {
		logger.error(String.format("I am in logout console"));
		//To use the basic autentication I think is necessary to
		// 1 - change the redirect Uri to a page with a login form
		// 2 - in the login form invoke a new metho that check the user credential
		// 3 - if success redirect to home_console else show the error
		return new ModelAndView("redirect:/console/logout");
	}
	
    /* 
     * Send HTML mail with attachment. 
     */
    @RequestMapping(value = "/mail/sendMailWithAttachment", method = RequestMethod.POST)
    public ModelAndView sendMailWithAttachment(
    		ModelMap model,
    		@RequestParam(value = "recipientsAll", required = false) final String recipientsAll,
    		@RequestParam(value = "recipientsValues", required = false) final String[] recipientsValues,
//    		@RequestParam(value = "recipientsSel", required = false) final String recipientsSel,
    		@RequestParam(value = "subject", required = false) final String subject,
            @RequestParam(value = "recipients", required = false) final String[] recipients,
            @RequestParam(value = "attachment", required = false) final MultipartFile attachment,
            final Locale locale) 
            throws MessagingException, IOException {

    	logger.error(String.format("I am in SendMail: recipientsAll %s", recipientsAll));
    	//logger.error(String.format("I am in SendMail: recipientsSel %s", recipientsSel));
    	
    	String sendStatus = "";
		String message = "";
		String errorMessage = "";
    	
		String recipientName = "Mattia";
		String recipientEmail = "m.bortolamedi@trentorise.eu";
		
    	if(recipientsAll != null && recipientsAll.compareTo("all") == 0){
    		
    		for(int i = 0; i < recipientsValues.length; i++){
    			logger.error(String.format("SendMail All: recipient[" + i + "]: %s", recipientsValues[i]));
    			if(i == 0){
    				recipientsValues[i] = recipientsValues[i].substring(1);
    			} else if(i == recipientsValues.length - 1){
    				recipientsValues[i] = recipientsValues[i].substring(0, recipientsValues[i].length()-1);
    			}
    			recipientName = recipientsValues[i].replaceAll("\"", "");
    			logger.error(String.format("Name recipient[" + i + "]: %s", recipientName));
    			
    			recipientEmail = getMailsFromCF(recipientName);
    			logger.error(String.format("Mail recipient[" + i + "]: %s", recipientEmail));
    			
    			if((recipientEmail.compareTo("m.bortolamedi@trentorise.eu") == 0)
						|| (recipientEmail.compareTo("mattia.bortolamedi@hotmail.com") == 0)
						|| (recipientEmail.compareTo("regolo85@gmail.com") == 0)
						//|| (recipientEmail.compareTo("mtrainotti@fbk.eu") == 0)
						){
					if (!attachment.isEmpty()){	
						sendStatus = this.emailService.sendMailWithAttachment(
								recipientName, recipientEmail, subject, attachment.getOriginalFilename(), 
								attachment.getBytes(), attachment.getContentType(), locale);
					} else {
						sendStatus = this.emailService.sendSimpleMail(recipientName, recipientEmail, subject, locale);
					}
				} else {
					logger.error(String.format("Mail not send to: %s", recipientEmail));
					sendStatus = "KO";
				}
    			
				if(sendStatus.compareTo("") != 0){
					if(sendStatus.compareTo("KO") == 0){
						errorMessage += "Mail non inviata a " + recipientName + ";,";
					} else {
						message += "Mail inviata correttamente a " + sendStatus +";,";
					}
				} else {
					errorMessage += "Errore invio mail a " + recipientName + ";,";
				}
    			
    		}
    		message = message.substring(0, message.length()-1);
    		errorMessage = errorMessage.substring(0, errorMessage.length()-1);
    		
    	} else {
			
			if(recipients != null){
				for(int i = 0; i < recipients.length; i++){
					logger.error(String.format("I am in SendMail: recipient %s", recipients[i].toString()));
					recipientName = recipients[i].toString();
					// here I have to call the service to retrieve the mail from a cf in myweb db
					recipientEmail = getMailsFromCF(recipientName);
					
					if((recipientEmail.compareTo("m.bortolamedi@trentorise.eu") == 0)
							|| (recipientEmail.compareTo("mattia.bortolamedi@hotmail.com") == 0)
							|| (recipientEmail.compareTo("regolo85@gmail.com") == 0)
							//|| (recipientEmail.compareTo("mtrainotti@fbk.eu") == 0)
							){
						if (!attachment.isEmpty()){	
							sendStatus = this.emailService.sendMailWithAttachment(
									recipientName, recipientEmail, subject, attachment.getOriginalFilename(), 
									attachment.getBytes(), attachment.getContentType(), locale);
						} else {
							sendStatus = this.emailService.sendSimpleMail(recipientName, recipientEmail, subject, locale);
						}
					} else {
						sendStatus = "KO";
					}
					if(sendStatus.compareTo("") != 0){
						if(sendStatus.compareTo("KO") == 0){
							errorMessage += "Mail non inviata a " + recipientName + ";,";
						} else {
							message += "Mail inviata correttamente a " + sendStatus +";,";
						}
					} else {
						errorMessage += "Errore invio mail a " + recipientName + ";,";
					}
					
					//recipientEmail = "m.bortolamedi@trentorise.eu";
				}
				if(message.length() > 0){
					message = message.substring(0, message.length()-1);
				}
				if(errorMessage.length() > 0){
					errorMessage = errorMessage.substring(0, errorMessage.length()-1);
				}
				//message += "";
			}
			logger.error(String.format("I am in SendMail: attachment empty %s", attachment.isEmpty()));
    	}
		
		
		// to m.trainotti
//		recipientName = "Michele";
//		recipientEmail = "mtrainotti@fbk.eu";
//		if (!attachment.isEmpty()){	
//			this.emailService.sendMailWithAttachment(
//					recipientName, recipientEmail, subject, attachment.getOriginalFilename(), 
//					attachment.getBytes(), attachment.getContentType(), locale);
//		} else {
//			this.emailService.sendSimpleMail(recipientName, recipientEmail, subject, locale);
//		}
//		message = "Mail inviata correttamente a " + recipientName;
		
		model.addAttribute("message", message);
		model.addAttribute("errorMessage", errorMessage);
		//model.put("mailMessage", message);
        return new ModelAndView("redirect:/console/home", model);
        //return new ModelAndView("console", model);
        
    }
	
//	@RequestMapping(method = RequestMethod.GET, value = "/console_login_error")
//	public String secureConsoleError(ModelMap model) {
//		logger.error(String.format("I am in get login console error"));
//		model.addAttribute("error", "true");
//		return "login_console";
//	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/prelogin")
	public ModelAndView preSecure(HttpServletRequest request) {
		//String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in pre login"));
		ModelAndView model = new ModelAndView();
		model.setViewName("landing");
		return model;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/cookie_info")
	public ModelAndView preSecureCookie(HttpServletRequest request) {
		//String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in cookie info page"));
		ModelAndView model = new ModelAndView();
		model.setViewName("cookie_info");
		return model;
	}
	
//	@RequestMapping(method = RequestMethod.GET, value = "/logout")
//	public ModelAndView outSecure(HttpServletRequest request) {
//		logger.error(String.format("I am in logout"));
//		Map<String, Object> model_map = new HashMap<String, Object>();
//		
//		return new ModelAndView("landing", model_map);
//	}
	
	
	@SuppressWarnings("rawtypes")
	private String getAttributeFromId(String key, Map map){
		String value = "";
		try{
			value = map.get(key).toString();
		} catch (Exception ex){
			logger.error("No value found for key " + key);
		}
		return value;
	}
	
	@SuppressWarnings("rawtypes")
	private UserCS createUserCartaServiziByMap(Map map){
		String name = getAttributeFromId("eu.trentorise.smartcampus.givenname", map);
		String surname = getAttributeFromId("eu.trentorise.smartcampus.surname", map);
		String sesso = getAttributeFromId("pat_attribute_sesso", map);
		String dataNascita = getAttributeFromId("pat_attribute_datanascita", map);
		String provinciaNascita = getAttributeFromId("pat_attribute_provincianascita", map);
		String luogoNascita = getAttributeFromId("pat_attribute_luogonascita", map);
		String codiceFiscale = getAttributeFromId("pat_attribute_codicefiscale", map);
		String cellulare = getAttributeFromId("pat_attribute_cellulare", map);
		String email = getAttributeFromId("pat_attribute_email", map);
		String indirizzoRes = getAttributeFromId("pat_attribute_indirizzoresidenza", map);
		String capRes = getAttributeFromId("pat_attribute_capresidenza", map);
		String cittaRes = getAttributeFromId("pat_attribute_cittaresidenza", map);
		String provinciaRes = getAttributeFromId("pat_attribute_provinciaresidenza", map);
		String issuerdn = getAttributeFromId("pat_attribute_issuerdn", map);
		String subjectdn = getAttributeFromId("pat_attribute_subjectdn", map);
		String base64 = getAttributeFromId("pat_attribute_base64", map);
		
		return new UserCS(name, surname, sesso, dataNascita, provinciaNascita, luogoNascita, codiceFiscale, cellulare, email, indirizzoRes, capRes, cittaRes, provinciaRes, issuerdn, subjectdn, base64);	
	}
	
	private String getMailsFromCF(String cf){
		RestTemplate restTemplate = new RestTemplate();
		String result = "";
		String urlWS = String.format("GetPraticheMyWeb?userIdentity=%s", cf);
		try {
			result = restTemplate.getForObject(epuUrl + urlWS, String.class);
		} catch (Exception ex){
			logger.error(String.format("Exception in ws get mail from cs. Method: %s. Details: %s", urlWS, ex.getMessage()));
			//restTemplate.getErrorHandler();
		}
		
		//logger.error(String.format("WS get mail from cs Result: %s.", result));
		String mail = correctMailData(result);
		logger.error(String.format("WS get mail - corrected mail: %s", mail));
		
		return mail;
	}
	
	private String correctMailData(String practiceList){
		String userMail = "";
		String practices[] = practiceList.split("\"email\":");
		for(int i = 1; i < practices.length; i++){
			String datas[] = practices[i].split(",");
			String mail = datas[0];
			if(mail.compareTo("null") != 0){
				userMail = mail.replaceAll("\"", ""); // to remove the " char
				break;
			}
		}
		
		return userMail;
	};
	
//	private String getAllProfiles(String token) throws SecurityException, ProfileServiceException{
//		String result = "OK";
//		
//		List<AccountProfile> profiles = null;
//		//All profiles
//		
//		List<BasicProfile> allProfiles = profileService.getBasicProfiles(null, token);
//		for(int i = 0; i < allProfiles.size(); i++){
//			BasicProfile basic = allProfiles.get(i);
//			profiles = profileService.getAccountProfilesByUserId(Collections.singletonList(basic.getUserId()), token);
//			System.err.println(basic.toString() + ", " + profiles);
//			logger.error(String.format("User Account[%d]: ", i));
//		}
//		
//		return result;
//	}
	
	

}
