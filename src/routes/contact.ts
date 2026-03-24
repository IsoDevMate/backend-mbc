import { Router, Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { sendContactNotification } from '../services/emailService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { fullName, email, phone, message } = req.body;

  if (!fullName || !email || !message) {
    res.status(400).json({ error: 'fullName, email, and message are required' });
    return;
  }

  const contact = await Contact.create({ fullName, email, phone, message });

  try {
    await sendContactNotification({ fullName, email, phone, message });
  } catch {
    // log but don't fail the request if email fails
    console.error('Email notification failed');
  }

  res.status(201).json({ success: true, id: contact._id });
});

export default router;
