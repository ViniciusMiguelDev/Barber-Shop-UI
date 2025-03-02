package br.com.barber_shop.Controller.response;

import java.time.OffsetDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

public record ProblemResponse(
        @JsonProperty("status") Integer status,
        @JsonProperty("timestamp") OffsetDateTime timestamp,
        @JsonProperty("message") String message) {

    @Builder(toBuilder = true)
    public ProblemResponse {
    }

}
