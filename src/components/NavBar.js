/* eslint-disable jsx-a11y/anchor-is-valid */

'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Image from 'next/image';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{
        background: 'linear-gradient(90deg, rgb(191, 86, 0) 0%,rgb(83, 8, 5) 100%)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        zIndex: 1050,
      }}
      variant="dark"
    >
      <Container>
        <Link href="/" passHref legacyBehavior>
          <a className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold fs-4">
            <Image src="/images/MealMate Logo.png" alt="MealMate Logo" width={40} height={40} className="rounded-circle" />
            MealMate
          </a>
        </Link>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Link href="/" passHref legacyBehavior>
              <a className="nav-link text-white fw-semibold px-3">Home</a>
            </Link>
            <Link href="/meals" passHref legacyBehavior>
              <a className="nav-link text-white fw-semibold px-3">Meals</a>
            </Link>
            <Link href="/mealplans" passHref legacyBehavior>
              <a className="nav-link text-white fw-semibold px-3">Meal Plans</a>
            </Link>
            <Link href="/meals/new" passHref legacyBehavior>
              <a className="nav-link text-white fw-semibold px-3">Add Meal</a>
            </Link>
            <Link href="/mealplans/new" passHref legacyBehavior>
              <a className="nav-link text-white fw-semibold px-3">Add Meal Plan</a>
            </Link>

            <Button onClick={signOut} variant="light" className="ms-3 rounded-pill fw-bold px-4 py-2">
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
