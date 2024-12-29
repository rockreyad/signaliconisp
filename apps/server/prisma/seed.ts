import { PaymentStatus, SubscriptionStatus } from '@prisma/client';
import { hash } from 'bcrypt';
import { prisma } from '../src/lib/prisma';
import { createPackages } from '../src/scripts/createPackages';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create packages first and get the created packages
  const packages = await createPackages();

  // Create Users with Addresses and Subscriptions
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john@example.com',
        phone: '01711111111',
        name: 'John Doe',
        username: 'johndoe',
        fathersName: 'Robert Doe',
        password: await hash('password123', 10),
        addresses: {
          create: {
            street: '123 Main St',
            city: 'Dhaka',
            state: 'Dhaka',
            zip: '1200',
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
    prisma.user.create({
      data: {
        email: 'jane@example.com',
        phone: '01722222222',
        name: 'Jane Smith',
        username: 'janesmith',
        fathersName: 'William Smith',
        password: await hash('password123', 10),
        addresses: {
          create: {
            street: '456 Park Avenue',
            city: 'Chittagong',
            state: 'Chittagong',
            zip: '4000',
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

  console.log('✅ Created users with addresses and subscriptions');

  // Create some sample payments
  await Promise.all(
    users.map((user) =>
      prisma.payment.create({
        data: {
          paymentId: `PAY-${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          subscriptionId: user.subscriptions[0].id,
          amount: packages[1].price,
          payerReference: user.phone,
          merchantInvoiceNumber: `INV-${Math.random().toString(36).substr(2, 9)}`,
          status: PaymentStatus.COMPLETED,
        },
      }),
    ),
  );

  console.log('✅ Created sample payments');
  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
