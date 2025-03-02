package br.com.barber_shop.Controller.dto;

import java.util.HashSet;
import java.util.Set;

import br.com.barber_shop.Entities.ClientEntity;
import br.com.barber_shop.Entities.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ClientDto {
    private Long id;

    private String name;

    private String email;

    private String phone;

    private Set<ScheduleEntity> schedules = new HashSet<>();

    public ClientDto(ClientEntity entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.email = entity.getEmail();
        this.phone = entity.getPhone();
        this.schedules = entity.getSchedules();
    }
}
