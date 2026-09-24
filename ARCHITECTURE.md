# Agricultural Marketplace Platform Architecture

## 1. Product Architecture
The platform is a digital agricultural marketplace connecting farmers directly with household consumers and institutional buyers. It is composed of the following core modules:
*   **Farmer Portal:** For onboarding, product management, inventory, and order fulfillment.
*   **Consumer Portal:** For product discovery, search, cart, and checkout.
*   **Institutional Portal:** For bulk procurement, quotes, and recurring orders.
*   **Admin Dashboard:** For platform management, user moderation, and analytics.
*   **Multilingual System:** Core capability allowing UI to be available in multiple languages natively.

## 2. Technology Stack
*   **Frontend & Backend:** Next.js (App Router) with React, TypeScript.
*   **Styling:** Tailwind CSS, Framer Motion for animations.
*   **Database:** PostgreSQL.
*   **ORM:** Prisma.
*   **Authentication:** NextAuth.js or custom secure JWT-based auth.
*   **Internationalization:** next-intl for seamless multilingual support.

## 3. Authentication & Authorization
*   **Authentication:** Secure registration and login using email/phone OTPs and passwords. Session management using secure HTTP-only cookies.
*   **Authorization:** Role-Based Access Control (RBAC).
    *   Roles: `ADMIN`, `FARMER`, `CONSUMER`, `INSTITUTIONAL_CONSUMER`.
    *   Enforced at the API route level and Server Actions to prevent unauthorized access.

## 4. Payment Architecture
*   A payment provider abstraction layer to easily integrate with gateways like Razorpay, Stripe, or UPI directly.
*   Supports features for consumer checkout, institutional bank transfers, and platform commission calculations.
*   Handles webhooks for payment success/failure state reconciliation.

## 5. Multilingual Architecture
*   Language selection available globally, starting from the first onboarding screen.
*   Next.js middleware to handle locale routing (e.g., `/en/`, `/hi/`, `/te/`).
*   Translation keys used exclusively in the UI (e.g., `common.save`, `products.rice`).
*   Database tables for products and categories include translation variants for multilingual content.

## 6. File & Storage Architecture
*   **Object Storage:** Cloud-based object storage (e.g., AWS S3, Cloudinary) for handling product images, farm photos, profile avatars, and verification documents.
*   Never stored as binary blobs in the PostgreSQL database.

## 7. Notification Architecture
*   Centralized notification service that can trigger events.
*   Channels: In-app notifications, Emails, and potentially SMS/WhatsApp.
*   Events: Order status changes, payment updates, quote responses, etc.

## 8. Design System
*   **Style:** Modern marketplace combined with agricultural identity. Freshness, trust, community, and simplicity.
*   **Components:** Reusable UI components (Buttons, Cards, Inputs, Modals) built with Tailwind CSS.
*   **Accessibility:** ARIA labels, keyboard navigation, contrast compliance.
*   **Animations:** Smooth page transitions, hover states, skeleton loaders using Framer Motion.

## 9. Development Phases
1.  Architecture & Design System
2.  Authentication & Roles
3.  Farmer Portal
4.  Consumer Portal
5.  Institutional Portal
6.  Payments & Checkout
7.  Admin Dashboard
8.  Testing & Production Readiness

## 10. Testing Strategy
*   **Unit Tests:** Pricing calculations, inventory management, role checks.
*   **Integration Tests:** API endpoints for core flows (auth, product creation, checkout).
*   **End-to-End Tests:** Cypress/Playwright for full user journeys (Farmer registration -> add product -> consumer checkout).

## 11. Deployment Architecture
*   **Host:** Vercel or AWS (containerized) for Next.js hosting.
*   **Database:** Managed PostgreSQL instance (e.g., Supabase, Neon, AWS RDS).
*   **CI/CD:** GitHub Actions for automated testing and deployment.

## 12. Risks and Important Decisions
*   **Risk:** Low digital literacy among farmers. **Mitigation:** Extreme simplicity in UI, prominent icons, local language support.
*   **Risk:** Complex checkout with multiple sellers. **Mitigation:** Unified customer order with sub-orders per seller at the database level.
*   **Risk:** Multilingual maintenance. **Mitigation:** Strong i18n architecture from day one; database schema designed for content translation.
