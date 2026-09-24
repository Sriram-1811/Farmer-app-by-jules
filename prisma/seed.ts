import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create standard users
  const adminUser = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '+1234567890',
      role: 'ADMIN',
      language: 'en',
    },
  });

  const consumerUser = await prisma.user.create({
    data: {
      name: 'Normal Consumer',
      email: 'consumer@example.com',
      phone: '+1987654321',
      role: 'CONSUMER',
      language: 'en',
    },
  });

  // Create Farmer
  const farmerUser = await prisma.user.create({
    data: {
      name: 'John the Farmer',
      email: 'farmer@example.com',
      phone: '+1122334455',
      role: 'FARMER',
      language: 'en',
    },
  });

  const farmerProfile = await prisma.farmerProfile.create({
    data: {
      userId: farmerUser.id,
      farmName: 'Green Acres',
      description: 'Organic farming since 1990.',
      location: 'Valley Region',
      verificationStatus: 'VERIFIED',
    },
  });

  // Create Category
  const vegCategory = await prisma.category.create({
    data: {
      slug: 'vegetables',
      translations: {
        create: [
          { language: 'en', name: 'Vegetables' },
          { language: 'hi', name: 'सब्जियां' } // Example Hindi translation
        ]
      }
    },
  });

  // Create Product
  const product = await prisma.product.create({
    data: {
      farmerId: farmerProfile.id,
      categoryId: vegCategory.id,
      status: 'PUBLISHED',
      translations: {
        create: [
          { language: 'en', name: 'Organic Tomatoes', description: 'Freshly picked red tomatoes.' },
          { language: 'hi', name: 'जैविक टमाटर', description: 'ताजा तोड़े गए लाल टमाटर।' }
        ]
      },
      variants: {
        create: [
          {
            unit: 'kg',
            price: 50.0,
            minQuantity: 1,
            availableQuantity: 100,
          }
        ]
      }
    },
    include: {
      variants: true,
    }
  });

  // Create Organization Consumer
  const orgUser = await prisma.user.create({
    data: {
      name: 'City Hospital',
      email: 'hospital@example.com',
      phone: '+1555666777',
      role: 'INSTITUTIONAL_CONSUMER',
      language: 'en',
    }
  });

  await prisma.organizationProfile.create({
    data: {
      userId: orgUser.id,
      organizationName: 'City Central Hospital',
      type: 'HOSPITAL',
      peopleServed: 1000,
      verificationStatus: 'VERIFIED'
    }
  });

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
