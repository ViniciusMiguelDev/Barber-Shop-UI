package br.com.barber_shop.Services.query.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import br.com.barber_shop.Entities.ClientEntity;
import br.com.barber_shop.Exceptions.EmailInUseException;
import br.com.barber_shop.Exceptions.NotFoundException;
import br.com.barber_shop.Exceptions.PhoneInUseException;
import br.com.barber_shop.Repositories.IClientRepository;
import br.com.barber_shop.Services.query.IClientQueryService;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClientQueryService implements IClientQueryService {

    private final IClientRepository repository;

    @Override
    public ClientEntity findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Não foi encontrado esse cliente pelo id " + id));
    }

    @Override
    public List<ClientEntity> list() {
        return repository.findAll();
    }

    @Override
    public void verifyPhone(String phone) {
        if(repository.existsByPhone(phone)) {
            var message = "O telefone: " + phone + " já está em uso";
            throw new PhoneInUseException(message);
        }
    }

    @Override
    public void verifyPhone(Long id, String phone) {
        var optional = repository.findByPhone(phone);
        if(optional.isPresent() && !Objects.equals(optional.get().getPhone(), phone)) {
            var message = "O telefone: " + phone + " já está em uso";
            throw new PhoneInUseException(message);
        }
    }

    @Override
    public void verifyEmail(String email) {
        if(repository.existsByPhone(email)) {
            var message = "O email: " + email + " já está em uso";
            throw new EmailInUseException(message);
        }
    }

    @Override
    public void verifyEmail(Long id, String email) {
        var optional = repository.findByEmail(email);
        if(optional.isPresent() && !Objects.equals(optional.get().getEmail(), email)) {
            var message = "O email: " + email + " já está em uso";
            throw new EmailInUseException(message);
        }
    }

}
