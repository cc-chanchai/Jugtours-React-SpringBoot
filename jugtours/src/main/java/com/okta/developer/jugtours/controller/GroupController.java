package com.okta.developer.jugtours.controller;

import com.okta.developer.jugtours.model.Group;
import com.okta.developer.jugtours.model.GroupRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class GroupController {
    private final Logger logger = LoggerFactory.getLogger(GroupController.class);
    private final GroupRepository groupRepository;

    @GetMapping("/groups")
    public Collection<Group> groups(){
        logger.info("{}",groupRepository.findAll());
        return groupRepository.findAll();
    }
    @GetMapping("/group/{id}")
    public ResponseEntity<?> getGroup(@PathVariable Long id){
        Optional<Group> group = groupRepository.findById(id);
        logger.info("{}",group);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group")
    public ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException{
        logger.info("Request to create group: {}",group);
        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/group" + result.getId())).body(result);
    }

    @PutMapping("/group/{id}")
    public ResponseEntity<Group> updateGroup(@Valid @RequestBody Group group){
        logger.info("Request to update group: {}", group);
        Group result = groupRepository.save(group);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id){
        logger.info("Request to delete group: {}", id);
        groupRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
