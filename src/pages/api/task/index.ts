import { NextApiHandler } from 'next';
import { getServerSession } from 'next-auth/next';

import { prisma } from '@/lib/prisma';

import { authOptions } from '../auth/[...nextauth]';

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' });
    return;
  }

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
