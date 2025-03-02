package br.com.barber_shop.Controller.dto;

import java.time.OffsetDateTime;

import br.com.barber_shop.Entities.ClientEntity;
import br.com.barber_shop.Entities.ScheduleEntity;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ScheduleDto {

    private Long id;

    private OffsetDateTime startAt;

    private OffsetDateTime endAt;

    @ManyToOne
    private ClientEntity client = new ClientEntity();

    public ScheduleDto(ScheduleEntity entity) {
        this.id = entity.getId();
        this.startAt = entity.getStartAt();
        this.endAt = entity.getEndAt();
        this.client = entity.getClient();
    }

}
