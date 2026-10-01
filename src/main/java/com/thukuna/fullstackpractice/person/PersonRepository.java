package com.thukuna.fullstackpractice.person;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {

    Boolean existsByRegistrationNumber(String registrationNumber);
}
