package eu.trentorise.smartcampus.citizenportal.controllers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import eu.trentorise.smartcampus.citizenportal.models.Practice;
import eu.trentorise.smartcampus.citizenportal.repository.ClassificationState;
import eu.trentorise.smartcampus.citizenportal.repository.ClassificationStateRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.FinancialEd;
import eu.trentorise.smartcampus.citizenportal.repository.FinancialEdRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationFinal;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationFinalRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationProv;
import eu.trentorise.smartcampus.citizenportal.repository.UserClassificationProvRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataEpuFinal;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataEpuFinalRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataEpuProv;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataEpuProvRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataFinal;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataFinalRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataProv;
import eu.trentorise.smartcampus.citizenportal.repository.UserDataProvRepositoryDao;
import eu.trentorise.smartcampus.citizenportal.service.EmailService;
import eu.trentorise.smartcampus.citizenportal.service.PdfCreator;

@Controller
public class PracticeController {
	
	@Autowired
	@Value("${smartcampus.isTest}")
	private String is_test;
	
	@Autowired
	@Value("${smartcampus.urlws.epu}")
	private String epuUrl;
	
	@Autowired
	@Value("${smartcampus.financialEd.alloggioUE}")
	private String alloggioUE;
	
	@Autowired
	@Value("${smartcampus.financialEd.alloggioExtraUE}")
	private String alloggioExtraUE;
	
	@Autowired
	@Value("${smartcampus.financialEd.contributoUE}")
	private String contributoUE;
	
	@Autowired
	@Value("${smartcampus.financialEd.contributoExtraUE}")
	private String contributoExtraUE;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private ClassificationStateRepositoryDao classStateDao;
	
	@Autowired
	private UserClassificationProvRepositoryDao usrClassDao;
	
	@Autowired
	private UserClassificationFinalRepositoryDao usrClassFinalDao;
	
	@Autowired
	private UserDataProvRepositoryDao usrDataDao;
	
	@Autowired
	private UserDataFinalRepositoryDao usrDataFinalDao;
	
	@Autowired
	private UserDataEpuProvRepositoryDao usrDataEpuDao;
	
	@Autowired
	private UserDataEpuFinalRepositoryDao usrDataEpuFinalDao;
	
	@Autowired
	private FinancialEdRepositoryDao finEdDao;
	
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
	
	// Ws used to check if I am in test or in prod
	@RequestMapping(method = RequestMethod.GET, value = "/rest/checkcf")
	public @ResponseBody
	boolean checkCF(HttpServletRequest request) {
		logger.error("Is Test: " + is_test);
		return (is_test.compareTo("true") == 0) ? true : false;
	}
	
	/* 
     * Send HTML mail with attachment. 
     */
    @RequestMapping(value = "/rest/sendMailWithAttachment", method = RequestMethod.POST)
    public String sendMailWithAttachment(
            @RequestParam("recipientName") final String recipientName,
            @RequestParam("recipientEmail") final String recipientEmail,
            @RequestParam("attachment") final MultipartFile attachment,
            final Locale locale) 
            throws MessagingException, IOException {

    	logger.error(String.format("Mail params: attachment name:%s, attachment size: %d", attachment.getName(), attachment.getSize()));
    	
        this.emailService.sendMailWithAttachment(
                recipientName, recipientEmail, "", "", "", "", "", "", "", "testo mail", attachment.getOriginalFilename(), 
                attachment.getBytes(), attachment.getContentType(), locale);
        return "OK";
        
    }
    
    /* 
     * Send HTML mail with attachment. 
     */
    @RequestMapping(value = "/rest/sendMailWithAttachmentFile", method = RequestMethod.POST)
    public String sendMailWithAttachmentFile(
    		HttpServletRequest request, 
            @RequestParam("recipientName") final String recipientName,
            @RequestParam("recipientEmail") final String recipientEmail,
            @RequestParam("attachment") final File attachment,
            final Locale locale) 
            throws MessagingException, IOException {

    	logger.error(String.format("Mail params: attachment name:%s, attachment size: %d", attachment.getAbsolutePath(), attachment.getTotalSpace()));
    	String path = request.getContextPath();
    	logger.error(String.format("Mail params: attachment path:%s", path));
    	FileUtils.readFileToByteArray(attachment.getAbsoluteFile());
    	
        this.emailService.sendMailWithAttachment(
                recipientName, recipientEmail, "", "", "", "", "", "", "", "testo mail", attachment.getAbsolutePath(), 
                FileUtils.readFileToByteArray(attachment), "application/pdf", locale);
        return "OK";
        
    }
    
