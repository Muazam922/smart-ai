import { useState } from 'react';
import { Button } from '@nextui-org/react';

export default function ReportGenerator({ contractCode }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractCode })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'audit-report.pdf';
      a.click();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Generate Audit Report</h3>
      <Button 
        color="primary" 
        onPress={generateReport}
        isLoading={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Download PDF Report'}
      </Button>
    </div>
  );
}