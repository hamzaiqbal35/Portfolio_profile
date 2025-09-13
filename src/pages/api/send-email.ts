import { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

// Configuration
const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false // Only for development
  },
  debug: process.env.NODE_ENV !== 'production',
  logger: process.env.NODE_ENV !== 'production'
};

// Log configuration (without sensitive info)
console.log('SMTP Configuration:', {
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  hasUser: !!smtpConfig.auth.user,
  hasPass: !!smtpConfig.auth.pass,
  debug: smtpConfig.debug
});

// Create reusable transporter object
const transporter = nodemailer.createTransport(smtpConfig);

// Verify connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Server is ready to take our messages');
  }
});

type Request = IncomingMessage & {
  body?: any;
  method?: string;
};

type Response = ServerResponse & {
  status: (code: number) => Response;
  json: (data: any) => void;
  setHeader: (name: string, value: string) => void;
  end: (data?: string) => void;
};

export async function handler(req: Request, res: Response) {
  console.log('Email API handler called:', req.method);
  console.log('Request body type:', typeof req.body);
  
  // Validate environment variables
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('Missing SMTP credentials');
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Server configuration error' }));
  }

  try {
    // Get data from request body (already parsed by middleware)
    const { name, email, message } = req.body || {};
    
    console.log('Parsed data:', { name, email: email?.substring(0, 5) + '...', messageLength: message?.length });

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed:', { hasName: !!name, hasEmail: !!email, hasMessage: !!message });
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ 
        error: 'Missing required fields',
        required: ['name', 'email', 'message']
      }));
    }

    // Email options
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME || 'Portfolio Contact'}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `New contact from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Message from Portfolio Contact Form</h2>
          <div style="margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-line; margin-top: 10px; line-height: 1.6;">${message}</div>
          </div>
          <p style="color: #64748b; font-size: 0.9em; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    console.log('Mail options prepared:', {
      from: mailOptions.from,
      to: mailOptions.to,
      replyTo: mailOptions.replyTo,
      subject: mailOptions.subject
    });

    // Test SMTP connection first
    console.log('Testing SMTP connection...');
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError);
      res.statusCode = 500;
      return res.end(JSON.stringify({ 
        success: false,
        error: 'SMTP connection failed',
        details: process.env.NODE_ENV === 'development' ? (verifyError as Error).message : undefined
      }));
    }

    // Send email
    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    });
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ 
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected
    }));
    
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error stack:', (error as Error).stack);
    
    // Check for specific error types
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      if (error.message.includes('authentication') || error.message.includes('auth')) {
        errorMessage = 'Email authentication failed. Please check your credentials.';
      } else if (error.message.includes('connection') || error.message.includes('connect')) {
        errorMessage = 'Failed to connect to email server. Please check your settings.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Email sending timed out. Please try again.';
      }
    }
    
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ 
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }));
  }
}
