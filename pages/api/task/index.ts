import { NextApiHandler } from 'next';

import { prisma } from '../../../lib/prisma';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
    return;
  } else if (req.method === 'POST') {
    const task = await prisma.task.create({
      data: JSON.parse(req.body),
    });
    res.json(task);
    return;
  }
};

export default handler;
