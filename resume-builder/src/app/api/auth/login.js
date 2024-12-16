import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(user);

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message }, 
      { status: 500 }
    );
  }
}