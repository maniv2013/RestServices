/**
 * 
 */
package com.sevenplus.db.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author vincentm
 *
 */
@Entity
@Document(collection = "category")
public class Category implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CategoryPK categPk;
	
	private String _id;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date updatedOn;

	public CategoryPK getCategPk() {
		return categPk;
	}

	public void setCategPk(CategoryPK categPk) {
		this.categPk = categPk;
	}

	public String get_id() {
		return _id;
	}

	public void set_id(String _id) {
		this._id = _id;
	}

	public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}
    
    

}
