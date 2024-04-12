package com.rubengs.apirestjwt.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

	int id;
	String username;
	String firstName;
	String lastName;
	String country;
	
}
