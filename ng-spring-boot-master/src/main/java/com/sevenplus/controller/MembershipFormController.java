package com.sevenplus.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sevenplus.db.model.User;
import com.sevenplus.dto.MembershipFormDTO;
import com.sevenplus.service.UserService;

@RestController
@RequestMapping("/sevenplus/api")
public class MembershipFormController {

	@Autowired
	UserService userService; // Service which will do all data
								// retrieval/manipulation work

	// -------------------Retrieve All
	// Users---------------------------------------------

	@RequestMapping(value = "/user/", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public ResponseEntity<List<User>> listAllUsers() {

		List<User> users = userService.findAllUsers();
		if (users.isEmpty()) {
			return new ResponseEntity<List<User>>(HttpStatus.NO_CONTENT);
			// You many decide to return HttpStatus.NOT_FOUND
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	/**
	 * 
	 * @param user
	 * @param request
	 */
	@RequestMapping(value = "/user/", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
	public void create(@RequestBody MembershipFormDTO meFormDTO, HttpServletRequest request) {
		try {
			userService.saveUser(meFormDTO);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/*
	  @RequestMapping(value = "/user/{id}")
	public ResponseEntity<User> read(@PathVariable String id) {
		return userService.findOne(id);
	}

	@RequestMapping(method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void update(@RequestBody User user) {
		userRepository.save(user);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable String id) {
		userRepository.delete(id);
	}*/

}
