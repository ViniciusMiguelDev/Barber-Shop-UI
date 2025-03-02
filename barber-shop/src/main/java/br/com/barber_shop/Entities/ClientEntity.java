package br.com.barber_shop.Entities;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "CLIENTS", uniqueConstraints = {
        @UniqueConstraint(name = "UK_EMAIL", columnNames = "email"),
        @UniqueConstraint(name = "UK_PHONE", columnNames = "phone")
})
public class ClientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(nullable = false, length = 150)
    @JsonProperty("name")
    private String name;

    @Column(nullable = false, length = 150)
    @JsonProperty("email")
    private String email;

    @Column(nullable = false, length = 11, columnDefinition = "bpchar(11)")
    @JsonProperty("phone")
    private String phone;

    @ToString.Exclude
    @OneToMany(mappedBy = "client", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<ScheduleEntity> schedules = new HashSet<>();

}
