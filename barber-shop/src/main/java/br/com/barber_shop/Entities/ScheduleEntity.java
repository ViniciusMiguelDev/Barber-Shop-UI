package br.com.barber_shop.Entities;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SCHEDULES", uniqueConstraints = {
        @UniqueConstraint(name = "UK_SCHEDULE_INTERVAL", columnNames = { "start_at", "end_at" })
})
public class ScheduleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Column(nullable = false, name = "start_at")
    @JsonProperty("startAt")
    private OffsetDateTime startAt;

    @Column(nullable = false, name = "end_at")
    @JsonProperty("endAt")
    private OffsetDateTime endAt;

    @ManyToOne
    @JoinColumn(nullable = false, name = "client_id")
    @JsonProperty("client")
    private ClientEntity client = new ClientEntity();

}
