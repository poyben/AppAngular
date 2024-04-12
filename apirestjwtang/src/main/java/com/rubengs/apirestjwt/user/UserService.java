package com.rubengs.apirestjwt.user;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	
	@Transactional
	public UserResponse updateUser(UserRequest userRequest) {
		
		User user = User.builder()
				.id(userRequest.id)
				.firstname(userRequest.getFirstname())
				.lastname(userRequest.getLastname())
				.country(userRequest.getCountry())
				.role(Role.USER)
				.build();
				
				userRepository.updateUser(user.id, user.firstname, user.lastname, user.country);
		
	}
	
	public UserDto getUser(Integer id) {
		User user = userRepository.findById(id).orElse(null);
		
		if(user!=null) {
			UserDto userDto = UserDto.builder()
					.id(user.id)
					.username(user.username)
					.firstname(user.firstname)
					.lastname(user.lastname)
					.country(user.country)
					.build();
			return userDto;
		}
		return null;
		
	}
	
}
