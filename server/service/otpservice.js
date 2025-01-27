// otpService.js
import nodemailer from 'nodemailer';

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // you can also use SMTP settings directly
  auth: {
    user: 'your-email@gmail.com', // your email
    pass: 'your-email-password'   // your email password or an app-specific password
  }
});

// Function to generate a random OTP
const generateOtpCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP to user’s email
export const sendOtp = async (email, name) => {
  const otpCode = generateOtpCode();

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Verification Code',
    text: `Hello ${name},\n\nYour OTP code is: ${otpCode}\n\nPlease use this code to complete your verification.`
  };

  try {
    await transporter.sendMail(mailOptions);
    return otpCode; // return OTP to save temporarily for verification
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Could not send OTP');
  }
};
