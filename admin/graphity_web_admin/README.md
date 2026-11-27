# Graphity Solutions publishing

Install this Frappe app on a Graphity-owned test Bench. Use a test site for the first publishing exercise.

1. Add the app folder to the Bench using the Bench app installation workflow, then run `bench --site <test-site> install-app graphity_web_admin`.
2. Assign **Graphity Solutions Editor** to content editors and **Graphity Solutions Publisher** to approvers for Solutions demo content. Assign **Graphity Studio Editor** and **Graphity Studio Publisher** for Studio portfolio/testimonial content.
3. In Desk, open **Graphity Solutions Release**. Enter both language variants, update the demo figures, and optionally attach a JPEG, PNG, or WebP image under 1 MB. Save as draft.
4. A Publisher reviews the revision, submits it, then chooses **Download release**. Submitted snapshots are immutable through this workflow.
5. From the Graphity website checkout, run `GRAPHITY_CONTENT_FILE=/absolute/path/to/release.json node src/build.mjs`. Preview the resulting English and Arabic Solutions pages. Publish the staged build using the existing Sites release process.
6. To roll back content, repeat the build and deploy with an earlier approved release JSON.
7. In Desk, open **Graphity Studio Portfolio Release** to manage case studies and testimonials shown on the Studio page. Add rows to the Portfolio items and Testimonials tables (both languages required per row), submit, then choose **Download release**.
8. Build with `GRAPHITY_PORTFOLIO_FILE=/absolute/path/to/portfolio.json node src/build.mjs` (combine with `GRAPHITY_CONTENT_FILE` as needed) to render real case studies and testimonials instead of the "coming soon" placeholder.

The approved JSON applies to the Solutions project name and sample date, demo metrics, the Overview walkthrough copy, all walkthrough and module labels, and the optional ERP hero image, plus the Studio portfolio items and testimonials when published. Group and Studio administration, full module and media editing, and direct deployment from Desk belong to the next admin release. Build without the environment variables to render the bundled demo content and the "coming soon" portfolio placeholder. Keep the approved JSON available for later builds if you want the same content to persist.

The website uses sample data. Use fictional projects and publish only approved images. The Frappe app does not collect or export inquiries.
