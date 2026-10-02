package com.thukuna.fullstackpractice.person;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDate;

public record PersonRequestDTO(
        @NotBlank
        String firstName,
        @NotBlank
        String lastName,
        @NotNull
        LocalDate birthday,
        @NotBlank
        String gender,
        @NotBlank
        @Pattern(regexp = "^\\d{6,8}$")
        String registrationNumber
) {
}
