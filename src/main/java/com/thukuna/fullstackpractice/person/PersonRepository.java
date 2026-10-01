package com.thukuna.fullstackpractice.person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Person findPersonByRegistrationNumber(Long registrationNumber);

    Boolean existsByRegistrationNumber(Long registrationNumber);
}
