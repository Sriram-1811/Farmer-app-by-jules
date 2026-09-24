# API Architecture

The application uses Next.js Route Handlers (`app/api/...`) and Server Actions for data fetching and mutations.

## 1. Principles
*   **RESTful Design:** Standard HTTP methods (GET, POST, PATCH, DELETE).
*   **Authentication:** Endpoints are protected via session validation.
*   **Authorization:** Role-based checks ensure users only access their own data or authorized endpoints.
*   **Validation:** Input is validated using Zod schemas before processing.
*   **Standardized Responses:** Consistent error and success response formats.

## 2. Key Endpoints (Conceptual)

### Authentication
*   `POST /api/auth/register` - Register a new user.
*   `POST /api/auth/login` - Authenticate a user.
*   `POST /api/auth/logout` - End session.

### Users & Profiles
*   `GET /api/users/me` - Get current user profile.
*   `PATCH /api/users/me` - Update user preferences (e.g., language).
*   `POST /api/farmers` - Onboard a farmer profile.
*   `POST /api/organizations` - Onboard an institutional buyer.

### Products (Farmer)
*   `GET /api/farmers/:id/products` - List farmer's products.
*   `POST /api/products` - Create a new product.
*   `PATCH /api/products/:id` - Update a product/inventory.

### Products (Consumer)
*   `GET /api/products` - Search and filter products for discovery.
*   `GET /api/products/:id` - Get product details.
*   `GET /api/categories` - List all active categories.

### Orders
*   `POST /api/orders` - Place a new order (creates CustomerOrder and SellerOrders).
*   `GET /api/orders` - List consumer's orders.
*   `GET /api/orders/:id` - Get order details.

### Farmer Fulfillment
*   `GET /api/seller-orders` - List farmer's received orders.
*   `PATCH /api/seller-orders/:id/status` - Update order status (e.g., PLACED -> ACCEPTED).

### Institutional Procurement
*   `POST /api/quotes` - Request a bulk quote.
*   `POST /api/recurring-orders` - Create a recurring purchase schedule.
