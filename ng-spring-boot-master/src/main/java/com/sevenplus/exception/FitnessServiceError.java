/**
 * 
 */
package com.sevenplus.exception;

/**
 * @author vincentm
 *
 */
public class FitnessServiceError extends Exception {
	
	private int errCode;
	
	private String errMsg;
	
	

	public FitnessServiceError() {
		super();
	}
	
	

	public FitnessServiceError(int errCode, String errMsg) {
		super();
		this.errCode = errCode;
		this.errMsg = errMsg;
	}



	public int getErrCode() {
		return errCode;
	}

	public void setErrCode(int errCode) {
		this.errCode = errCode;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}	
	

}
