import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { body, validationResult } from 'express-validator';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure CORS with allowed origins
const isDevelopment = process.env.NODE_ENV !== 'production';
const allowedOrigins = isDevelopment 
  ? ['*']  // Allow all origins in development
  : [
      'https://your-production-domain.com',
      'https://www.your-production-domain.com'
    ];

// Security middleware
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to email endpoint
app.use('/api/send-email', limiter);

// CORS configuration - must be before routes
if (isDevelopment) {
  app.use(cors({
    origin: true, // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  }));
} else {
  app.use(cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
  }));
}

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware - must be after CORS
app.use(express.json({ limit: '10kb' }));

// Create transporter with improved error handling
const createTransporter = () => {
  try {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production'
      },
      debug: process.env.NODE_ENV !== 'production',
      logger: process.env.NODE_ENV !== 'production'
    });
  } catch (error) {
    console.error('Failed to create transporter:', error);
    throw error;
  }
};

// Input validation middleware
const validateInput = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters')
];

// Email endpoint with improved validation and error handling
app.post('/api/send-email', validateInput, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, message } = req.body;

    // Validate environment variables
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP credentials');
      return res.status(500).json({ 
        success: false,
        error: 'Server configuration error' 
      });
    }

    // Create and verify transporter
    const transporter = createTransporter();
    await transporter.verify();

    // Send email
    const info = await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || 'Portfolio Contact'}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `My Portfolio - Message from ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Message from Portfolio Contact Form</h2>
          <div style="margin: 20px 0; padding: 15px; background: #f8fafc; border-radius: 8px;">
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Message:</strong></p>
            <div style="white-space: pre-line; margin-top: 10px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</div>
          </div>
          <p style="color: #64748b; font-size: 0.9em; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    });

    console.log('Email sent successfully:', info.messageId);
    
    res.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    let statusCode = 500;
    let errorMessage = 'Failed to send email';
    
    if (error.message.includes('authentication') || error.message.includes('auth')) {
      statusCode = 401;
      errorMessage = 'Email authentication failed. Please check your credentials.';
    } else if (error.message.includes('connection') || error.message.includes('connect')) {
      statusCode = 503;
      errorMessage = 'Failed to connect to email server. Please try again later.';
    } else if (error.message.includes('timeout')) {
      statusCode = 504;
      errorMessage = 'Email sending timed out. Please try again.';
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    service: 'portfolio-contact-api',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  server.close(() => process.exit(1));
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
