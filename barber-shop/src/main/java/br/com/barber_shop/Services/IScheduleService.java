package br.com.barber_shop.Services;

import br.com.barber_shop.Entities.ScheduleEntity;

public interface IScheduleService {

    ScheduleEntity save(final ScheduleEntity entity);

    void delete(final Long id);
}
