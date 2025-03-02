package br.com.barber_shop.Controller.response;

public record ClientDetailResponse(
        Long id,
        String name,
        String email,
        String phone) {

}
