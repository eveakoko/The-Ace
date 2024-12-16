import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request) {
  await connectDB();

  try {
    const { username, email, password } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' }, 
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = generateToken(user);

    return NextResponse.json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Registration failed', error: error.message }, 
      { status: 500 }
    );
  }
}