/**
 * 
 */
package com.sevenplus.dto;

import java.io.Serializable;

/**
 * @author vincentm
 *
 */
public class MembershipFormDTO implements Serializable{

	private UserDTO userDTO;

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}
	
	
}
