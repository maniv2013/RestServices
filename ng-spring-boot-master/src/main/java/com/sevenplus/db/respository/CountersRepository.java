/**
 * 
 */
package com.sevenplus.db.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sevenplus.db.model.Counters;

/**
 * @author vincentm
 *
 */
@Repository
public interface CountersRepository extends JpaRepository<Counters, String> {

}
