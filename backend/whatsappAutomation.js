// whatsappAutomation.js
const puppeteer = require('puppeteer');

// Function to send a WhatsApp message
async function sendWhatsAppMessage(phoneNumber, message) {
  const browser = await puppeteer.launch({ headless: false }); // Launch browser in visible mode for first-time QR scan
  const page = await browser.newPage();

  // Go to WhatsApp Web
  await page.goto('https://web.whatsapp.com/');

  // Wait for QR code to appear and let the user scan it manually
  console.log('Please scan the QR code to log in');
  await page.waitForSelector('._3Xz1g');

  // Wait for WhatsApp Web to fully load
  await page.waitForSelector('._3Xz1g', { hidden: true });

  // Wait for the search bar to appear
  await page.waitForSelector('._2_1wd', { visible: true });

  // Search for your contact (replace with your phone number in international format)
  await page.type('._2_1wd', phoneNumber);
  await page.waitForTimeout(2000); // Wait for contact to appear
  await page.click(`span[title='${phoneNumber}']`); // Click on the contact/group

  // Type the message
  await page.type('div[contenteditable="true"]', message);

  // Send the message by simulating "Enter" key
  await page.keyboard.press('Enter');
  console.log('Notification sent successfully!');

  // Close the browser
  await browser.close();
}

// Export the function so it can be used in other files
module.exports = { sendWhatsAppMessage };
