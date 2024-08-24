"use client";

import { FC, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportToPDF: FC = () => {
  const [elementVisible, setElementVisible] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    const checkVisibility = () => {
      const element = document.getElementById('content-to-export');
      setElementVisible(!!element && element.offsetParent !== null);
    };

    checkVisibility();
    window.addEventListener('resize', checkVisibility);

    return () => {
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    const element = document.getElementById('content-to-export');
  
    if (!element) {
      console.error('Element not found');
      alert('Unable to export: Content not found.');
      setIsExporting(false);
      return;
    }
  
    try {
      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL('image/png');
  
      if (!imgData.startsWith('data:image/png;base64,')) {
        throw new Error('Image data is invalid');
      }
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('exported-content.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('An error occurred while generating the PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={!elementVisible || isExporting}
        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
          (!elementVisible || isExporting) && 'opacity-50 cursor-not-allowed'
        }`}
      >
        {isExporting ? 'Exporting...' : 'Export to PDF'}
      </button>
    </div>
  );
};

export default ExportToPDF;

