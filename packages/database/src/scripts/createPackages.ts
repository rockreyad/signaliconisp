import { db } from "@/db";

const packages = [
  {
    name: "Basic 5",
    speed: 5,
    price: 500,
    description: "Perfect for basic browsing and email",
    duration: 30,
    isActive: true,
  },
  {
    name: "Standard 8",
    speed: 8,
    price: 525,
    description: "Great for streaming and light gaming",
    duration: 30,
    isActive: true,
  },
  {
    name: "Plus 10",
    speed: 10,
    price: 600,
    description: "Ideal for HD streaming and gaming",
    duration: 30,
    isActive: true,
  },
  {
    name: "Pro 15",
    speed: 15,
    price: 800,
    description: "Professional package for remote work and gaming",
    duration: 30,
    isActive: true,
  },
  {
    name: "Ultra 20",
    speed: 20,
    price: 1050,
    description: "Ultimate speed for power users",
    duration: 30,
    isActive: true,
  },
];

async function createPackages() {
  try {
    console.info("Starting to create internet packages...");

    // Delete existing packages
    await db.internetPackage.deleteMany({});
    console.info("Cleared existing packages");

    // Create new packages
    const createdPackages = await Promise.all(
      packages.map((pkg) =>
        db.internetPackage.create({
          data: pkg,
        })
      )
    );

    console.info(
      `Successfully created ${createdPackages.length} internet packages:`
    );

    // Log created packages in a table format
    console.table(
      createdPackages.map((pkg) => ({
        Name: pkg.name,
        Speed: `${pkg.speed} Mbps`,
        Price: `${pkg.price} BDT`,
        Duration: `${pkg.duration} days`,
      }))
    );

    return createdPackages;
  } catch (error) {
    console.error("Failed to create packages:");
    console.error(error);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

// Execute if this file is run directly
if (import.meta.url.endsWith("createPackages.ts")) {
  createPackages()
    .then(() => {
      console.info("✅ Packages created successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Failed to create packages:", error);
      process.exit(1);
    });
}

export { createPackages };
