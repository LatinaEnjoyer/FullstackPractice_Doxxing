package com.thukuna.fullstackpractice.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PersonRequestDTO(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        Long age,
        @NotNull
        LocalDate birthday,
        @NotBlank
        String gender,
        @NotNull
        Long registrationNumber
) {
}
