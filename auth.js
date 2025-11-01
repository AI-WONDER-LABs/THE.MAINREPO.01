import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from './models/User'; // Assuming Mongoose User model

const router = Router();

// Retrieve secrets from environment variables, never hardcode them.
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
}

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post(
  '/login',
  [
    // Validate and sanitize inputs to prevent injection attacks
    body('email', 'Please include a valid email').isEmail().normalizeEmail(),
    body('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email using the ORM (Mongoose)
      const user = await User.findOne({ email });

      // Use a generic error message to avoid disclosing whether an email is registered
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare provided password with the stored hash
      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT payload. Never include sensitive data.
      const payload = {
        user: {
          id: user.id, // Use 'id' which is a virtual getter for '_id' in Mongoose
        },
      };

      // Sign the token with a secret from environment variables
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.json({ token });
    } catch (err) {
      // Log the detailed error on the server but don't expose it to the client
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;