package br.com.barber_shop.Services.query;

import java.util.List;

import br.com.barber_shop.Entities.ClientEntity;

public interface IClientQueryService {

    ClientEntity findById(final Long id);

    List<ClientEntity> list();

    void verifyPhone(final String phone);

    void verifyPhone(final Long id, final String phone);

    void verifyEmail(final String email);

    void verifyEmail(final Long id, final String email);
}
