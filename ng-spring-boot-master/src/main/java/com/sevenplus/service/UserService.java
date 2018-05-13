/**
 * 
 */
package com.sevenplus.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sevenplus.constants.FitnessConstants;
import com.sevenplus.db.model.Counters;
import com.sevenplus.db.model.User;
import com.sevenplus.db.respository.CountersRepository;
import com.sevenplus.db.respository.UserRespository;
import com.sevenplus.dto.MembershipFormDTO;
import com.sevenplus.dto.UserDTO;
import com.sevenplus.exception.FitnessServiceError;

/**
 * @author vincentm .
 */
@Service
public class UserService {

	@Autowired
	UserRespository userRespository;

	@Autowired
	CountersRepository countersRepository;
	
	
	@Transactional
	private Counters getSequenceValCounter(String seqId) throws FitnessServiceError{
		
		Counters counter = countersRepository.findOne(seqId);
		
		if (counter == null)
			throw new FitnessServiceError(FitnessConstants.INIT_COUNTER_TBL_ERROR, FitnessConstants.CONTACT_ADMIN);

		
		return counter;
	}
	
	@Transactional
	private void setNextSequenceVal(Counters counter) throws FitnessServiceError{
		
		counter.setSeqNum(counter.getSeqNum()+1);
		
		countersRepository.save(counter);
	}

	@Transactional
	public void saveUser(MembershipFormDTO membershipFormDTO) throws FitnessServiceError {

		Counters counter = null;

		UserDTO userDTO = membershipFormDTO.getUserDTO();

		if (userDTO.getMemId() == null || userDTO.getMemId().length() == 0) {
			
			counter= this.getSequenceValCounter(FitnessConstants.USER_SEQUENCE_ID);
			
			userDTO.setMemId("7P" + counter.getSeqNum()+1);
		}

		User user = new User();

		BeanUtils.copyProperties(userDTO, user);

		userRespository.save(user);
		
		if(counter != null) {
			setNextSequenceVal(counter);
		}
		
	}

	public List<User> findAllUsers() {
		return userRespository.findAll();
	}

	public User findUser(String id) {
		return userRespository.findOne(id);
	}
}
