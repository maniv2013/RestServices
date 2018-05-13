/**
 * 
 */
package com.sevenplus.db.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author vincentm
 *
 */
@Entity
@Document(collection = "counters")
public class Counters implements Serializable {

	@Id
	private String id;
	
	private Long seqNum;

	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getSeqNum() {
		return seqNum;
	}

	public void setSeqNum(Long seqNum) {
		this.seqNum = seqNum;
	}
	
	
}
