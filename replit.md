# Commute Cost Calculator

## Overview

This is a commute cost calculator application built as a full-stack web application with Supabase backend. The app allows users to track and calculate costs for shared commutes among multiple people using different vehicles. Users can manage a fleet of cars (with associated owners and costs), track multiple people participating in commutes, and record individual commute trips with automatic cost splitting calculations.

The application is designed for German-speaking users (as indicated by the "de" language setting) and helps groups fairly split transportation costs based on who drives, which vehicles are used, and who participates in each trip.

**Data is now stored in a shared Supabase database, so multiple users can access the same data from different devices.**

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: React 18 with TypeScript**
- **Problem**: Need for a type-safe, component-based UI with reactive state management
- **Solution**: React with TypeScript provides strong typing, component reusability, and efficient re-rendering
- **Rationale**: React's virtual DOM and hooks API simplify state management for the calculator's interactive features

**Build Tool: Vite**
- **Problem**: Fast development server and optimized production builds needed
- **Solution**: Vite as the build tool and dev server
- **Configuration**: Port 5000 with proxy to backend API on port 3001

**Styling: Tailwind CSS**
- **Problem**: Need for rapid UI development with consistent styling
- **Solution**: Utility-first CSS framework (Tailwind) with PostCSS processing

### Backend Architecture

**Express.js API Server**
- **Problem**: Need to persist data across devices and users
- **Solution**: Express.js server with RESTful API endpoints
- **Port**: 3001 (proxied through Vite on port 5000)

**Database: Supabase (PostgreSQL)**
- **Problem**: Need shared, persistent database accessible by multiple users
- **Solution**: Supabase managed PostgreSQL database
- **Tables**: persons, cars, commutes
- **Access**: Via @supabase/supabase-js client library

### API Endpoints

- `GET/POST/DELETE /api/persons` - Manage people
- `GET/POST/DELETE /api/cars` - Manage vehicles
- `GET/POST/DELETE /api/commutes` - Manage commute trips

### Data Model

**Core Entities**:
1. **persons**: id (serial), name (text)
2. **cars**: id (serial), name (text), owner_id (foreign key), roundtrip_cost (decimal)
3. **commutes**: id (serial), date (date), trip_type (text), selected_cars (int[]), selected_persons (int[]), drivers (int[]), price_per_person (decimal)

## Recent Changes

**November 27, 2025 - Database Integration**:
- Added Supabase PostgreSQL database for shared data storage
- Created Express.js backend API server
- Updated frontend to use API calls instead of localStorage
- Added loading states and error handling
- Added refresh button to reload data from database

**November 27, 2025 - Bug Fixes**:
- Fixed storage API bug: Replaced non-existent `window.storage` API with standard `localStorage`
- Added proper TypeScript type definitions for CarType, PersonType, and CommuteType interfaces
- Fixed type annotation in `getMonths()` function to properly return `string[]`
- Fixed API response transformation (snake_case to camelCase, string to number)

## External Dependencies

### Core Framework Dependencies

**React Ecosystem**:
- `react` (^18.3.1): Core library for UI components
- `react-dom` (^18.3.1): DOM rendering for React

**Backend**:
- `express` (^4.21.0): Web server framework
- `@supabase/supabase-js` (^2.45.0): Supabase client library
- `cors` (^2.8.5): CORS middleware
- `tsx` (^4.19.0): TypeScript execution for Node.js
- `concurrently` (^8.2.2): Run multiple processes

**Build and Development Tools**:
- `vite` (^5.4.10): Build tool and dev server
- `@vitejs/plugin-react` (^4.3.3): React integration for Vite
- `typescript` (~5.6.2): Type-checking and compilation

**Styling Pipeline**:
- `tailwindcss` (^3.4.14): Utility-first CSS framework
- `postcss` (^8.4.47): CSS transformation tool
- `autoprefixer` (^10.4.20): Automatic vendor prefix addition

**UI Components**:
- `lucide-react` (^0.460.0): Icon library

## Environment Variables

Required secrets (set in Replit Secrets):
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anon/public key

## Database Setup

Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor to create the required tables.
