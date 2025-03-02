package br.com.barber_shop.Controller.response;

public record ClientScheduleAppointmentDetailResponse(
        Long id,
        String name,
        String email,
        String phone) {

}
