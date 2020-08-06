package com.okta.developer.jugtours;

import com.okta.developer.jugtours.model.Event;
import com.okta.developer.jugtours.model.Group;
import com.okta.developer.jugtours.model.GroupRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {
    private final GroupRepository groupRepository;

    public Initializer(GroupRepository groupRepository){
        this.groupRepository = groupRepository;
    }

    @Override
    public void run(String... strings){
        Stream.of("Denver", "Utah", "Seatle", "Richmond").forEach(jugtour ->
                groupRepository.save(new Group(jugtour))
        );

        Group djung = groupRepository.findByName("Denver");
        Event event = Event.builder().title("Full Stack Reactive")
                .description("Reactive with Spring Boot + React")
                .date(Instant.parse("2018-12-12T18:00:00.000Z"))
                .build();
        djung.setEvents(Collections.singleton(event));
        groupRepository.save(djung);

        groupRepository.findAll().forEach(System.out::println);
    }
}