    /* 
     * Get classification state. 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rest/getClassState")
    public @ResponseBody String getState(
    		HttpServletRequest request, 
    		@RequestParam("className") final String className) 
            throws Exception {

    	logger.error(String.format("I am in get classState: className %s", className));
    	
    	ClassificationState cstate = classStateDao.findByName(className);
    	
        return cstate.getState();  
    }
    
    /* 
     * Get classification state. 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rest/getClassApprovalDate")
    public @ResponseBody String getApprovalDate(
    		HttpServletRequest request, 
    		@RequestParam("className") final String className) 
            throws Exception {

    	logger.error(String.format("I am in get classState: className %s", className));
    	
    	ClassificationState cstate = classStateDao.findByName(className);
    	
        return cstate.getApprovalDate();  
    }
    
    /* 
     * Set classification state. 
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/rest/setClassState")
    public @ResponseBody String updateState(
    		HttpServletRequest request, 
    		@RequestParam(value = "className", required = true) final String className,
    		@RequestParam(value = "classState", required = true) final String classState) 
            throws Exception {

    	logger.error(String.format("I am in update classState: className %s", className));
    	
    	ClassificationState cstate = classStateDao.findByName(className);
    	cstate.setState(classState);
    	
    	if(classState.compareTo("PROCESSED") == 0){
    		String appDate = String.valueOf(System.currentTimeMillis());
    		cstate.setApprovalDate(appDate);
    	}
    	classStateDao.save(cstate);
    	
        return cstate.getState();  
    }
    
    /* 
     * Get classification state. 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rest/getUserClass")
    public @ResponseBody String getUserClassification(
    		HttpServletRequest request) throws Exception {

    	logger.error(String.format("I am in get userClassification", ""));
    	
        return usrClassDao.findAll().toString();  
    }
    
    /**
     * Method checkUserClassification
     * @param request: http servlet request
     * @param data:JSON object with two key: one for the list of user practice and one for the classification phase (provv or final)
     * @return String with a list of practice id in classification
     * @throws Exception
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/checkUserClass")
    public @ResponseBody String checkUserClassification(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {
    	
       	logger.error(String.format("I am in checkUserClassification. Passed Data: %s", data.toString()));
    	
    	String practicesInClass = "{\"practicesInClass\": [ ";
    	String phase = data.get("phase").toString();
    	JSONArray practiceList = new JSONArray(data.get("practiceList").toString());
    	
	    for(int i = 0; i < practiceList.length(); i++){
	    	String practiceString = "{ \"id\": \"";
	    	JSONObject practice = practiceList.getJSONObject(i);
	    	logger.error(String.format("Practice Data: %s", practice.toString()));
	    	String practiceId = practice.getString("identificativo");
	    	String status = practice.getString("myStatus");
	    	//if(status.compareTo("ACCETTATA") == 0){
	    		// I have to check if the practice is in classification
	    		
	    	if(phase.compareTo("Provv") == 0){
	    		// Case of provv classification
	    		UserClassificationProv practiceInClass = usrClassDao.findByPracticeId(practiceId);
	    		if(practiceInClass != null){
	    			practiceString += practiceId + "\"},";
	    			practicesInClass += practiceString;
	    		}
	    	} else {
	    		// Case of final classification
	    		UserClassificationFinal practiceInClass = usrClassFinalDao.findByPracticeId(practiceId);
	    		if(practiceInClass != null){
	    			practiceString += practiceId + "\"},";
	    			practicesInClass += practiceString;
	    		}
	    	}	
	    	//}
	    }
    	practicesInClass = practicesInClass.substring(0, practicesInClass.length() - 1);
    	//ArrayList<UserClassificationProv> allClass = classStringToArray(data.get("practiceList").toString());
    	practicesInClass += "]}";
    	
    	return practicesInClass;
    }
    
    /* 
     * Clean classification state: Read the classification file and store the data in specific tables in db
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/correctUserClass")
    public @ResponseBody String correctUserClassification(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {

    	//logger.error(String.format("I am in correctUserClassification. Xls data: %s", data));
    	logger.error(String.format("I am in correctUserClassification."));
    	String userClassJSON = "{\"userClassList\": [ ";
    	ArrayList<UserClassificationProv> allClass = null;
    	try {
    		allClass = classStringToArray(data.get("classData").toString());
    	} catch (Exception ex){
    		
    	}
    	if(allClass != null){
	    	for(int i = 0; i < allClass.size(); i++){
	    		usrClassDao.save(allClass.get(i));
	    		String correctId = correctPracticeId(allClass.get(i).getPracticeId());
	    		String dataFromMyDb = getDatiPraticaMyWeb(correctId);
	    		//logger.error(String.format("Data from MyWebDb: %s", dataFromMyDb));
	    		if(dataFromMyDb != null && dataFromMyDb.compareTo("") != 0){
	    			// Here I have to copy data from my db to new classification table db
	    			
	    			JSONObject jsonMywebPractice = new JSONObject(dataFromMyDb);
	    			String mail = jsonMywebPractice.getString("email");
	    			String cf = jsonMywebPractice.getString("userIdentity");
	    			
	//    			String[] allData = dataFromMyDb.split("\"email\":");
	//    			String[] raw_mail = allData[1].split(",");
	//    			String mail = raw_mail[0].replaceAll("\"", "");
	    			logger.error(String.format("Mail from MyWebDb: %s", mail));
	//    			allData = dataFromMyDb.split("\"userIdentity\":");
	//    			String[] raw_cf = allData[1].split(",");
	//    			String cf = raw_cf[0].replaceAll("\"", "");
	    			logger.error(String.format("CF from MyWebDb: %s", cf));
	    			
	    			String phone = "";
	    			// Here I have to call the info tn WS
	    			String result = getDatiPraticaEpu(correctId, cf);
	    			logger.error(String.format("IntoTn WS result: %s", result));
	    			JSONObject jsonEpuPractice = new JSONObject(result);
	    			JSONObject jsonPractice = jsonEpuPractice.getJSONObject("domanda");
	    			JSONObject jsonNucleo = jsonPractice.getJSONObject("nucleo");
	    			JSONArray jsonComponents = jsonNucleo.getJSONArray("componente");
	    			for (int x = 0; x < jsonComponents.length(); x++){
	    				JSONObject component = jsonComponents.getJSONObject(x);
	    				boolean isRic = component.getBoolean("richiedente");
	    				if(isRic){
	    					JSONObject variazioniCompo = component.getJSONObject("variazioniComponente");
	    					phone = variazioniCompo.getString("telefono");
	    					break;
	    				}
	    			}
	    			
	    			UserDataProv userData = new UserDataProv();
	    			userData.setPosition("" + allClass.get(i).getPosition());
	    			userData.setMail(mail);
	    			userData.setRicTaxCode(cf);
	    			userData.setPracticeId(allClass.get(i).getPracticeId());
	    			userData.setPhone(phone);
	    			userData.setRic(allClass.get(i).getRicName());
	    			
	    			// Here I check if the record already exist int the table
	    			UserDataProv usrExist = usrDataDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			if(usrExist != null){
	    				usrDataDao.delete(usrExist);
	    			}
	    			
	    			// Here I save the data in the specific table
	    			usrDataDao.save(userData);
	    			userClassJSON += userData.toJSONString() + ",\n";
	    			
	    		} else {
	    			// Here I have to retrieve information from infoTn db
	    			// I have to check in the specific table of epu data (fill from xls file data)
	    			UserDataEpuProv userDataEpu = usrDataEpuDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			UserDataProv userData = new UserDataProv();
	    			if(userDataEpu != null){
	    				userData.setPosition("" + allClass.get(i).getPosition());
	    				userData.setRic(userDataEpu.getRic());
	    				//userData.setRic_tax_code(cf);
	    				userData.setPracticeId(allClass.get(i).getPracticeId());
	    				userData.setMail(userDataEpu.getAddressMail());
	    				userData.setPhone(userDataEpu.getAddressPhone());
	    			} else {
	    				userData.setPosition("" + allClass.get(i).getPosition());
	    				userData.setPracticeId(allClass.get(i).getPracticeId());
	    				userData.setRic(allClass.get(i).getRicName());
	    			}
	    			
	    			UserDataProv tmp = usrDataDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			if(tmp != null){
	    				usrDataDao.delete(tmp);
	    			}
	    			// Here I save the data in the specific table
	    			usrDataDao.save(userData);
	    			userClassJSON += userData.toJSONString() + ",\n";
	    			
	    		}
	    	}
	    	userClassJSON = userClassJSON.substring(0, userClassJSON.length()-2);
    	}
    	userClassJSON += "]}";
    	
    	
        return userClassJSON;  
    }
    
    /* 
     * Clean classification final state: Read the classification file and store the data in specific tables in db
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/correctUserClassFinal")
    public @ResponseBody String correctUserClassificationFinal(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {

    	//logger.error(String.format("I am in correctUserClassification. Xls data: %s", data));
    	logger.error(String.format("I am in correctUserClassificationFinal."));
    	String userClassJSON = "{\"userClassList\": [ ";
    	ArrayList<UserClassificationFinal> allClass = null;
    	try {
    		allClass = classFinalStringToArray(data.get("classData").toString());
    	} catch(Exception ex){
    		logger.error(String.format("Error in xls file concersion: %s", ex.getMessage()));
    	}
    	if(allClass != null){
	    	for(int i = 0; i < allClass.size(); i++){
	    		usrClassFinalDao.save(allClass.get(i));
	    		String correctId = correctPracticeId(allClass.get(i).getPracticeId());
	    		String dataFromMyDb = getDatiPraticaMyWeb(correctId);
	    		//logger.error(String.format("Data from MyWebDb: %s", dataFromMyDb));
	    		if(dataFromMyDb != null && dataFromMyDb.compareTo("") != 0){
	    			// Here I have to copy data from my db to new classification table db
	    			JSONObject jsonMywebPractice = new JSONObject(dataFromMyDb);
	    			String mail = jsonMywebPractice.getString("email");
	    			String cf = jsonMywebPractice.getString("userIdentity");
	    			
	//    			String[] allData = dataFromMyDb.split("\"email\":");
	//    			String[] raw_mail = allData[1].split(",");
	//    			String mail = raw_mail[0].replaceAll("\"", "");
	    			logger.error(String.format("Mail from MyWebDb: %s", mail));
	//    			allData = dataFromMyDb.split("\"userIdentity\":");
	//    			String[] raw_cf = allData[1].split(",");
	//    			String cf = raw_cf[0].replaceAll("\"", "");
	    			logger.error(String.format("CF from MyWebDb: %s", cf));
	    			
	    			String phone = "";
	    			// Here I have to call the info tn WS
	    			String result = getDatiPraticaEpu(correctId, cf);
	    			JSONObject jsonEpuPractice = new JSONObject(result);
	    			JSONObject jsonPractice = jsonEpuPractice.getJSONObject("domanda");
	    			JSONObject jsonNucleo = jsonPractice.getJSONObject("nucleo");
	    			JSONArray jsonComponents = jsonNucleo.getJSONArray("componente");
	    			boolean found = false;
	    			for (int x = 0; (x < jsonComponents.length() && !found); x++){
	    				JSONObject component = jsonComponents.getJSONObject(x);
	    				boolean isRic = component.getBoolean("richiedente");
	    				if(isRic){
	    					JSONObject variazioniCompo = component.getJSONObject("variazioniComponente");
	    					phone = variazioniCompo.getString("telefono");
	    					found = true;
	    				}
	    			}
	    			
	    			UserDataFinal userData = new UserDataFinal();
	    			userData.setPosition("" + allClass.get(i).getPosition());
	    			userData.setMail(mail);
	    			userData.setRicTaxCode(cf);
	    			userData.setPracticeId(allClass.get(i).getPracticeId());
	    			userData.setPhone(phone);
	    			userData.setRic(allClass.get(i).getRicName());
	    			
	    			// Here I check if the record already exist int the table
	    			UserDataFinal usrExist = usrDataFinalDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			if(usrExist != null){
	    				usrDataFinalDao.delete(usrExist);
	    			}
	    			
	    			// Here I save the data in the specific table
	    			usrDataFinalDao.save(userData);
	    			userClassJSON += userData.toJSONString() + ",\n";
	    			
	    		} else {
	    			// Here I have to retrieve information from infoTn db
	    			// I have to check in the specific table of epu data (fill from xls file data)
	    			UserDataEpuFinal userDataEpu = usrDataEpuFinalDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			UserDataFinal userData = new UserDataFinal();
	    			if(userDataEpu != null){
	    				userData.setPosition("" + allClass.get(i).getPosition());
	    				userData.setRic(userDataEpu.getRic());
	    				//userData.setRic_tax_code(cf);
	    				userData.setPracticeId(allClass.get(i).getPracticeId());
	    				userData.setMail(userDataEpu.getAddressMail());
	    				userData.setPhone(userDataEpu.getAddressPhone());
	    			} else {
	    				userData.setPosition("" + allClass.get(i).getPosition());
	    				userData.setPracticeId(allClass.get(i).getPracticeId());
	    				userData.setRic(allClass.get(i).getRicName());
	    			}
	    			
	    			UserDataFinal tmp = usrDataFinalDao.findByPracticeId(allClass.get(i).getPracticeId());
	    			if(tmp != null){
	    				usrDataFinalDao.delete(tmp);
	    			}
	    			// Here I save the data in the specific table
	    			usrDataFinalDao.save(userData);
	    			userClassJSON += userData.toJSONString() + ",\n";
	    			
	    		}
	    	}
	    	userClassJSON = userClassJSON.substring(0, userClassJSON.length()-2);
    	}	
    	userClassJSON += "]}";
    	
        return userClassJSON;  
    }
    
    /* 
     * Get classification user data. 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rest/getUserData")
    public @ResponseBody String getUserData(
    		HttpServletRequest request,
    		@RequestParam("category") final String category,
    		@RequestParam("tool") final String tool,
    		@RequestParam("phase") final String phase) throws Exception {

    	logger.error(String.format("I am in get userData", ""));
    	
    	String userClassJSON = "{\"userClassList\": [ ";
    	
    	// Here I have to call the method to get all classDataProv from DB and create a json 
    	// string to be returned to angularjs pages   
    	FinancialEd myEdFin = finEdDao.findByCategoryAndTool(category, tool);
    	if(phase.compareTo("Provvisoria") == 0){
	    	List<UserClassificationProv> onlyMyEdList = usrClassDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		UserDataProv p = usrDataDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		userClassJSON += p.toJSONString() + ",\n";
	    	}
	    	if(onlyMyEdList.size() == 0){
	    		userClassJSON += " ";
	    	}
    	} else {
    		List<UserClassificationFinal> onlyMyEdList = usrClassFinalDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		UserDataFinal f = usrDataFinalDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		//logger.error(String.format("UserClassFinal data: %s", f.toString()));
	    		userClassJSON += f.toJSONString() + ",\n";
	    	}
	    	if(onlyMyEdList.size() == 0){
	    		userClassJSON += " ";
	    	}
    	}
    	userClassJSON = userClassJSON.substring(0, userClassJSON.length()-2);
    	userClassJSON += "]}";
    	
        return userClassJSON;  
    }
    
    /* 
     * Set classification state. 
     */
    @RequestMapping(method = RequestMethod.PUT, value = "/rest/setUserClass")
    public @ResponseBody String addUserClassification(
    		HttpServletRequest request, 
    		@RequestParam(value = "className", required = true) final String className,
    		@RequestParam(value = "classState", required = true) final String classState) 
            throws Exception {

    	logger.error(String.format("I am in update classState: className %s", className));
    	
    	ClassificationState cstate = classStateDao.findByName(className);
    	cstate.setState(classState);
    	classStateDao.save(cstate);
    	
        return cstate.getState();  
    }
    
