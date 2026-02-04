import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@onyxcloud.test' },
    update: {},
    create: {
      email: 'admin@onyxcloud.test',
      name: 'Onyx Admin',
      role: 'ADMIN',
      passwordHash,
      emailVerifiedAt: new Date()
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
