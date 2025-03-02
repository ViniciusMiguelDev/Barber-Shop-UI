package br.com.barber_shop.Services.query.impl;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.com.barber_shop.Entities.ScheduleEntity;
import br.com.barber_shop.Exceptions.ScheduleInUseException;
import br.com.barber_shop.Repositories.IScheduleRepository;
import br.com.barber_shop.Services.query.IScheduleQueryService;
import lombok.var;

@Service
public class ScheduleQueryService implements IScheduleQueryService {

    private IScheduleRepository repository;

    private ScheduleQueryService(IScheduleRepository repository) {
        this.repository = repository;
    }

    @Override
    public ScheduleEntity findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new ScheduleInUseException("Agendamento não encontrado"));
    }

    @Override
    public List<ScheduleEntity> findInMonth(OffsetDateTime startAt, OffsetDateTime endAt) {
        return repository.findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(startAt, endAt);
    }

    @Override
    public void verifyIfScheduleExists(OffsetDateTime startAt, OffsetDateTime endAt) {
        if (repository.existsByStartAtAndEndAt(startAt, endAt)) {
            var message = "Já existe um cliente agendado no horário solicitado";
            throw new ScheduleInUseException(message);
        }
    }

}
