import { prisma } from '../lib/prisma';
import { logger } from '../utils/logger';

const packages = [
  {
    name: 'Basic 5',
    speed: 5,
    price: 500,
    description: 'Perfect for basic browsing and email',
    duration: 30,
    isActive: true,
  },
  {
    name: 'Standard 8',
    speed: 8,
    price: 525,
    description: 'Great for streaming and light gaming',
    duration: 30,
    isActive: true,
  },
  {
    name: 'Plus 10',
    speed: 10,
    price: 600,
    description: 'Ideal for HD streaming and gaming',
    duration: 30,
    isActive: true,
  },
  {
    name: 'Pro 15',
    speed: 15,
    price: 800,
    description: 'Professional package for remote work and gaming',
    duration: 30,
    isActive: true,
  },
  {
    name: 'Ultra 20',
    speed: 20,
    price: 1050,
    description: 'Ultimate speed for power users',
    duration: 30,
    isActive: true,
  },
];

async function createPackages() {
  try {
    logger.info('Starting to create internet packages...');

    // Delete existing packages
    await prisma.internetPackage.deleteMany({});
    logger.warning('Cleared existing packages');

    // Create new packages
    const createdPackages = await Promise.all(
      packages.map((pkg) =>
        prisma.internetPackage.create({
          data: pkg,
        }),
      ),
    );

    logger.success(
      `Successfully created ${createdPackages.length} internet packages:`,
    );

    // Log created packages in a table format
    console.table(
      createdPackages.map((pkg) => ({
        Name: pkg.name,
        Speed: `${pkg.speed} Mbps`,
        Price: `${pkg.price} BDT`,
        Duration: `${pkg.duration} days`,
      })),
    );

    return createdPackages;
  } catch (error) {
    logger.error('Failed to create packages:');
    console.error(error);
    process.exit(1);
  }
}

// Execute if this file is run directly
if (require.main === module) {
  createPackages();
}

export { createPackages };