    /* 
     * Correct User Epu Data: Read the epu practice list (provv or final) file and store the data in specific tables in db
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/correctUserEpuData")
    public @ResponseBody String correctUserEpuData(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {

    	logger.error(String.format("I am in correctUserEpuData. Xls data: %s", data));
    	//logger.error(String.format("I am in correctUserEpuData."));
    	
    	String category = data.get("category").toString();
    	String tool = data.get("tool").toString();
    	String phase = data.get("phase").toString();
    	
    	logger.error(String.format("CorrectUserEpuData params: category = %s; tool = %s", category, tool));
    	
    	String userClassJSON = "{\"userEpuList\": [ ";
    	
    	if(phase.compareTo("Provvisoria") == 0){
    		// Provv case
    		ArrayList<UserDataEpuProv> allEpu = null;
    		try {
    			allEpu = epuUserStringToArray(data.get("classData").toString());
    		} catch (Exception ex){
    			logger.error(String.format("CorrectUserEpuData xls conversion exception: %s", ex.getMessage()));
    		}
    		if(allEpu != null){
		    	for(int i = 0; i < allEpu.size(); i++){
		    		UserDataEpuProv tmpEpu = usrDataEpuDao.findByPracticeId(allEpu.get(i).getPracticeId());
		    		if(tmpEpu != null){
		    			usrDataEpuDao.delete(tmpEpu);
		    		}
		    		usrDataEpuDao.save(allEpu.get(i));
		    		
					UserDataProv userData = new UserDataProv();
					String pos = "";
					userData.setRic(allEpu.get(i).getRic());
					//userData.setRic_tax_code(cf);
					userData.setPracticeId(allEpu.get(i).getPracticeId());
					userData.setMail(allEpu.get(i).getAddressMail());
					userData.setPhone(allEpu.get(i).getAddressPhone());
					
					// Check if the practice exists in the specific table
					UserDataProv tmp = usrDataDao.findByPracticeId(allEpu.get(i).getPracticeId());
					if(tmp != null){
						pos = tmp.getPosition();
						usrDataDao.delete(tmp);
						userData.setPosition("" + pos);
						// Here I save the data in the specific table
						usrDataDao.save(userData);
					}	
		    	}
    		}
	    	
	    	// Here I have to call the method to get all classDataProv from DB and create a json 
	    	// string to be returned to angularjs pages   
	    	FinancialEd myEdFin = finEdDao.findByCategoryAndTool(category, tool);
	    	logger.error(String.format("Ed fin finded: %s", myEdFin.toString()));
	    	List<UserClassificationProv> onlyMyEdList = usrClassDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		UserDataProv p = usrDataDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		userClassJSON += p.toJSONString() + ",\n";
	    	}
	    	if(onlyMyEdList.size() == 0){
	    		userClassJSON += " ";
	    	}
	
    	} else {
    		// Final Case
    		ArrayList<UserDataEpuFinal> allEpu = null;
	    	try {
	    		allEpu = epuUserFinalStringToArray(data.get("classData").toString());
	    	} catch (Exception ex){
	    		logger.error(String.format("CorrectUserEpuData xls conversion exception: %s", ex.getMessage()));
	    	}
    		
	    	for(int i = 0; i < allEpu.size(); i++){
	    		UserDataEpuFinal tmpEpu = usrDataEpuFinalDao.findByPracticeId(allEpu.get(i).getPracticeId());
	    		if(tmpEpu != null){
	    			usrDataEpuFinalDao.delete(tmpEpu);
	    		}
	    		usrDataEpuFinalDao.save(allEpu.get(i));
	    		
				UserDataFinal userData = new UserDataFinal();
				String pos = "";
				userData.setRic(allEpu.get(i).getRic());
				//userData.setRic_tax_code(cf);
				userData.setPracticeId(allEpu.get(i).getPracticeId());
				userData.setMail(allEpu.get(i).getAddressMail());
				userData.setPhone(allEpu.get(i).getAddressPhone());
				
				// Check if the practice exists in the specific table
				UserDataFinal tmp = usrDataFinalDao.findByPracticeId(allEpu.get(i).getPracticeId());
				if(tmp != null){
					pos = tmp.getPosition();
					usrDataFinalDao.delete(tmp);
					userData.setPosition("" + pos);
					// Here I save the data in the specific table
					usrDataFinalDao.save(userData);
				}
	    	}
	    	
	    	// Here I have to call the method to get all classDataProv from DB and create a json 
	    	// string to be returned to angularjs pages   
	    	FinancialEd myEdFin = finEdDao.findByCategoryAndTool(category, tool);
	    	List<UserClassificationFinal> onlyMyEdList = usrClassFinalDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		UserDataFinal f = usrDataFinalDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		userClassJSON += f.toJSONString() + ",\n";
	    	}
	    	if(onlyMyEdList.size() == 0){
	    		userClassJSON += " ";
	    	}
    	}
		
    	userClassJSON = userClassJSON.substring(0, userClassJSON.length()-2);
    	userClassJSON += "]}";
    	
        return userClassJSON;  
    }
    
    /* 
     * Method created in 20150202 to evolve the app with new features (mail and phone editing)
     * Update User Epu Data: Used to update the specific user data (mail and phone) of a specific user in classification
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/updateUserEpuData")
    public @ResponseBody String updateUserEpuData(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {
    	String updateResult = "OK";
    	
    	String pId = data.get("practiceId").toString();
    	String mail = data.get("mail").toString();
    	String phone = data.get("phone").toString();
    	
    	UserDataProv userData = usrDataDao.findByPracticeId(pId);
		if(userData != null){
			userData.setMail(mail);
			userData.setPhone(phone);
			String updateDate = String.valueOf(System.currentTimeMillis());
			userData.setManualEdited(updateDate);
			// Here I save the data in the specific table
			usrDataDao.save(userData);
		}
    	
    	return updateResult;
    }
    
    /**
     * Method classStringToArray: used to transform a string with the xls file value to an
     * array of UserClassificationProv Object
     * @param data: string with che xls file value;
     * @return ArrayList of UserClassificationProv objects
     */
    private ArrayList<UserClassificationProv> classStringToArray(String data) throws Exception{
    	
    	logger.error(String.format("Map Object data: %s", data));
    	
    	ArrayList<UserClassificationProv> correctData = new ArrayList<UserClassificationProv>();
    	
    	// Read the financial edition
    	String[] completeHeader = data.split("Edizione:");
    	String[] headers = completeHeader[1].split("Posizione");
    	String[] edHeader = headers[0].split("Categoria:"); 
    	String edFinPeriod = edHeader[0].replaceAll(","," ").trim();
    	String[] catHeader = edHeader[1].split("Strumento:");
    	String edFinCat = catHeader[0].replaceAll(","," ").trim();
    	String edFinTool = catHeader[1].replaceAll(","," ").trim();
    	
    	// Check financial Ed
    	String edFinCode = "";
    	FinancialEd myEd = finEdDao.findByCategoryAndTool(edFinCat, edFinTool);
    	if(myEd == null){
    		edFinCode = getEdFinCode(edFinCat, edFinTool);
    		myEd = new FinancialEd(edFinCode, edFinPeriod, edFinCat, edFinTool);
    		finEdDao.save(myEd);
    	} else {
    		logger.error(String.format("FinancialEd: %s", myEd.toString()));
    		edFinCode = myEd.getCode();
    		List<UserClassificationProv> classListToDel = usrClassDao.findByFinancialEdCode(edFinCode);
    		for(int i = 0; i < classListToDel.size(); i++){
    			//logger.error(String.format("Prov Class Record to del: %s", classListToDel.get(i).toString()));
    			usrClassDao.delete(classListToDel.get(i));
    		}
    	}
    	
    	String[] completeFile = data.split("Punteggio");
    	String body = completeFile[1];
    	String[] records = body.split("0\"");
    	
    	// Fields
    	int position = 0;
    	String practice_id = "";
    	String ric_name = "";
    	int fam_components = 0;
    	String score = "";
    	
    	for(int i = 0; i < records.length-1; i++){
    		//logger.error(String.format("Map Object record[%d]: %s", i, records[i]));
    		String[] fields = records[i].split(",");
    		position = Integer.parseInt(cleanField(fields[0]));
    		practice_id = cleanField(fields[1]);
    		ric_name = cleanField(fields[2]);
    		fam_components = Integer.parseInt(cleanField(fields[3]));
    		score = cleanField(fields[4]) + "," + cleanField(fields[5]) + "0";	//restore the two decimal value
    	
    		UserClassificationProv tmp = new UserClassificationProv(position, practice_id, edFinCode, ric_name, fam_components, score);
    		correctData.add(tmp);
    	}
    	
    	return correctData;
    }
    
