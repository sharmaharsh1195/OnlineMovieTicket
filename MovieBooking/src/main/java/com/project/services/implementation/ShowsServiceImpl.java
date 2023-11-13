package com.project.services.implementation;

import com.project.entities.Shows;
import com.project.repository.ShowRepository;
import com.project.services.ShowsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShowsServiceImpl implements ShowsService {

    @Autowired
    private ShowRepository showRepository;


    @Override
    public Shows addShow(Shows shows) {
        return showRepository.save(shows);
    }
}
