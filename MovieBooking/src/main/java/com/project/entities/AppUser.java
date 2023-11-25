package com.project.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class AppUser {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private String email;
    private String password;
    private int enabled;
    private String mobile;
    private String role;

    public AppUser() {
    }

    public AppUser(int id, String email, String password, int enabled, String mobile, String role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.mobile = mobile;
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "AppUser [id=" + id + ", email=" + email + ", password=" + password + ", enabled=" + enabled
                + ", mobile=" + mobile + ", role=" + role + "]";
    }
}