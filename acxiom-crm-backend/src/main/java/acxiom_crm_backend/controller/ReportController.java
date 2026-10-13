
package acxiom_crm_backend.controller;

import acxiom_crm_backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ReportController {
    private final CustomerRepository customers;
    private final LeadRepository leads;
    private final FollowUpRepository followUps;
    private final OpportunityRepository opportunities;
    private final ActivityRepository activities;
    private final CrmUserRepository users;

    public ReportController(
            CustomerRepository customers,
            LeadRepository leads,
            FollowUpRepository followUps,
            OpportunityRepository opportunities,
            ActivityRepository activities,
            CrmUserRepository users) {
        this.customers = customers;
        this.leads = leads;
        this.followUps = followUps;
        this.opportunities = opportunities;
        this.activities = activities;
        this.users = users;
    }

    @GetMapping
    public Map<String, Long> getReport() {
        Map<String, Long> report = new LinkedHashMap<>();
        report.put("totalCustomers", customers.count());
        report.put("totalLeads", leads.count());
        report.put("totalFollowUps", followUps.count());
        report.put("totalOpportunities", opportunities.count());
        report.put("totalActivities", activities.count());
        report.put("totalUsers", users.count());
        return report;
    }
}
