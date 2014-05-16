package eu.trentorise.smartcampus.citizenportal.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import eu.trentorise.smartcampus.citizenportal.models.Service;
import eu.trentorise.smartcampus.citizenportal.models.User;

@Controller
public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	private static final Logger logger = Logger.getLogger(UserController.class);
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/user/{userId}")
	public @ResponseBody
	User getUserById(HttpServletRequest request, @PathVariable String userId){
		logger.error(String.format("I am in get userById. Userid: %s", userId));
		
		// here I have to call the service from InfoTn
		User test = new User();
		if(userId.compareTo("43") == 0 || userId.compareTo("57") == 0){
			test.setName("Mattia");
			test.setSurname("Bortolamedi");
			test.setAddress("Via Monte Rovere, 14 - Caldonazzo");
			test.setDateOfBirth(489039055000L);
			test.setMail("mattia.bortolamedi@hotmail.com");
			test.setGender("maschio");
			test.setPhone("340 1122334");
			test.setTaxCode("BRTMTT85L01XXXXX");
			List<String> extraServices = new ArrayList<String>();
			extraServices.add("Menu Mensa");
			extraServices.add("Orario scolastico");
			extraServices.add("Trasporto pubblico");
		} else {
			test.setName("User");
			test.setSurname("Test");
			test.setAddress("Via Verdi, 1 - Trento");
			test.setDateOfBirth(181436400000L);
			test.setMail("test@test.it");
			test.setGender("maschio");
			test.setPhone("340 1122334");
			test.setTaxCode("TSTSRU75XXXXXXXX");
			List<String> extraServices = new ArrayList<String>();
			extraServices.add("Menu Mensa");
			extraServices.add("Orario scolastico");
			extraServices.add("Trasporto pubblico");
		}
		
		return test;
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/rest/citizen/user/{userId}/services")
	public @ResponseBody
	List<Service> getServiceByUserId(HttpServletRequest request, @PathVariable String userId){
		List<Service> serviceList = new ArrayList<Service>();
		
		Service service1 = new Service("http://www.comunitadellavallagarina.tn.it/Upload/documenti/Assistenza%20Scolastica/CALENDARIO%20DEFINITIVO%20PER%20STAMPA.pdf", "Menu mensa");
		Service service2 = new Service("http://www.ttesercizio.it/Extraurbano/Rovereto_Lavarone_DestraAdige_RivaDelGarda.aspx", "Trasporto pubblico");
		if(userId.compareTo("43") == 0){
			serviceList.add(service1);
			serviceList.add(service2);
		} else {
			serviceList.add(service1);
		}
		
		return serviceList;
	}

}
