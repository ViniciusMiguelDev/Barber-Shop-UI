package br.com.barber_shop.Controller;

import static org.springframework.http.HttpStatus.*;

import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.barber_shop.Controller.dto.ScheduleDto;
import br.com.barber_shop.Entities.ScheduleEntity;
import br.com.barber_shop.Services.impl.ScheduleService;
import br.com.barber_shop.Services.query.impl.ScheduleQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("schedules")
@AllArgsConstructor
public class ScheduleController {

    private final ScheduleService service;
    private final ScheduleQueryService queryService;

    @PostMapping
    @ResponseStatus(CREATED)
    public ResponseEntity<ScheduleDto> save(@RequestBody @Valid final ScheduleEntity request) {
        service.save(request);
        ScheduleDto entity = new ScheduleDto(request);
        return ResponseEntity.ok().body(entity);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{year}/{month}")
    public ResponseEntity<List<ScheduleDto>> listMonth(@PathVariable final int year,
            @PathVariable final int month) {
        var yearMonth = YearMonth.of(year, month);
        var startAt = yearMonth.atEndOfMonth().atTime(23, 59, 59, 999_999_999).atOffset(ZoneOffset.UTC);
        var endAt = yearMonth.atDay(1).atTime(0, 0, 0, 0).atOffset(ZoneOffset.UTC);

        List<ScheduleDto> entitiesDto = queryService.findInMonth(startAt, endAt).stream()
                .map(schedule -> new ScheduleDto(schedule))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(entitiesDto);
    }

}
