package br.com.barber_shop.Exceptions;

public class EmailInUseException extends RuntimeException {

    public EmailInUseException(String message) {
        super(message);
    }
}
