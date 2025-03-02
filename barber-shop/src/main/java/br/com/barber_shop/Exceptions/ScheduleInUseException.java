package br.com.barber_shop.Exceptions;

public class ScheduleInUseException extends RuntimeException {

    public ScheduleInUseException(String message) {
        super(message);
    }
}
