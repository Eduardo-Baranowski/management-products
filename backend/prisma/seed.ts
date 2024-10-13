import {} from '@prisma/client';

import { logger } from '../src/config/logger';
import { prisma } from '../src/database';

const run = async (): Promise<void> => {
  const categories = [
    {
      id: 1,
      name: 'Eletroportáteis',
      discount: 2.55,
    },
    {
      id: 2,
      name: 'Móveis',
      discount: 3,
    },
    {
      id: 3,
      name: 'Geladeiras',
      discount: 4.3,
    },
    {
      id: 4,
      name: 'Smartphones',
      discount: 5,
    },
    {
      id: 5,
      name: 'Eletrônicos',
      discount: 7.5,
    },
  ];

  await prisma.$transaction(async trx => {
    await Promise.all(
      categories.map(async category => {
        await trx.category.upsert({
          where: { id: category.id },
          update: {},
          create: {
            id: category.id,
            name: category.name,
            discount: category.discount,
          },
        });
      }),
    );
  });
};

run()
  .then(async () => {
    logger.info('Seed completed!');
    await prisma.$disconnect();
  })
  .catch(async error => {
    logger.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
