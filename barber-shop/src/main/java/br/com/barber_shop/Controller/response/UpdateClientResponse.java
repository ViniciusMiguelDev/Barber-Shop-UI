package br.com.barber_shop.Controller.response;

public record UpdateClientResponse(
        Long id,
        String name,
        String email,
        String phone) {

}
