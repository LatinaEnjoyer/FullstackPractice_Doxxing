package com.thukuna.fullstackpractice.person;

import java.time.LocalDate;
import java.time.Period;

public class PersonMapper {
    static PersonDTO toPersonDTO(Person person) {
        return new PersonDTO(
                person.getId(),
                person.getFirstName(),
                person.getLastName(),
                (long) Period.between(person.getBirthday(), LocalDate.now()).getYears(),
                person.getBirthday(),
                person.getGender()
        );
    }
}
