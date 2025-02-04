import express from 'express';
import { generateVulnerabilityReport } from '../services/reportGenerator';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const pdfBuffer = await generateVulnerabilityReport(req.body.contractCode);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=audit-report.pdf'
    });
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;