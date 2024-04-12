package com.rubengs.apirestjwt.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.rubengs.apirestjwt.jwt.JwtService;
import com.rubengs.apirestjwt.user.Role;
import com.rubengs.apirestjwt.user.User;
import com.rubengs.apirestjwt.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authnticationManager;
	
	public AuthResponse login(LoginRequest request) {
		authnticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
		String token= jwtService.getToken(user);
		return AuthResponse.builder()
				.token(token)
				.build();
	}

	public AuthResponse register(RegisterRequest request) {

		User user = User.builder()
				.username(request.getUsername())
				.password(passwordEncoder.encode(request.getPassword()))
				.firstname(request.getFirstname())
				.lastname(request.lastname)
				.country(request.getCountry())
				.role(Role.USER)
				.build();
		
		userRepository.save(user);
		return AuthResponse.builder()
				.token(jwtService.getToken(user))
				.build();
	}

}
