# WalkCity Application Sitemap

```mermaid
graph TD
    A["(1) WalkCity Home\n(Main Map View)"] --> B["(2) Walkability Map\n(Default View)"]
    A --> C["(3) Record Route"]
    A --> D["(4) Report Issue"]

    B --> B1["(2.1) Map Details\n(Sidebar View)"]

    C --> C1["(3.1) Recording\nProcess"]
    C1 --> C2["(3.2) Summary\n& Description"]

    D --> D1["(4.1) Location\nSelection"]
    D1 --> D2["(4.2) Issue\nDetails"]
    D2 --> D3["(4.3) Photo Upload\n& Submission"]

    %% Help & Features is accessible from any screen
    A -.-> E["(5) Feature Guide\n(Help & Features)"]

    style A fill:#eee,stroke:#333,stroke-width:2px
    style B fill:#eee,stroke:#333,stroke-width:2px
    style C fill:#eee,stroke:#333,stroke-width:2px
    style D fill:#eee,stroke:#333,stroke-width:2px
    style B1 fill:#eee,stroke:#333,stroke-width:2px
    style C1 fill:#eee,stroke:#333,stroke-width:2px
    style C2 fill:#eee,stroke:#333,stroke-width:2px
    style D1 fill:#eee,stroke:#333,stroke-width:2px
    style D2 fill:#eee,stroke:#333,stroke-width:2px
    style D3 fill:#eee,stroke:#333,stroke-width:2px
    style E fill:#eee,stroke:#333,stroke-width:2px
```

## Sitemap Description

The WalkCity application has the following main views:

1. **WalkCity Home (Main Map View)** - The primary entry point showing the walkability map
2. **Walkability Map (Default View)** - The default view when opening the app
   - **Map Details (Sidebar View)** - Expandable sidebar with walkability scores and filters
3. **Record Route** - Feature to record walking routes
   - **Recording Process** - Active recording with controls (start/pause/stop)
   - **Summary & Description** - Add details after recording a route
4. **Report Issue** - Three-step process for reporting walkability issues
   - **Location Selection** - Mark issue location on map
   - **Issue Details** - Select issue type and add description
   - **Photo Upload & Submission** - Add photo and submit report
5. **Feature Guide (Help & Features)** - Accessible from any screen via the Help button

This sitemap shows the hierarchical relationship between screens and the user flow through the application.
