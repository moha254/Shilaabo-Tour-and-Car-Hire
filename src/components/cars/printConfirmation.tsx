const printConfirmation = () => {
  const printWindow = window.open('', '_blank', 'width=600,height=600');
  console.log('printWindow created:', printWindow); // Debugging line

  if (printWindow) {
    printWindow.document.write(`
      <html>
      <head>
        <title>Booking Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .confirmation { border: 1px solid #ccc; padding: 10px; border-radius: 5px; }
          .header { font-size: 24px; margin-bottom: 10px; }
          .details { margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="confirmation">
          <div class="header">Booking Confirmation</div>
          <div class="details">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Pickup Date:</strong> ${formData.pickupDate}</p>
            <p><strong>Return Date:</strong> ${formData.returnDate}</p>
            <p><strong>Pickup Time:</strong> ${formData.pickupTime}</p>
            <p><strong>Return Time:</strong> ${formData.returnTime}</p>
            <p><strong>Driver Required:</strong> ${formData.driverRequired ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  } else {
    console.error('Failed to create print window.');
  }
};
