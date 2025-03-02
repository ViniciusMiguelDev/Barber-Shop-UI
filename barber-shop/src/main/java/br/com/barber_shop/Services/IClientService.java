package br.com.barber_shop.Services;

import br.com.barber_shop.Entities.ClientEntity;

public interface IClientService {

    ClientEntity save(final ClientEntity entity);

    ClientEntity update(final ClientEntity entity);

    void delete(final Long id);
}