    /**
     * Method classStringToArray: used to transform a string with the xls file value to an
     * array of UserClassificationFinal Object
     * @param data: string with che xls file value;
     * @return ArrayList of UserClassificationFinal objects
     */
    private ArrayList<UserClassificationFinal> classFinalStringToArray(String data) throws Exception{
    	
    	//logger.error(String.format("Map Object data: %s", data));
    	
    	ArrayList<UserClassificationFinal> correctData = new ArrayList<UserClassificationFinal>();
    	
    	// Read the financial edition
    	String[] completeHeader = data.split("Edizione:");
    	String[] headers = completeHeader[1].split("Posizione");
    	String[] edHeader = headers[0].split("Categoria:"); 
    	String edFinPeriod = edHeader[0].replaceAll(","," ").trim();
    	String[] catHeader = edHeader[1].split("Strumento:");
    	String edFinCat = catHeader[0].replaceAll(","," ").trim();
    	String edFinTool = catHeader[1].replaceAll(","," ").trim();
    	
    	// Check financial Ed
    	String edFinCode = "";
    	FinancialEd myEd = finEdDao.findByCategoryAndTool(edFinCat, edFinTool);
    	if(myEd == null){
    		edFinCode = getEdFinCode(edFinCat, edFinTool);
    		myEd = new FinancialEd(edFinCode, edFinPeriod, edFinCat, edFinTool);
    		finEdDao.save(myEd);
    	} else {
    		logger.error(String.format("FinancialEd: %s", myEd.toString()));
    		edFinCode = myEd.getCode();
    		List<UserClassificationFinal> classListToDel = usrClassFinalDao.findByFinancialEdCode(edFinCode);
    		for(int i = 0; i < classListToDel.size(); i++){
    			//logger.error(String.format("Prov Class Record to del: %s", classListToDel.get(i).toString()));
    			usrClassFinalDao.delete(classListToDel.get(i));
    		}
    	}
    	
    	String[] completeFile = data.split("Punteggio");
    	String body = completeFile[1];
    	String[] records = body.split("0\"");
    	
    	// Fields
    	int position = 0;
    	String practice_id = "";
    	String ric_name = "";
    	int fam_components = 0;
    	String score = "";
    	
    	for(int i = 0; i < records.length-1; i++){
    		//logger.error(String.format("Map Object record[%d]: %s", i, records[i]));
    		String[] fields = records[i].split(",");
    		position = Integer.parseInt(cleanField(fields[0]));
    		practice_id = cleanField(fields[1]);
    		ric_name = cleanField(fields[2]);
    		fam_components = Integer.parseInt(cleanField(fields[3]));
    		score = cleanField(fields[4]) + "," + cleanField(fields[5]) + "0";	//restore the two decimal value
    	
    		UserClassificationFinal tmp = new UserClassificationFinal(position, practice_id, edFinCode, ric_name, fam_components, score);
    		correctData.add(tmp);
    	}
    	
    	return correctData;
    }
    
