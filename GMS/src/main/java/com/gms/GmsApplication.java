package com.gms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(GmsApplication.class, args);
    }
    @GetMapping("/")
    public String hello(){
        return "哈比哈比哈比哈比";
    }

}
