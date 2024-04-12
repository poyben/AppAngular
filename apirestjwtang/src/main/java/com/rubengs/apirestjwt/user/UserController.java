package com.rubengs.apirestjwt.user;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value="/api/v1/user")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@GetMapping(value="{id}")
	public ResponseEntity<UserDto>getUser(@PathVariable Integer id){
		UserDto userDto = userService.getUser(id);
		if(userDtop==null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(userDto);
	}
	
	@PutMapping()
	public ResponseEntity<UserResponse>updateUser(@RequestBody UserRequest userRequest){
		return ResponseEntity.ok(userService.updateUser(userRequest));
	}
	
}
