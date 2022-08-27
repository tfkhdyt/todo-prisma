import { NextApiHandler } from 'next';

import { prisma } from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'PATCH') {
    try {
      const oldTask = await prisma.task.findUnique({
        where: {
          id: Number(req.query.id),
        },
      });
      const newTask = await prisma.task.update({
        where: {
          id: Number(req.query.id),
        },
        data: {
          isDone: !oldTask?.isDone,
        },
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
