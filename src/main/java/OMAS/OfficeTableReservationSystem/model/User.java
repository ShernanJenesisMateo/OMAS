package OMAS.OfficeTableReservationSystem.model;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails{
    private String emp_id;
    private String fname;
    private String lname;
    private String mname;
    private String email;
    private String username;
    private String password;
    private Long position_id;
    private Long dept_id;
    private Long section_id;
    private String status_code;
    private String img_src;
    
    
    // private Role role;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // return List.of(new SimpleGrantedAuthority(role.name()));
        return Collections.emptyList();
    }

    @Override
    public String getUsername() {
        return username;
    }
    @Override 
    public String getPassword() {
        return password;
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public boolean isEnabled() {
        return true;
    }
}
