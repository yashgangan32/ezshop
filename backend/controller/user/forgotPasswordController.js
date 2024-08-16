const nodemailer=require('nodemailer')

async function fpc(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
      secure:true,
      host: 'smtp.gmail.com',
      port:465,
      auth: {
        user: 'yashgangantest@gmail.com', // Your Gmail address
        pass: 'tikzozuitbsufrvp', // Your Gmail password or App Password
      },
    });

    const mailOptions = {
      from: 'yashgangantest@gmail.com>',
      to: email,
      subject: 'Your OTP Code For Password Reset',
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent', genotp:otp }); // Optionally return the OTP for testing purposes
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Could not send OTP' });
  }
}

module.exports=fpc
