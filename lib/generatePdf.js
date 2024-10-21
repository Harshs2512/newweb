import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Function to generate PDF
export const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('EMI Calculator Results', 14, 22);

    // Add EMI details
    doc.setFontSize(12);
    doc.text(`Loan Amount: ${loanAmount} ₹`, 14, 40);
    doc.text(`Interest Rate: ${interestRate}%`, 14, 50);
    doc.text(`Tenure: ${tenure} months`, 14, 60);
    doc.text(`Monthly EMI: ${emi} ₹`, 14, 70);
    doc.text(`Total Amount Payable: ${totalAmountPayable} ₹`, 14, 80);
    doc.text(`Total Interest Paid: ${totalInterest} ₹`, 14, 90);

    // Add chart data
    doc.text('Yearly Breakdown:', 14, 110);
    chartData.forEach((data, index) => {
        doc.text(`${data.year}: Invested: ${data.investedAmount} ₹, Growth: ${data.growth} ₹`, 14, 120 + (index * 10));
    });

    // Save the PDF
    doc.save('emi_calculator_results.pdf');
};
