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

  const body = req.body;

  if (req.method === 'PATCH') {
    try {
      const newTask = await prisma.task.update({
        where: {
          id: Number(req.query.id),
        },
        data: body,
      });

      res.json(newTask);
      return;
    } catch (err) {
      res.status(500).json({
        message: 'Failed to update status',
      });
    }
  } else if (req.method === 'DELETE') {
    const task = await prisma.task.delete({
      where: {
        id: Number(req.query.id),
      },
    });
    res.json(task);
    return;
  }
  throw new Error('Method not implemented');
};

export default handler;
