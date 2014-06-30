package eu.trentorise.smartcampus.citizenportal.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class WsProxyController {
	
	private static final Logger logger = Logger.getLogger(WsProxyController.class);

	@Autowired
	@Value("${smartcampus.urlws.epu}")
	private String epuUrl;
	
//	@Autowired
//	@Value("${smartcampus.mode.test}")
//	private String isTest;
//	
//	@Autowired
//	@Value("${smartcampus.cf.test}")
//	private String codFiscale;
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/allGet")
	public @ResponseBody
	String getAll(HttpServletRequest request, @RequestParam String urlWS){
		logger.error(String.format("I am in proxyController get ws. Method: %s", urlWS));
		
		RestTemplate restTemplate = new RestTemplate();
		
		String result = restTemplate.getForObject(epuUrl + urlWS, String.class);
		
		return result;	
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/rest/allPost")
	public @ResponseBody
	String postAll(HttpServletRequest request, @RequestParam String urlWS, @RequestBody Map<String, Object> data){
		logger.error(String.format("I am in proxyController post ws. Method: %s", urlWS));
		
//		if(isTest.compareTo("true") == 0){
//			if(urlWS.compareTo("GetPDF")==0){
//				logger.error(String.format("Data passed to proxy : %s", data));
//			
//				
//				//((HashMap)data.get("")).get("");
//				Map<String, String> value = null;
//				try{
//					value = (Map<String, String>)data.get("domandaInfo");
//					String userIdentity = value.get("userIdentity");
//					logger.error(String.format("User id: %s",userIdentity));
//					
//				} catch (Exception ex){
//					logger.error(String.format("No value found for key :%s" + value));
//				}
//				
//				logger.error(String.format("Value readed : %s", value));
//			}
//		}
		
		RestTemplate restTemplate = new RestTemplate();
		
		String result = restTemplate.postForObject(epuUrl + urlWS, data, String.class);
		return result;	
	}
	
}