    /**
     * Method epuUserStringToArray: used to transform a string with the xls epu data file value to an
     * array of UserDataEpuProv Object
     * @param data: string with che xls file value;
     * @return ArrayList of UserDataEpuProv objects
     */
    private ArrayList<UserDataEpuProv> epuUserStringToArray(String data) throws Exception{
    	
    	logger.error(String.format("Map Object data: %s", data));
    	ArrayList<UserDataEpuProv> correctData = new ArrayList<UserDataEpuProv>();
    	
    	
    	String[] completeFile = data.split("Importo canone\n");
    	String body = completeFile[1];
    	String[] records = body.split("\n");
    	
    	// Fields
    	String ric = "";
    	String data_nascita = "";
    	String comune_nascita = "";
    	String nazione_nascita = "";
    	String protocollo = "";
    	String data_apertura_pratica = "";
    	String data_consolidamento = "";
    	String identificativo = "";
    	String ente = "";
    	String comune_redisenza = "";
    	String indirizzo_residenza = "";
    	String telefono_residenza = "";
    	String nominativo_recapito = "";
    	String indirizzo_recapito = "";
    	String cap_recapito = "";
    	String comune_recapito = "";
    	String localita_recapito = "";
    	String telefono_recapito = "";
    	String importo_canone = "";
    	String mail_recapito = "";
    	
    	for(int i = 0; i < records.length; i++){
    		//logger.error(String.format("Dirty record[%d]: %s", i, records[i]));
    		String correctRecord = cleanCommas(records[i]);
    		
    		// clear all data
			ric = "";
	    	data_nascita = "";
	    	comune_nascita = "";
	    	nazione_nascita = "";
	    	protocollo = "";
	    	data_apertura_pratica = "";
	    	data_consolidamento = "";
	    	identificativo = "";
	    	ente = "";
	    	comune_redisenza = "";
	    	indirizzo_residenza = "";
	    	telefono_residenza = "";
	    	nominativo_recapito = "";
	    	indirizzo_recapito = "";
	    	cap_recapito = "";
	    	comune_recapito = "";
	    	localita_recapito = "";
	    	telefono_recapito = "";
	    	importo_canone = "";
	    	mail_recapito = "";
    		
    		String[] fields = correctRecord.split(",");
    		for(int j = 0; j < fields.length; j++){
    			//logger.error(String.format("Fields[%d]: %s", j, fields[j]));
    			switch(j) {
    				case 0:
    					ric = fields[0];
    					break;
    				case 1:
    					data_nascita = fields[1];
    					break;
    				case 2:
    					comune_nascita = fields[2];
    					break;
    				case 3:
    					nazione_nascita = fields[3];
    					break;
    				case 4:
    					protocollo = fields[4];
    					break;
    				case 5:
    					data_apertura_pratica = fields[5];
    					break;
    				case 6:
    					data_consolidamento = fields[6];
    					break;
    				case 7:
    					identificativo = fields[7];
    					break;
    				case 8:
    					ente = fields[8];
    					break;
    				case 9:
    					comune_redisenza = fields[9];
    					break;
    				case 10:
    					indirizzo_residenza = fields[10];
    					break;
    				case 11:
    					telefono_residenza = fields[11];
    					break;
    				case 12:
    					nominativo_recapito = fields[12];
    					break;
    				case 13:
    					indirizzo_recapito = fields[13];
    					break;
    				case 14:
    					cap_recapito = fields[14];
    					break;
    				case 15:
    					comune_recapito = fields[15];
    					break;
    				case 16:
    					localita_recapito = fields[16];
    					break;
    				case 17:
    					telefono_recapito = fields[17].replaceAll("-", "");
    					break;	
    				case 18:
    					mail_recapito = fields[18];
    					break;
    				case 19:
    					importo_canone = fields[19];
    					break;	
    				default:
    					break;
    			}
    		}
        	
    		UserDataEpuProv tmp = new UserDataEpuProv(identificativo, ric, "", data_nascita, comune_nascita, nazione_nascita, 
    				protocollo, data_apertura_pratica, data_consolidamento, ente, comune_redisenza, indirizzo_residenza, 
    				telefono_residenza, indirizzo_residenza, comune_redisenza, localita_recapito, cap_recapito, indirizzo_recapito, 
    				mail_recapito, telefono_recapito, importo_canone);
    		
    		logger.error(String.format("Object UserData record: %s", tmp.toString()));
    		
    		correctData.add(tmp);
    	}
    	
    	return correctData;
    }
    
