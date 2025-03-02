package br.com.barber_shop.Controller.response;

public record ClientScheduleAppointmentResponse(
        Long id,
        String name,
        String email,
        String phone) {

}
