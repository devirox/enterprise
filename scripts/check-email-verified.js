const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/check-email-verified.js <email>');
    process.exit(2);
  }
  const user = await prisma.user.findUnique({ where: { email } });
  console.log(user);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
