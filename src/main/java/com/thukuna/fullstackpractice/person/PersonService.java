package com.thukuna.fullstackpractice.person;

import com.thukuna.fullstackpractice.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    public List<PersonDTO> getAllPeople() {
        return personRepository.findAll()
                .stream()
                .map(PersonMapper::toPersonDTO) // p -> PersonMapper.toPersonDTO also works
                .toList();
    }

    public PersonDTO getPersonById(Long id) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Person with id: " + id + " not found!"));
        return PersonMapper.toPersonDTO(person);
    }

    public PersonDTO addPerson(PersonRequestDTO requestDTO) {
        if (personRepository.existsByRegistrationNumber(requestDTO.registrationNumber())) {
            throw new IllegalArgumentException(
                    "Person with this registration number already exists: "
                    + requestDTO.registrationNumber()
            );
        }
        Person newPerson = new Person(
                requestDTO.firstName(),
                requestDTO.lastName(),
                requestDTO.age(),
                requestDTO.birthday(),
                requestDTO.gender(),
                requestDTO.registrationNumber()
        );
        personRepository.save(newPerson);
        return PersonMapper.toPersonDTO(newPerson);
    }
}
