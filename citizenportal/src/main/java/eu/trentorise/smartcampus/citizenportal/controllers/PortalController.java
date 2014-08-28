package eu.trentorise.smartcampus.citizenportal.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import eu.trentorise.smartcampus.aac.AACException;
//import eu.trentorise.smartcampus.citizenportal.models.SubjectDn;
import eu.trentorise.smartcampus.citizenportal.models.UserCS;
import eu.trentorise.smartcampus.profileservice.ProfileServiceException;
import eu.trentorise.smartcampus.profileservice.model.AccountProfile;
import eu.trentorise.smartcampus.profileservice.model.BasicProfile;

@Controller
public class PortalController extends SCController{
	
	@Autowired
	@Value("${smartcampus.citizenportal.url}")
	private String mainURL;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PracticeController practiceController;
	
	private static final Logger logger = Logger.getLogger(PortalController.class);
	
	/*
	 * OAUTH2
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/")
	public ModelAndView index(HttpServletRequest request) throws SecurityException, ProfileServiceException {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("token", getToken(request));
		BasicProfile user=profileService.getBasicProfile(getToken(request));
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
		model.put("base64", utente.getBase64());
		
		//SubjectDn subj = new SubjectDn(utente.getSubjectdn());
		//logger.error(String.format("Subjextdn : cn: %s; ou: %s: o: %s; c: %s", subj.getCn(), subj.getOu(),subj.getO(),subj.getC()));
		
		return new ModelAndView("index", model);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/console/")
	public ModelAndView index_console(HttpServletRequest request) throws SecurityException, ProfileServiceException {
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("token", getToken(request));
		BasicProfile user=profileService.getBasicProfile(getToken(request));
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
		model.put("base64", utente.getBase64());
		
		//SubjectDn subj = new SubjectDn(utente.getSubjectdn());
		//logger.error(String.format("Subjextdn : cn: %s; ou: %s: o: %s; c: %s", subj.getCn(), subj.getOu(),subj.getO(),subj.getC()));
		
		return new ModelAndView("console", model);
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

	@RequestMapping(method = RequestMethod.GET, value = "/login")
	public ModelAndView secure(HttpServletRequest request) {
		String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in get login"));
		return new ModelAndView(
				"redirect:"
						+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, null,
								"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
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
	
	@RequestMapping(method = RequestMethod.GET, value = "/console_login")
	public ModelAndView secureConsole(HttpServletRequest request) {
		//String redirectUri = mainURL + "/console_check";
		String redirectUri = mainURL + "/console_check";
		logger.error(String.format("I am in get login console"));
		return new ModelAndView("redirect:"
				+ aacService.generateAuthorizationURIForCodeFlow(redirectUri, null,
						"smartcampus.profile.basicprofile.me,smartcampus.profile.accountprofile.me", null));
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/prelogin")
	public ModelAndView preSecure(HttpServletRequest request) {
		//String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in pre login"));
		ModelAndView model = new ModelAndView();
		model.setViewName("landing");
		return model;
	}
	
	
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
	
	

}
