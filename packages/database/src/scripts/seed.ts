import { db } from "@/db";
import { PaymentStatus, SubscriptionStatus } from "@prisma/client";

async function main() {
  console.log("🌱 Starting database seeding...");

  // Verify packages exist
  const packages = await db.internetPackage.findMany();
  if (packages.length === 0) {
    console.error(
      "❌ No packages found! Please run 'pnpm create:packages' first"
    );
    process.exit(1);
  }
  console.log(`📦 Found ${packages.length} packages`);

  // Create Users with Addresses and Subscriptions
  const users = await Promise.all([
    db.user.create({
      data: {
        email: "rock@example.com",
        phone: "01784061111",
        name: "Rock Reyad",
        username: "rockreyad",
        fathersName: "Mr Boss",
        password: "12345678",
        address: {
          create: {
            street: "5 no ward,BujrukBoyalia",
            city: "Gobindaganj",
            state: "Gaibandha",
            zip: "5740",
          },
        },
        subscriptions: {
          create: {
            packageId: packages[1].id, // Standard 8 package
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: SubscriptionStatus.ACTIVE,
          },
        },
      },
      include: {
        subscriptions: true,
      },
    }),
    db.user.create({
      data: {
        email: "jane@example.com",
        phone: "01722222222",
        name: "Jane Smith",
        username: "janesmith",
        fathersName: "William Smith",
        password: "12345678",
        address: {
          create: {
            street: "456 Park Avenue",
            city: "Chittagong",
            state: "Chittagong",
            zip: "4000",
          },
        },
        subscriptions: {
          create: {
            packageId: packages[2].id, // Plus 10 package
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: SubscriptionStatus.ACTIVE,
          },
        },
      },
      include: {
        subscriptions: true,
      },
    }),
  ]);

  console.log("✅ Created users with addresses and subscriptions");

  // Create some sample payments
  await Promise.all(
    users.map((user) =>
      db.payment.create({
        data: {
          paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          subscriptionId: user.subscriptions[0].id,
          amount: packages[1].price,
          payerReference: user.phone,
          merchantInvoiceNumber: `INV-${Math.random().toString(36).substr(2, 9)}`,
          status: PaymentStatus.COMPLETED,
        },
      })
    )
  );

  console.log("✅ Created sample payments");
  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
