package eu.trentorise.smartcampus.citizenportal.controllers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import eu.trentorise.smartcampus.citizenportal.models.Practice;

@Controller
public class PracticeController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	// Used in tests - remove when the system is connected to info-tn functions
	private List<Practice> Practices;
	
	private static final Logger logger = Logger.getLogger(PracticeController.class);
	
//	@RequestMapping(method = RequestMethod.GET, value = "/rest/practice")
//	public Practice getPractice(HttpServletRequest request, @RequestParam String token)
//			throws SecurityException, AACException {
//		List<GrantedAuthority> list = Collections.<GrantedAuthority> singletonList(new SimpleGrantedAuthority("ROLE_USER"));
//		Authentication auth = new PreAuthenticatedAuthenticationToken(token, "", list);
//		auth = authenticationManager.authenticate(auth);
//		SecurityContextHolder.getContext().setAuthentication(auth);
//		request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
//				SecurityContextHolder.getContext());
//		return new ModelAndView("redirect:/");
//	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/{citizenId}/init")
	public @ResponseBody
	boolean initPractices(HttpServletRequest request, @PathVariable String citizenId){
		boolean created = false;
		
		// now for test I create a Practice List
		Practice p1 = new Practice("1", "tn-01234-x", "Pratica famigliare", 1, 1396510317013L, 4);
		Practice p2 = new Practice("2", "tn-02234-x", "Pratica notarile", 2, 1396510439651L, 3);
		Practice p3 = new Practice("3", "tn-03234-x", "Pratica edilizia extra", 1, 1396511254620L, 3);
		Practice p4 = new Practice("4", "tn-04234-x", "Pratica tassa rifiuti", 2, 1396511279785L, 4);
		Practice p5 = new Practice("5", "tn-05234-x", "Pratica immobiliare", 1,  1397207919214L, 4);
		Practice p6 = new Practice("6", "tn-06234-x", "Pratica assegno nido", 2, 1397207938331L, 3);
		Practice p7 = new Practice("7", "tn-07234-x", "Pratica edilizia", 1, 1397207952876L, 3);
		Practice p8 = new Practice("8", "tn-08234-x", "Pratica tassa rifiuti", 2, 1397207963002L, 4);
		Practice p9 = new Practice("9", "tn-09234-x", "Pratica famigliare", 1, 1396510317013L, 4);
		Practice p10 = new Practice("10", "tn-10234-x", "Pratica notarile", 2, 1397651562336L, 3);
		Practice p11 = new Practice("11", "tn-11234-x", "Pratica edilizia extra", 1, 1397651579883L, 4);
		Practice p12 = new Practice("12", "tn-12234-x", "Pratica tassa rifiuti", 2, 1397651596371L, 3);
		Practice p13 = new Practice("13", "tn-13234-x", "Pratica immobiliare", 1,  1397651615178L, 4);
		Practice p14 = new Practice("14", "tn-14234-x", "Pratica assegno nido", 2, 1397651630494L, 3);
		Practice p15 = new Practice("15", "tn-15234-x", "Pratica assegno medie", 2, 1397651648548L, 4);
				
		// state spec: 1 -> open; 2 -> waiting; 3 -> consolidata; 4 -> da consolidare; 5 -> rimossa;
		
		// List<Practice> Practices = new ArrayList<Practice>();
		Practices = new ArrayList<Practice>();
		Practices.add(p1);
		Practices.add(p2);
		Practices.add(p3);
		Practices.add(p4);
		Practices.add(p5);
		Practices.add(p6);
		Practices.add(p7);
		Practices.add(p8);
		Practices.add(p9);
		Practices.add(p10);
		Practices.add(p11);
		Practices.add(p12);
		Practices.add(p13);
		Practices.add(p14);
		Practices.add(p15);
		created = true;
		
		logger.info("List initialized succesfully");
		
		return created;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/{citizenId}/practice/all")
	public @ResponseBody 
	List<Practice> getPractice(HttpServletRequest request, @PathVariable String citizenId) {
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the list of the citizen practices
		logger.error("I am in get all practice");
		
		return Practices;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/{citizenId}/practice/{practiceId}")
	public @ResponseBody
	Practice getPracticeById(HttpServletRequest request, @PathVariable String citizenId, @PathVariable String practiceId) {
		Practice p = null;
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the specific practice of a citizen
		
//		// now for test I create a Practice and return it
//		Practice p1 = new Practice("1", "it-tn-001234-x", "Pratica famigliare", 1, 1396510317013L, 1);
//		Practice p2 = new Practice("2", "it-tn-002234-x", "Pratica notarile", 2, 1396510439651L, 3);
//		Practice p3 = new Practice("3", "it-tn-003234-x", "Pratica edilizia extra", 1, 1396511254620L, 2);
//		Practice p4 = new Practice("4", "it-tn-004234-x", "Pratica tassa rifiuti", 2, 1396511279785L, 1);
//		Practice p5 = new Practice("5", "it-tn-005234-x", "Pratica immobiliare", 1, 1397207919214L, 1);
//		Practice p6 = new Practice("6", "it-tn-006234-x", "Pratica assegno nido", 2, 1397207938331L, 3);
//		Practice p7 = new Practice("7", "it-tn-007234-x", "Pratica assegno medie", 2, 1397207952876L, 2);
//		Practice p8 = new Practice("8", "it-tn-008234-x", "Pratica tassa rifiuti", 2, 1397207963002L, 1);

		logger.error(String.format("I am in get one practice. Id = %s",practiceId));
		
//		if(practiceId.compareTo("1") == 0){
//			p = p1;
//		} else if(practiceId.compareTo("2") == 0){
//			p = p2;
//		} else if(practiceId.compareTo("3") == 0){
//			p = p3;
//		} else if(practiceId.compareTo("4") == 0){
//			p = p4;
//		} else if(practiceId.compareTo("5") == 0){
//			p = p5;
//		} else if(practiceId.compareTo("6") == 0){
//			p = p6;
//		} else if(practiceId.compareTo("7") == 0){
//			p = p7;
//		} else if(practiceId.compareTo("8") == 0){
//			p = p8;
//		}
		
		for(int i = 0; i < Practices.size(); i++){
			if(Practices.get(i).getId().compareTo(practiceId) == 0){
				p = Practices.get(i);
			}
		}
		
		return p;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/{citizenId}/practice/type/{practiceType}")
	public @ResponseBody
	List<Practice> getPracticeByType(HttpServletRequest request, @PathVariable String citizenId, @PathVariable String practiceType) {
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the specific practice of a citizen
		
		List<Practice> PracticesType = new ArrayList<Practice>();
		
		// now for test I create a Practice and return it
		//Practice p1 = new Practice("1", "it-tn-001234-x", "Pratica famigliare", 1, 1396510317013L, 1);
		//Practice p2 = new Practice("2", "it-tn-002234-x", "Pratica notarile", 2, 1396510439651L, 3);
		//Practice p3 = new Practice("3", "it-tn-003234-x", "Pratica edilizia extra", 1, 1396511254620L, 2);
		//Practice p4 = new Practice("4", "it-tn-004234-x", "Pratica tassa rifiuti", 2, 1396511279785L, 1);
		//Practice p5 = new Practice("5", "it-tn-005234-x", "Pratica immobiliare", 1, 1397207919214L, 1);
		//Practice p6 = new Practice("6", "it-tn-006234-x", "Pratica assegno nido", 2, 1397207938331L, 3);
		//Practice p7 = new Practice("7", "it-tn-007234-x", "Pratica assegno medie", 2, 1397207952876L, 2);
		//Practice p8 = new Practice("8", "it-tn-008234-x", "Pratica tassa rifiuti", 2, 1397207963002L, 1);
		
		logger.error(String.format("I am in get practice by type Type = %s",practiceType));
		
		for(int i = 0; i < Practices.size(); i++){
			if(practiceType.compareTo(Integer.toString(Practices.get(i).getType())) == 0){
				PracticesType.add(Practices.get(i));
			}
		}
		
		//if(practiceType.compareTo("1") == 0){
		//	Practices.add(p1);
		//	Practices.add(p3);
		//	Practices.add(p5);
		//} else if(practiceType.compareTo("2") == 0){
		//	Practices.add(p2);
		//	Practices.add(p4);
		//	Practices.add(p6);
		//	Practices.add(p7);
		//	Practices.add(p8);
		//}
		
		return PracticesType;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/rest/citizen/{citizenId}/practice/{practiceId}")
	public @ResponseBody
	Practice createPractice(HttpServletRequest request, @PathVariable String citizenId, @PathVariable String practiceId, @RequestParam String code, @RequestParam String name, @RequestParam int type, @RequestParam Long openingdate, @RequestParam Integer state) {
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the specific practice of a citizen
		
		// now for test I create a Practice and return it
		Practice p = new Practice(practiceId, code, name, type, openingdate, state);
		logger.error(String.format("I am in create one practice. Id = %s", practiceId));
		
		return p;
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/rest/citizen/{citizenId}/practice/{practiceId}")
	public @ResponseBody
	Practice updatePractice(HttpServletRequest request, @PathVariable String citizenId, @PathVariable String practiceId, @RequestParam String code, @RequestParam String name, @RequestParam int type, @RequestParam String openingdate, @RequestParam String state) {
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the specific practice of a citizen
		
		Practice p = null;
		if (openingdate.contains("\"")) {
			String dateToConvert = openingdate.trim().substring(1,
					openingdate.length() - 1); // for remove the "" that wrap
												// the string
			logger.info(String.format("Date to convert : %s", dateToConvert));

			TimeZone tz = TimeZone.getTimeZone("Italy/Rome");
			Calendar cal = Calendar.getInstance(tz);
			SimpleDateFormat sdf = new SimpleDateFormat(
					"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
			sdf.setCalendar(cal);
			try {
				cal.setTime(sdf.parse(dateToConvert));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			Date dateFormat = cal.getTime();

			// now for test I create a Practice and return it
			p = new Practice(practiceId, code, name, type, Long.valueOf(dateFormat
					.getTime()), Integer.valueOf(state).intValue());
		} else {
			p = new Practice(practiceId, code, name, type, Long.valueOf(openingdate),
					Integer.valueOf(state).intValue());
		}
		
		for(int i = 0; i < Practices.size(); i++){
			if(Practices.get(i).getId().compareTo(practiceId) == 0){
				Practices.remove(i);
				Practices.add(p);
				break;
			}
		}
		
		logger.error(String.format("I am in update one practice. Id: %s, code: %s, name: %s",p.getId(), p.getCode(), p.getName()));

		return p;
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/rest/citizen/{citizenId}/practice/{practiceId}")
	public @ResponseBody
	boolean deletePractice(HttpServletRequest request, @PathVariable String citizenId, @PathVariable String practiceId) {
		//, @RequestParam String token
		//Authentication auth = new PreAuthenticatedAuthenticationToken(token, null);
		//auth = authenticationManager.authenticate(auth);
		// here I invoke the correct rest url to retrieve the specific practice of a citizen
		boolean removed = false;
		Practice p = null;
		
		for(int i = 0; i < Practices.size(); i++){
			if(practiceId.compareTo(Practices.get(i).getId()) == 0){
				p = Practices.get(i);
				Practices.remove(i);
				removed = true;
				break;
			}
		}
		
		if(removed){
			logger.error(String.format("I am in remove one practice. Id: %s", p.getId()));
		} else {
			logger.error("I am in remove one practice. No practices removed");
		}
		
		return removed;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/rest/pdf")
	public @ResponseBody
	String createPdf(HttpServletRequest request, @RequestBody String data) {
		String createdFile = "";
		String path = request.getSession().getServletContext().getRealPath("/pdf/");
		try {
			//logger.error("File path " + path);
			createdFile = create_file(data, path);
		} catch (Exception e) {
			logger.error("Errore in creazione PDF tmp file: " + e.getMessage());
			//e.printStackTrace();
		}
		return createdFile;
	}
	
	//@SuppressWarnings("restriction")
	public static String create_file(String data, String path) throws FileNotFoundException, UnsupportedEncodingException{
		
		byte[] decodedBytes = data.getBytes("ISO-8859-1");
		File dir = new File(path);
		dir.mkdir();
		//File file = new File(path, "scheda_plain_test.pdf");
		File file = null;
		try {
			file = File.createTempFile("scheda_", ".pdf", dir);
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		FileOutputStream fop = new FileOutputStream(file);

		try {
			fop.write(decodedBytes);
			fop.flush();
			fop.close();
		} catch (IOException e) {
			logger.error("Errore in scrittura su file pdf tmp: "+ e.getMessage());
			//e.printStackTrace();
		}
		
		return file.getName();
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/rest/pdf")
	public @ResponseBody
	boolean deletePdf(HttpServletRequest request, @RequestParam String filename) {
		boolean deletion = true;
		String path = request.getSession().getServletContext().getRealPath("/pdf/");
		try {
			//logger.error("File path " + path);
			File toDel = new File(path, filename);
			if(!toDel.delete()){
				deletion = false;
				logger.error("Errore nella cancellazione del file pdf tmp " + filename);
			}
		} catch (Exception e) {
			logger.error("Eccezione in cancellazione PDF tmp file: " + e.getMessage());
			//e.printStackTrace();
		}
		return deletion;
	}
	
}
