package com.thukuna.fullstackpractice.person;

import com.thukuna.fullstackpractice.exception.NotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
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
                requestDTO.birthday(),
                requestDTO.gender(),
                requestDTO.registrationNumber()
        );
        personRepository.save(newPerson);
        return PersonMapper.toPersonDTO(newPerson);
    }

    public void deletePerson(Long id) {
        if (!personRepository.existsById(id)) {
            throw new NotFoundException(
                    "Perosn not found with id: " + id
            );
        }
        personRepository.deleteById(id);
    }

    public PersonDTO editPersonById(Long id, PersonRequestDTO requestDTO) {
        Person person = personRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "Person with id " + id + " not found!"));

        person.setFirstName(requestDTO.firstName());
        person.setLastName(requestDTO.lastName());
        person.setBirthday(requestDTO.birthday());
        person.setGender(requestDTO.gender());

        personRepository.save(person);

        return PersonMapper.toPersonDTO(person);
    }
}
