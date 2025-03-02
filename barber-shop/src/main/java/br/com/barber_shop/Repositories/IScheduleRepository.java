package br.com.barber_shop.Repositories;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.barber_shop.Entities.ScheduleEntity;

@Repository
public interface IScheduleRepository extends JpaRepository<ScheduleEntity, Long> {

        List<ScheduleEntity> findByStartAtGreaterThanEqualAndEndAtLessThanEqualOrderByStartAtAscEndAtAsc(
                        OffsetDateTime startAt, OffsetDateTime endAt);

        boolean existsByStartAtAndEndAt(
                        final OffsetDateTime startAt, final OffsetDateTime endAt);
}