    /**
     * Method epuUserFinalStringToArray: used to transform a string with the xls epu data file value to an
     * array of UserDataEpuFinal Object
     * @param data: string with che xls file value;
     * @return ArrayList of UserDataEpuFinal objects
     */
    private ArrayList<UserDataEpuFinal> epuUserFinalStringToArray(String data) throws Exception{
    	
    	//logger.error(String.format("Map Object data: %s", data));
    	ArrayList<UserDataEpuFinal> correctData = new ArrayList<UserDataEpuFinal>();
    	
    	String[] completeFile = data.split("Importo canone\n");
    	String body = completeFile[1];
    	String[] records = body.split("\n");
    	
    	// Fields
    	String ric = "";
    	String data_nascita = "";
    	String comune_nascita = "";
    	String nazione_nascita = "";
    	String protocollo = "";
    	String data_apertura_pratica = "";
    	String data_consolidamento = "";
    	String identificativo = "";
    	String ente = "";
    	String comune_redisenza = "";
    	String indirizzo_residenza = "";
    	String telefono_residenza = "";
    	String nominativo_recapito = "";
    	String indirizzo_recapito = "";
    	String cap_recapito = "";
    	String comune_recapito = "";
    	String localita_recapito = "";
    	String telefono_recapito = "";
    	String importo_canone = "";
    	String mail_recapito = "";
    	
    	for(int i = 0; i < records.length; i++){
    		//logger.error(String.format("Map Object record[%d]: %s", i, records[i]));
    		String correctRecord = cleanCommas(records[i]);
    		
    		// clear all data
			ric = "";
	    	data_nascita = "";
	    	comune_nascita = "";
	    	nazione_nascita = "";
	    	protocollo = "";
	    	data_apertura_pratica = "";
	    	data_consolidamento = "";
	    	identificativo = "";
	    	ente = "";
	    	comune_redisenza = "";
	    	indirizzo_residenza = "";
	    	telefono_residenza = "";
	    	nominativo_recapito = "";
	    	indirizzo_recapito = "";
	    	cap_recapito = "";
	    	comune_recapito = "";
	    	localita_recapito = "";
	    	telefono_recapito = "";
	    	importo_canone = "";
	    	mail_recapito = "";
    		
    		String[] fields = correctRecord.split(",");
    		for(int j = 0; j < fields.length; j++){
    			//logger.error(String.format("Fields[%d]: %s", j, fields[j]));
    			switch(j) {
    				case 0:
    					ric = fields[0];
    					break;
    				case 1:
    					data_nascita = fields[1];
    					break;
    				case 2:
    					comune_nascita = fields[2];
    					break;
    				case 3:
    					nazione_nascita = fields[3];
    					break;
    				case 4:
    					protocollo = fields[4];
    					break;
    				case 5:
    					data_apertura_pratica = fields[5];
    					break;
    				case 6:
    					data_consolidamento = fields[6];
    					break;
    				case 7:
    					identificativo = fields[7];
    					break;
    				case 8:
    					ente = fields[8];
    					break;
    				case 9:
    					comune_redisenza = fields[9];
    					break;
    				case 10:
    					indirizzo_residenza = fields[10];
    					break;
    				case 11:
    					telefono_residenza = fields[11];
    					break;
    				case 12:
    					nominativo_recapito = fields[12];
    					break;
    				case 13:
    					indirizzo_recapito = fields[13];
    					break;
    				case 14:
    					cap_recapito = fields[14];
    					break;
    				case 15:
    					comune_recapito = fields[15];
    					break;
    				case 16:
    					localita_recapito = fields[16];
    					break;
    				case 17:
    					telefono_recapito = fields[17].replaceAll("-", "");
    					break;	
    				case 18:
    					mail_recapito = fields[18];
    					break;
    				case 19:
    					importo_canone = fields[19];
    					break;	
    				default:
    					break;
    			}
    		}
        	
    		UserDataEpuFinal tmp = new UserDataEpuFinal(identificativo, ric, "", data_nascita, comune_nascita, nazione_nascita, 
    				protocollo, data_apertura_pratica, data_consolidamento, ente, comune_redisenza, indirizzo_residenza, 
    				telefono_residenza, indirizzo_residenza, comune_redisenza, localita_recapito, cap_recapito, indirizzo_recapito, 
    				mail_recapito, telefono_recapito, importo_canone);
    		
    		logger.error(String.format("Object UserData record: %s", tmp.toString()));
    		
    		correctData.add(tmp);
    	}
    	
    	return correctData;
    }    
    
