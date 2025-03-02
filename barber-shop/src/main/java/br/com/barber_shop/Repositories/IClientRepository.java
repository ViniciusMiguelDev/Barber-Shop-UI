package br.com.barber_shop.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.barber_shop.Entities.ClientEntity;

@Repository
public interface IClientRepository extends JpaRepository<ClientEntity, Long> {

    boolean existsByEmail(final String email);

    boolean existsByPhone(final String phone);

    Optional<ClientEntity> findByEmail(final String email);

    Optional<ClientEntity> findByPhone(final String phone);
}
