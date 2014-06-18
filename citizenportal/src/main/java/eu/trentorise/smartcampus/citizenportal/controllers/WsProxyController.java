package eu.trentorise.smartcampus.citizenportal.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
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

	@RequestMapping(method = RequestMethod.GET, value = "/rest/allGet")
	public @ResponseBody
	String getAll(HttpServletRequest request, @RequestParam String urlWS){
		logger.error(String.format("I am in proxyController get ws. Method: %s", urlWS));
		
		RestTemplate restTemplate = new RestTemplate();
		
		String result = restTemplate.getForObject(urlWS, String.class);
		
		return result;	
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/rest/allPost")
	public @ResponseBody
	String postAll(HttpServletRequest request, @RequestParam String urlWS, @RequestBody Map<String, String> data){
		logger.error(String.format("I am in proxyController post ws. Method: %s", urlWS));
		
		RestTemplate restTemplate = new RestTemplate();
		
		String result = restTemplate.postForObject(urlWS, data, String.class);
		return result;	
	}
	
}
