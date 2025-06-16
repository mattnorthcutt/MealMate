'use client';

import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { signIn } from '@/utils/auth';

export default function SignIn() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Logo */}
      <img
        src="/images/logo.png"
        alt="MealMate Logo"
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          objectFit: 'contain',
          opacity: 0.05,
          zIndex: 0,
        }}
      />

      {/* Sign-In Card */}
      <Card
        className="shadow"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: '3rem',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: '#ffffff',
          zIndex: 1,
        }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold text-dark">Sign In to MealMate</h2>
          <p className="text-muted small">Plan smart. Eat smarter. Stay organized.</p>
        </div>

        <div className="d-grid">
          <Button
            onClick={signIn}
            variant="dark"
            size="lg"
            style={{
              padding: '0.75rem',
              fontWeight: '500',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          >
            Sign in with Google
          </Button>
        </div>

        <div className="text-center mt-4">
          <small className="text-muted">By signing in, you agree to MealMate’s terms and privacy policy.</small>
        </div>
      </Card>
    </div>
  );
}
