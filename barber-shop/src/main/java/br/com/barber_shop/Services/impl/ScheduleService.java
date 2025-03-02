package br.com.barber_shop.Services.impl;

import org.springframework.stereotype.Service;

import br.com.barber_shop.Entities.ScheduleEntity;
import br.com.barber_shop.Repositories.IScheduleRepository;
import br.com.barber_shop.Services.IScheduleService;
import br.com.barber_shop.Services.query.IScheduleQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ScheduleService implements IScheduleService {

    private final IScheduleRepository repository;
    private final IScheduleQueryService service;

    @Override
    public ScheduleEntity save(ScheduleEntity entity) {
        service.verifyIfScheduleExists(entity.getStartAt(), entity.getEndAt());

        return repository.save(entity);
    }

    @Override
    public void delete(Long id) {
        service.findById(id);
        repository.deleteById(id);
    }

}
