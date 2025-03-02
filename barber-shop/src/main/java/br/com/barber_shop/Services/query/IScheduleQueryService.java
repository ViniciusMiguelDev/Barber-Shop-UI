package br.com.barber_shop.Services.query;

import java.time.OffsetDateTime;
import java.util.List;

import br.com.barber_shop.Entities.ScheduleEntity;

public interface IScheduleQueryService {

    ScheduleEntity findById(final Long id);

    List<ScheduleEntity> findInMonth(final OffsetDateTime startAt, final OffsetDateTime endAt);

    void verifyIfScheduleExists(final OffsetDateTime startAt, final OffsetDateTime endAt);
}
