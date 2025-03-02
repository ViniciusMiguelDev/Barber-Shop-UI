package br.com.barber_shop.Controller.response;

import java.util.List;

public record ScheduleAppointmentMonthResponse(
        int year,
        int month,
        List<ClientScheduleAppointmentResponse> scheduledAppointments) {

}
