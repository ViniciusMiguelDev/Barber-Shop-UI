package br.com.barber_shop.Controller;

import static org.springframework.http.HttpStatus.*;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.barber_shop.Controller.dto.ClientDto;
import br.com.barber_shop.Entities.ClientEntity;
import br.com.barber_shop.Services.impl.ClientService;
import br.com.barber_shop.Services.query.impl.ClientQueryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("clients")
@AllArgsConstructor
public class ClientController {

    private final ClientService service;
    private final ClientQueryService queryService;

    @PostMapping
    @ResponseStatus(CREATED)
    public ResponseEntity<ClientDto> save(@RequestBody @Valid final ClientEntity request) {
        service.save(request);
        ClientDto entity = new ClientDto(request);
        return ResponseEntity.ok().body(entity);
    }

    @PutMapping("{id}")
    public ResponseEntity<ClientDto> update(@PathVariable final Long id,
            @RequestBody @Valid final ClientEntity request) {
        service.update(request);
        ClientDto entity = new ClientDto(request);
        return ResponseEntity.ok().body(entity);

    }

    @DeleteMapping("{id}")
    @ResponseStatus(NO_CONTENT)
    public ResponseEntity<?> delete(@PathVariable final Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}")
    @ResponseStatus
    public ResponseEntity<ClientDto> findById(@PathVariable final Long id) {
        ClientDto entity = new ClientDto(queryService.findById(id));
        return ResponseEntity.ok().body(entity);

    }

    @GetMapping
    @ResponseStatus
    public ResponseEntity<List<ClientDto>> findAll() {
        List<ClientDto> entities = queryService.list().stream().map(client -> new ClientDto(client))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(entities);

    }
}
