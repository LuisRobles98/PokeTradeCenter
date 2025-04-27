package com.poketradecenter;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.poketradecenter.Mapper") 
public class PokeTradeCenterApplication {

	public static void main(String[] args) {
		SpringApplication.run(PokeTradeCenterApplication.class, args);
	}
}