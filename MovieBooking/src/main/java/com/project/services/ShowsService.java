package com.project.services;

import com.project.entities.Shows;
import com.project.entities.Theatre;

import java.util.List;

public interface ShowsService {

    public Shows addShow(Shows shows);

    List<Shows> getAllShows(Long movieDetailId);

    Shows getShowDetails(Long showId);
}
