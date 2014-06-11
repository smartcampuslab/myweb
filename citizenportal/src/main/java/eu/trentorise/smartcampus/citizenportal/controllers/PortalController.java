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
		logger.error(String
				.format("I am in get root. User id: " + user.getUserId()));
		AccountProfile account = profileService.getAccountProfile(getToken(request));
		Object[] objectArray = account.getAccountNames().toArray();
		Map <String, String> mappaAttributi = account.getAccountAttributes(objectArray[0].toString());
		//String[] accountNames = Arrays.copyOf(objectArray, objectArray.length, String[].class);
		logger.error(String.format("Account profile info: %s", objectArray));
		logger.error(String.format("Account attributes info: %s", mappaAttributi));
		String mail = getAttributeFromId("openid.ext1.value.email", mappaAttributi);
		model.put("e_mail", mail);
		return new ModelAndView("index", model);
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
	public ModelAndView securePage(HttpServletRequest request, @RequestParam(required = false) String code)
			throws SecurityException, AACException {
		String redirectUri = mainURL + "/check";
		logger.error(String.format("I am in get check. RedirectUri = %s", redirectUri));
		String userToken = aacService.exchngeCodeForToken(code, redirectUri).getAccess_token();
		List<GrantedAuthority> list = Collections.<GrantedAuthority> singletonList(new SimpleGrantedAuthority("ROLE_USER"));
		Authentication auth = new PreAuthenticatedAuthenticationToken(userToken, "", list);
		auth = authenticationManager.authenticate(auth);
		SecurityContextHolder.getContext().setAuthentication(auth);
		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
				SecurityContextHolder.getContext());
		// Only for tests and developing! Remove before distribution
		practiceController.initPractices(request, "1");
		
		return new ModelAndView("redirect:/");
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
	
	
	private String getAttributeFromId(String key, Map map){
		String value = "";
		try{
			value = map.get(key).toString();
		} catch (Exception ex){
			logger.error("No user mail found.");
		}
		return value;
	}
	
	

}
