const express = require('express');
const bodyParser = require('body-parser');
const { sendWhatsAppMessage } = require('./whatsappAutomation'); // Import Puppeteer function

const app = express();
app.use(bodyParser.json());

// Endpoint to handle form submission and send WhatsApp notification
app.post('/send-whatsapp', async (req, res) => {
  const { name, phone, tourName, startDate, participants } = req.body;

  const message = `
    New Booking Notification:
    Name: ${name}
    Phone: ${phone}
    Tour: ${tourName}
    Start Date: ${startDate}
    Participants: ${participants}
  `;

  try {
    // Send a WhatsApp message to your phone number
    await sendWhatsAppMessage('+254792837410', message); // Send to your phone number

    res.status(200).json({ success: true, message: 'Booking notification sent!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
