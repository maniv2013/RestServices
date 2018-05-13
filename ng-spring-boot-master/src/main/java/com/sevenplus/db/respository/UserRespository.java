/**
 * 
 */
package com.sevenplus.db.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.sevenplus.db.model.User;

/**
 * @author vincentm
 *
 */
@Repository
public interface UserRespository extends JpaRepository<User, String> {

}
