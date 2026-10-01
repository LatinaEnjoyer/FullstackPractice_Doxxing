package com.thukuna.fullstackpractice.person;

public class PersonMapper {
    static PersonDTO toPersonDTO(Person person) {
        return new PersonDTO(
                person.getId(),
                person.getFirstName(),
                person.getLastName(),
                person.getAge(),
                person.getBirthday(),
                person.getGender()
        );
    }
}
