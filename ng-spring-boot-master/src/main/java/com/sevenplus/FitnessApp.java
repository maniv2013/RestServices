package com.sevenplus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(scanBasePackages={"com.sevenplus"})
/*@ComponentScan ({"com.sevenplus.db", "com.sevenplus.db.config"})
@EnableMongoRepositories ("com.sevenplus.db.repository")*/

public class FitnessApp {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SpringApplication.run(FitnessApp.class, args);
	}

}
