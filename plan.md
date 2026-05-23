# JETPESA Backend & Advanced Logic Implementation Plan

Upgrade the existing frontend to a fully functional game platform with server-side style logic, real-time betting states, and integrated payment systems.

## 1. Core Logic & Persistence
- **Supabase Integration**: Set up auth, profiles (real/demo balance), and game history tracking.
- **Game Engine (useGameEngine)**: 
  - Formula: `random < 0.05 ? 1.00 : 0.95 / (1 - random)`.
  - States: `betting` (5s countdown), `flying` (live growth), `crashed` (5s pause).
  - Predetermined crash points per round.

## 2. Dynamic Betting Interface
- **Round States**:
  - Countdown Overlay: 5-second window to bet.
  - Validation: 10-1000 KES limits.
  - "CASHOUT" State: Vibrant orange button with real-time payout calculation.
  - Cashout Logic: Add funds to balance immediately, plane keeps flying.

## 3. Financial Systems
- **Wallet Enhancement**:
  - "WITHDRAW" Button: Crimson red, next to deposit.
  - Withdrawal Modal: B2C Nexus Pay API integration (sk_fe4c...4c8f).
  - Deposit Integration: Makamesco link, modal closing, status banner.
  - Demo Mode: Separate 500 KES balance with reset capability.

## 4. Interactive Social/Data Features
- **DATA LIVE**: Dynamic scrolling table of masked players and their live status.
- **LOBBY ROOM**: Interactive chat with system announcements.

## 5. UI Polishing
- Update Navigation Bar with new buttons and toggle.
- Refine animations (Confetti, success banners, rocket arc).
