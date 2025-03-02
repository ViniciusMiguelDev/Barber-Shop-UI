package br.com.barber_shop.Controller.response;

import java.time.OffsetDateTime;

public record SaveScheduleResponse(
        Long id,
        OffsetDateTime startAt,
        OffsetDateTime endAt,
        long clientId) {

}