    private String cleanField(String value){
    	String cleaned = value.replace('"', ' ').trim();
    	cleaned = cleaned.replace('\n', ' ').trim();
    	return cleaned;
    }
    
    private String cleanCommas(String value){
    	String[] allData = value.split("\"");
    	String cleaned = "";
    	for(int i = 0; i < allData.length; i++){
    		if(i % 2 ==1){
    			allData[i] = allData[i].replace(',', '.');
    		}
    		cleaned = cleaned + allData[i];
    	}
    	
    	return cleaned;
    }
    
    private String correctPracticeId (String practiceId){
    	String corrected = practiceId.substring(5);
    	int corrected_num = Integer.parseInt(corrected);
    	corrected_num++;
    	
    	return String.valueOf(corrected_num);
    }
    
    private String getEdFinCode(String edFinCat, String edFinTool){
    	String code = "";
    	
    	//String alloggioUE = "5651335";
       	//String alloggioExtraUE = "5651336";
       	//String contributoUE = "5651331";
       	//String contributoExtraUE = "5651332";
            	
      	if(edFinTool.compareTo("Locazione di alloggio pubblico") == 0 && edFinCat.compareTo("Cittadini comunitari") == 0){
       		code = alloggioUE;
       	}
      	if(edFinTool.compareTo("Locazione di alloggio pubblico") == 0 && edFinCat.compareTo("Cittadini comunitari") != 0){
       		code = alloggioExtraUE;
       	}
      	if(edFinTool.compareTo("Locazione di alloggio pubblico") != 0 && edFinCat.compareTo("Cittadini comunitari") == 0){
       		code = contributoUE;
       	}
      	if(edFinTool.compareTo("Locazione di alloggio pubblico") != 0 && edFinCat.compareTo("Cittadini comunitari") != 0){
       		code = contributoExtraUE;
       	}
      	
    	return code;
    }
    
    private String getDatiPraticaMyWeb(String practiceId){
    	RestTemplate restTemplate = new RestTemplate();
		
		String result = "";
		String urlWS = "GetPraticaMyWeb?idDomanda=" + practiceId;
		try {
			result = restTemplate.getForObject(epuUrl + urlWS, String.class);
		} catch (Exception ex){
			logger.error(String.format("Exception in proxyController get ws. Method: %s. Details: %s", urlWS, ex.getMessage()));
			//restTemplate.getErrorHandler();
		}
    	
    	return result;
    }
    
    private String getDatiPraticaEpu(String practiceId, String userIdentity){
    	String idEnte = "24";
    	RestTemplate restTemplate = new RestTemplate();
		
		String result = "";
		String urlWS = "GetDatiPratica?idDomanda=" + practiceId + "&idEnte=" + idEnte + "&userIdentity=" + userIdentity;
		try {
			result = restTemplate.getForObject(epuUrl + urlWS, String.class);
		} catch (Exception ex){
			logger.error(String.format("Exception in proxyController get ws. Method: %s. Details: %s", urlWS, ex.getMessage()));
			//restTemplate.getErrorHandler();
		}
    	
    	return result;
    }
    
