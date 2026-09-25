# Database Schema and ERD

## 1. Entity Relationship Description (ERD)
The core database model handles users, roles, products, orders, and multilingual content.

*   **Users** have one role. They can have an associated **FarmerProfile** or **OrganizationProfile**.
*   **Farmers** manage multiple **Farms** and **Products**.
*   **Products** belong to **Categories**. Both Products and Categories have **Translations** (1-to-many) to support multiple languages.
*   **Products** have **Variants** (e.g., different units/prices).
*   **Orders** are split into two levels:
    *   **CustomerOrder:** The single checkout transaction.
    *   **SellerOrder:** The sub-order fulfilled by a specific farmer.
*   **SellerOrders** contain **OrderItems**.
*   **Payments** and **FarmerPayouts** track financial transactions.

## 2. Prisma Schema Overview

*   **User:** `id`, `name`, `email`, `phone`, `role`, `language`, `status`
*   **FarmerProfile:** `id`, `userId`, `farmName`, `description`, `verificationStatus`
*   **OrganizationProfile:** `id`, `userId`, `organizationName`, `type`, `peopleServed`
*   **Category:** `id`, `slug`
*   **CategoryTranslation:** `id`, `categoryId`, `language`, `name`
*   **Product:** `id`, `farmerId`, `categoryId`, `status`
*   **ProductTranslation:** `id`, `productId`, `language`, `name`, `description`
*   **ProductVariant:** `id`, `productId`, `unit`, `price`, `minQuantity`, `availableQuantity`
*   **Order:** `id`, `userId`, `totalAmount`, `status`
*   **SellerOrder:** `id`, `orderId`, `farmerId`, `status`, `amount`
*   **OrderItem:** `id`, `sellerOrderId`, `productVariantId`, `quantity`, `price`
*   **Payment:** `id`, `orderId`, `method`, `status`, `amount`
