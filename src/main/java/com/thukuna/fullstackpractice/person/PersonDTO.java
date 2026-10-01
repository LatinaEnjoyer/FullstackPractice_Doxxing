package com.thukuna.fullstackpractice.person;

import java.time.LocalDate;

public record PersonDTO(
        Long id,
        String firstName,
        String lastName,
        Long age,
        LocalDate birthday,
        String gender
) {
}
