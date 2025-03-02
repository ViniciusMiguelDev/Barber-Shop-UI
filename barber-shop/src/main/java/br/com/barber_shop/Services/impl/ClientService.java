package br.com.barber_shop.Services.impl;

import org.springframework.stereotype.Service;

import br.com.barber_shop.Entities.ClientEntity;
import br.com.barber_shop.Repositories.IClientRepository;
import br.com.barber_shop.Services.IClientService;
import br.com.barber_shop.Services.query.IClientQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientService implements IClientService {

    private final IClientRepository repository;
    private final IClientQueryService service;

    @Override
    public ClientEntity save(ClientEntity entity) {
        service.verifyEmail(entity.getEmail());
        service.verifyPhone(entity.getPhone());

        return repository.save(entity);
    }

    @Override
    public ClientEntity update(ClientEntity entity) {
        service.verifyEmail(entity.getId(), entity.getEmail());
        service.verifyPhone(entity.getId(), entity.getPhone());

        var stored = service.findById(entity.getId());
        stored.setName(entity.getName());
        stored.setEmail(entity.getEmail());
        stored.setPhone(entity.getPhone());

        return repository.save(stored);
    }

    @Override
    public void delete(Long id) {
        service.findById(id);
        repository.deleteById(id);
    }

}
