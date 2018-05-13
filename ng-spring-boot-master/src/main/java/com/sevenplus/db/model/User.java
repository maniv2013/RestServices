/**
 * 
 */
package com.sevenplus.db.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author vincentm
 *
 */
@Entity
@Document(collection = "user")
public class User implements Serializable {

	@Id
    private String memId;
	
	
	private String mobileNum;
	private String firstName;
	private String midName;
	private String lastName;
	private String referrerId;
	private String homePhoneNum;
	
	private Boolean primeMemFlag;
	private Boolean active;
	
	private String facility;
	private String memType;
	private String referBy;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date dob;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date weddingDate;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private Date joiningDate;
	
	
	
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Boolean getPrimeMemFlag() {
		return primeMemFlag;
	}
	public String getMemId() {
		return memId;
	}
	public void setMemId(String memId) {
		this.memId = memId;
	}
	
	
	public String getMobileNum() {
		return mobileNum;
	}
	public void setMobileNum(String mobileNum) {
		this.mobileNum = mobileNum;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getMidName() {
		return midName;
	}
	public void setMidName(String midName) {
		this.midName = midName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getReferrerId() {
		return referrerId;
	}
	public void setReferrerId(String referrerId) {
		this.referrerId = referrerId;
	}
	public String getHomePhoneNum() {
		return homePhoneNum;
	}
	public void setHomePhoneNum(String homePhoneNum) {
		this.homePhoneNum = homePhoneNum;
	}
	public Boolean isPrimeMemFlag() {
		return primeMemFlag;
	}
	public void setPrimeMemFlag(Boolean primeMemFlag) {
		this.primeMemFlag = primeMemFlag;
	}
	public String getFacility() {
		return facility;
	}
	public void setFacility(String facility) {
		this.facility = facility;
	}
	public String getMemType() {
		return memType;
	}
	public void setMemType(String memType) {
		this.memType = memType;
	}
	public String getReferBy() {
		return referBy;
	}
	public void setReferBy(String referBy) {
		this.referBy = referBy;
	}
	public Date getDob() {
		return dob;
	}
	public void setDob(Date dob) {
		this.dob = dob;
	}
	public Date getWeddingDate() {
		return weddingDate;
	}
	public void setWeddingDate(Date weddingDate) {
		this.weddingDate = weddingDate;
	}
	
	
}
