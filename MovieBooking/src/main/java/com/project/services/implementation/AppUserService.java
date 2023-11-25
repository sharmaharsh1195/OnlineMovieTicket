package com.project.services.implementation;


import com.project.entities.AppUser;
import com.project.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;


    //this loadbyusername method is method of userdetails service, which we are overriding
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser =appUserRepository.findByEmail(email);
        if(appUser == null)
        {
            throw new UsernameNotFoundException("username not found");
        }
        String role=appUser.getRole();
        List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(role);
        //we did this list because in below the User class constructr need three things first is email,second password
        //and third is authorities which are available to our appuser, but in our case we have only one role per user so,
        //we have to create a list of authorities for each user
        User user=new User(appUser.getEmail(),appUser.getPassword(),authorities);
//this class user is inheritied from userdetail service
        return user;
    }


    public void createUser(AppUser user) {
        AppUser userDetail = new AppUser();
        userDetail.setEmail(user.getEmail());
        userDetail.setPassword(user.getPassword());
        userDetail.setRole("Role_User");
        appUserRepository.save(user);
    }
}
