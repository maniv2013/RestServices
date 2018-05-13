/**
 * 
 */
package com.sevenplus.db.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

/**
 * @author vincentm
 *
 */
@Embeddable
public class CategoryPK implements Serializable {

	private String catgId;
	private String memId;
	public String getCatgId() {
		return catgId;
	}
	public void setCatgId(String catgId) {
		this.catgId = catgId;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((catgId == null) ? 0 : catgId.hashCode());
		result = prime * result + ((memId == null) ? 0 : memId.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CategoryPK other = (CategoryPK) obj;
		if (catgId == null) {
			if (other.catgId != null)
				return false;
		} else if (!catgId.equals(other.catgId))
			return false;
		if (memId == null) {
			if (other.memId != null)
				return false;
		} else if (!memId.equals(other.memId))
			return false;
		return true;
	}
	
	
}
