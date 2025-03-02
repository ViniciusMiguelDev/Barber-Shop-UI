package br.com.barber_shop.Controller.response;

public record ListClientResponse(
        Long id,
        String name,
        String email,
        String phone) {

}
