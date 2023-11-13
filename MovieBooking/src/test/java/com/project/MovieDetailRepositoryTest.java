package com.project;

import com.project.entities.Theatre;
import com.project.repository.TheatreRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@EnableJpaRepositories(basePackages = "com.project.repository")
@Import(MovieDetailRepositoryTest.TestConfig.class)
public class MovieDetailRepositoryTest {

    @Autowired
    private TheatreRepository theatreRepository;

    Theatre theatre;

    @BeforeEach
    void setUp() {
        theatre = new Theatre(1L, "PVR CINEMA", "building no 2 ", "bhiwani", "Haryana", null, null);
        theatreRepository.save(theatre);
    }

    @AfterEach
    void tearDown() {
        theatreRepository.deleteAll();
    }

    // test case for success
    @Test
    void testFindByName() {
        List<Theatre> theatreList = theatreRepository.findByTheatreName("PVR CINEMA");
//        assertThat(theatreList).hasSize(1);
        assertThat(theatreList.get(0).getTheatreName()).isEqualTo(theatre.getTheatreName());
        assertThat(theatreList.get(0).getTheatreCity()).isEqualTo(theatre.getTheatreCity());
    }

    // test case for failure

    @TestConfiguration
    static class TestConfig {
    }
}
