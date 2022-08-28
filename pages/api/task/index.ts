import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany({
      where: {
        user: {
          email: session?.user?.email as string,
        },
      },
    });
    res.json(tasks);
    return;
  } else if (req.method === 'POST') {
    const body = JSON.parse(req.body);

    const task = await prisma.task.create({
      data: {
        taskName: body.taskName,
        user: {
          connect: {
            email: session?.user?.email as string,
          },
        },
      },
    });
    res.json(task);
    return;
  }
};

export default handler;
