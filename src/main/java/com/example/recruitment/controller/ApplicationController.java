package com.example.recruitment.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.recruitment.model.Application;
import com.example.recruitment.model.Job;
import com.example.recruitment.repository.ApplicationRepository;
import com.example.recruitment.repository.JobRepository;

@Controller
public class ApplicationController {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public ApplicationController(JobRepository jobRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    // Show Job Details and Candidates
    @RequestMapping(value = "/job/{id}", method = RequestMethod.GET)
    public ModelAndView jobDetails(@PathVariable("id") long id) {
        Job job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            return new ModelAndView("redirect:/");
        }

        ModelAndView mv = new ModelAndView("job/jobDetails");
        mv.addObject("job", job);
        Iterable<Application> candidates = applicationRepository.findByJobId(id);
        mv.addObject("candidates", candidates);
        return mv;
    }

    // Add Candidate to Job
    @RequestMapping(value = "/job/{id}", method = RequestMethod.POST)
    public String addCandidate(@PathVariable("id") long id, @Valid Application candidate,
                               BindingResult result, RedirectAttributes attributes) {
        if (result.hasErrors()) {
            attributes.addFlashAttribute("message", "Please check the fields");
            return "redirect:/job/" + id;
        }

        // Check for duplicate ID
        if (candidate.getId() != null && applicationRepository.findById(candidate.getId()).isPresent()) {
            attributes.addFlashAttribute("error_message", "Duplicate ID");
            return "redirect:/job/" + id;
        }

        Job job = jobRepository.findById(id).orElse(null);
        if (job == null) {
            attributes.addFlashAttribute("error_message", "Job not found");
            return "redirect:/job/" + id;
        }

        candidate.setJobId(job.getId());  // Se usar ID do trabalho
        applicationRepository.save(candidate);
        attributes.addFlashAttribute("message", "Candidate added successfully!");
        return "redirect:/job/" + id;
    }

    // Delete Candidate by ID
    @RequestMapping("/deleteCandidate")
    public String deleteCandidate(@RequestParam Long id) {
        Application candidate = applicationRepository.findById(id).orElse(null);
        if (candidate != null) {
            Long jobId = candidate.getJobId();  // Se usar ID do trabalho
            applicationRepository.delete(candidate);
            return "redirect:/job/" + jobId;
        }
        return "redirect:/job";
    }
}