    /* 
     * Send All Prov Mail: Read all the classification list and send a mail to the specific user
     */
    @RequestMapping(method = RequestMethod.POST, value = "/rest/sendMail")
    public @ResponseBody String sendAllClassDataProv(
    		HttpServletRequest request, 
    		@RequestBody Map<String, Object> data)
            throws Exception {

    	String messages = "{\"epuListResult\": [";
    	logger.error(String.format("I am in sendProvvMail. Xls data: %s", data));
    	
    	String category = data.get("category").toString();
    	String tool = data.get("tool").toString();
    	String phase = data.get("phase").toString();
    	
    	FinancialEd edFin = finEdDao.findByCategoryAndTool(category, tool);
		String edFinCode = edFin.getCode();
    	
    	// Here I have to create a pdf with the classification data
		String path = request.getSession().getServletContext().getRealPath("/pdf/classification/");
		PdfCreator pdfCreator = null;
		
		if(phase.compareTo("Provvisoria") == 0){
			List<UserClassificationProv> efClassification = usrClassDao.findByFinancialEdCodeOrderByPositionAsc(edFinCode);
			pdfCreator = new PdfCreator(path + "/", efClassification, null, edFin, phase);
			File provClasPdf = new File(path + "/ProvvClassification.pdf");
			
			//Iterable<UserClassificationProv> iter = usrClassDao.findAll();
	    	//Iterable<UserDataProv> iter = usrDataDao.findAll();
	    	//for(UserDataProv p: iter){
			//for(UserClassificationProv p: iter){
	    	for(int i = 0; i < efClassification.size(); i++){
	    		UserClassificationProv p = efClassification.get(i);
	    		String message = "";
	    		String sendResult = "";
	    		String ric_name = "";
	    		String practice_id = "";
	    		String position = "";
	    		String score = "";
	    		String ric_mail = "";
				//if(p.getRic().compareTo("BORTOLAMEDI MATTIA") == 0){
		    		// Get the mail params: ric_name, ric_mail, practice_id, score, position, ed_fin
					ric_name = p.getRicName();
					practice_id = p.getPracticeId();
		    		position = String.valueOf(p.getPosition());
		    		score = p.getScore();
		    		
		    		//UserClassificationProv practiceClassData = usrClassDao.findByPracticeId(practice_id);
		    		UserDataProv userClassData = usrDataDao.findByPracticeId(practice_id);
					//String score = practiceClassData.getScore();
		    		ric_mail = userClassData.getMail();
		    		
					String sendStatus = "";
					
					if(ric_mail != null && ric_mail.compareTo("") != 0){
						try {
							sendStatus = this.emailService.sendMailWithAttachment(
									ric_name, ric_mail, practice_id, position, score, phase, edFin.getPeriod(), edFin.getCategory(), edFin.getTool(), "", provClasPdf.getName(), 
									FileUtils.readFileToByteArray(provClasPdf), "application/pdf", Locale.ITALIAN);
						} catch (Exception ex){
							logger.error(String.format("Eccezione in invio mail: %s", ex.getMessage()));
							sendStatus = "";
						}
					} else {
						sendStatus = "KO";
					}
					
					message = "{ \"utente\": \"" + ric_name + "\"," +
							   "\"position\": " + position + "," +
							   "\"id_pratica\": \"" + practice_id + "\",";
					if(sendStatus.compareTo("") != 0){
						if(sendStatus.compareTo("KO") == 0){
							message += "\"esito\": \"NON INVIATA\"},";
							sendResult = "NON INVIATA";
						} else {
							message += "\"esito\": \"INVIO OK\"},";
							sendResult = "INVIO OK";
						}
					} else {
						message += "\"esito\": \"ECCEZIONE INVIO\"},";
						sendResult = "ECCEZIONE INVIO";
					}
					
					userClassData.setMailResult(sendResult);
					usrDataDao.save(userClassData);
					
				//}
				messages += message;
				
			}
		} else {
			List<UserClassificationFinal> efClassification = usrClassFinalDao.findByFinancialEdCodeOrderByPositionAsc(edFinCode);
			pdfCreator = new PdfCreator(path + "/", null, efClassification, edFin, phase);
			File provClasPdf = new File(path + "/FinalClassification.pdf");
			
			
			//Iterable<UserClassificationProv> iter = usrClassDao.findAll();
	    	//Iterable<UserDataProv> iter = usrDataDao.findAll();
	    	//for(UserDataProv p: iter){
			//for(UserClassificationProv p: iter){
	    	for(int i = 0; i < efClassification.size(); i++){
	    		UserClassificationFinal f = efClassification.get(i);
	    		String message = "";
	    		String sendResult = "";
	    		String ric_name = "";
	    		String practice_id = "";
	    		String position = "";
	    		String score = "";
	    		String ric_mail = "";
				//if(p.getRic().compareTo("BORTOLAMEDI MATTIA") == 0){
		    		// Get the mail params: ric_name, ric_mail, practice_id, score, position, ed_fin
					ric_name = f.getRicName();
					practice_id = f.getPracticeId();
		    		position = String.valueOf(f.getPosition());
		    		score = f.getScore();
		    		
		    		//UserClassificationProv practiceClassData = usrClassDao.findByPracticeId(practice_id);
		    		UserDataFinal userClassData = usrDataFinalDao.findByPracticeId(practice_id);
					//String score = practiceClassData.getScore();
		    		ric_mail = userClassData.getMail();
		    		
					String sendStatus = "";
					
					if(ric_mail != null && ric_mail.compareTo("") != 0){
						try {
							sendStatus = this.emailService.sendMailWithAttachment(
									ric_name, ric_mail, practice_id, position, score, phase, edFin.getPeriod(), edFin.getCategory(), edFin.getTool(), "", provClasPdf.getName(), 
									FileUtils.readFileToByteArray(provClasPdf), "application/pdf", Locale.ITALIAN);
						} catch (Exception ex){
							logger.error(String.format("Eccezione in invio mail: %s", ex.getMessage()));
							sendStatus = "";
						}
					} else {
						sendStatus = "KO";
					}
					
					message = "{ \"utente\": \"" + ric_name + "\"," +
							   "\"position\": " + position + "," +
							   "\"id_pratica\": \"" + practice_id + "\",";
					if(sendStatus.compareTo("") != 0){
						if(sendStatus.compareTo("KO") == 0){
							message += "\"esito\": \"NON INVIATA\"},";
							sendResult = "NON INVIATA";
						} else {
							message += "\"esito\": \"INVIO OK\"},";
							sendResult = "INVIO OK";
						}
					} else {
						message += "\"esito\": \"ECCEZIONE INVIO\"},";
						sendResult = "ECCEZIONE INVIO";
					}
					
					userClassData.setMailResult(sendResult);
					usrDataFinalDao.save(userClassData);
					
				//}
				messages += message;
				
			}
		}
    	
    	messages = messages.substring(0, messages.length()-1);
    	messages += "]}";
    	
    	logger.error(String.format("Messages: %s", messages));
    	
    	return messages;
    }
    
    /* 
     * Get classification user data. 
     */
    @RequestMapping(method = RequestMethod.GET, value = "/rest/getMailResultData")
    public @ResponseBody String getMailResultData(
    		HttpServletRequest request,
    		@RequestParam("category") final String category,
    		@RequestParam("tool") final String tool,
    		@RequestParam("phase") final String phase) throws Exception {

    	logger.error(String.format("I am in get mail ResultData %s, %s, %s", category, tool, phase));
    	
    	String messages = "{\"epuListResult\": [";
    	
    	// Here I have to call the method to get all classDataProv from DB and create a json 
    	// string to be returned to angularjs pages   
    	FinancialEd myEdFin = finEdDao.findByCategoryAndTool(category, tool);
    	if(phase.compareTo("Provvisoria") == 0){
	    	List<UserClassificationProv> onlyMyEdList = usrClassDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		String message = "";
	    		UserDataProv p = usrDataDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		message = "{ \"utente\": \"" + p.getRic() + "\"," +
						   "\"position\": " + p.getPosition() + "," +
						   "\"id_pratica\": \"" + p.getPracticeId() + "\"," +
						   "\"esito\": \"" + p.getMailResult() + "\"},";
	    		messages += message;
	    	}
    	} else {
    		List<UserClassificationFinal> onlyMyEdList = usrClassFinalDao.findByFinancialEdCode(myEdFin.getCode());
	    	for(int i = 0; i < onlyMyEdList.size(); i++){
	    		String message = "";
	    		UserDataFinal f = usrDataFinalDao.findByPracticeId(onlyMyEdList.get(i).getPracticeId());
	    		message = "{ \"utente\": \"" + f.getRic() + "\"," +
						   "\"position\": " + f.getPosition() + "," +
						   "\"id_pratica\": \"" + f.getPracticeId() + "\"," +
						   "\"esito\": \"" + f.getMailResult() + "\"},";
	    		messages += message;
	    	}
    	}
    	
    	messages = messages.substring(0, messages.length()-1);
    	messages += "]}";
    	
        return messages;  
    }
	
}
