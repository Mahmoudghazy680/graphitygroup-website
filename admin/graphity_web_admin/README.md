# Graphity Solutions publishing

Install this Frappe app on a Graphity-owned test Bench. Use a test site for the first publishing exercise.

1. Add the app folder to the Bench using the Bench app installation workflow, then run `bench --site <test-site> install-app graphity_web_admin`.
2. Assign **Graphity Solutions Editor** to content editors and **Graphity Solutions Publisher** to approvers.
3. In Desk, open **Graphity Solutions Release**. Enter both language variants, update the demo figures, and optionally attach a JPEG, PNG, or WebP image under 1 MB. Save as draft.
4. A Publisher reviews the revision, submits it, then chooses **Download release**. Submitted snapshots are immutable through this workflow.
5. From the Graphity website checkout, run `GRAPHITY_CONTENT_FILE=/absolute/path/to/release.json node src/build.mjs`. Preview the resulting English and Arabic Solutions pages. Publish the staged build using the existing Sites release process.
6. To roll back content, repeat the build and deploy with an earlier approved release JSON.

The approved JSON applies to the Solutions project name and sample date, demo metrics, the Overview walkthrough copy, all walkthrough and module labels, and the optional ERP hero image. Group and Studio administration, full module and media editing, and direct deployment from Desk belong to the next admin release. Build without the environment variable to render the bundled demo. Keep the approved JSON available for later builds if you want the same content to persist.

The website uses sample data. Use fictional projects and publish only approved images. The Frappe app does not collect or export inquiries.
