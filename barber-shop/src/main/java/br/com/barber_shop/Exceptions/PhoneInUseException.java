package br.com.barber_shop.Exceptions;

public class PhoneInUseException extends RuntimeException {

    public PhoneInUseException(String message) {
        super(message);
    }
}
