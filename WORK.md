# WORK.md — Changes & Fixes

Went through the whole project and fixed it up. Here's everything that changed, from most important to least.

## 1. Security Fixes (the big ones)

**Firestore rules were wide open.**
The database rules literally said `allow read, write: if true;` — meaning anyone on the internet could read or write any data in the database directly, no login needed. Changed it to `allow read, write: if false;` since all reads/writes already go through the Next.js server with the admin SDK anyway, so the client never needs direct access.

**Admin page was leaking data to non-admins.**
The admin page was fetching every single applicant's data (names, emails, phone numbers, answers) and only checking "is this an admin?" on the client side, AFTER the data was already sent to the browser. So even a non-admin user's browser would receive all that data, it was just hidden by a UI check. Moved the auth check to the server, before any data is fetched, so unauthorized users never receive it in the first place.

**Admin API routes had zero auth checks.**
Three routes — get all applicants, send emails, and shortlist candidates — would run for literally anyone who hit the URL, no login or role check at all. Added proper session + admin role checks to all three so they return a 401 if you're not an admin.

## 2. Fixed Corrupted Data

The department list and all the interview questions were full of scrambled garbage text — random symbols and nonsense instead of actual words. Rewrote all of it with real department names, real descriptions, and real interview questions per department.

## 3. Removed Dead Code / Performance Junk

Found a bunch of components running pointless loops (tens of thousands of iterations) on every single render that did absolutely nothing useful — just wasted CPU and could make the app feel janky. Removed all of that, plus a bunch of unused state variables and debug attributes that were leaking internal values into the page's HTML.

## 4. Bug Fixes / UX Improvements

- Extended the application deadline
- Retry button now only resubmits departments that actually failed, instead of resubmitting everything
- Fixed loading state so "Checking your status..." actually shows when it should
- Added a proper empty state for when no department is selected
- Added a proper "already submitted" state so people can't resubmit pointlessly
- Wrapped a risky API call in try/catch so it fails gracefully instead of breaking silently
- Fixed department name matching so minor formatting differences don't cause questions to disappear

## 5. UI Redesign

- Rebuilt the departments page and application form using proper UI components (cards, badges, buttons) instead of raw unstyled elements
- Added the missing theme/color variables in the global CSS — this is actually why a lot of the UI looked broken before, since the component library had nothing to style itself with

## 6. Dependency Updates

- Bumped Next.js from 14.2.5 to 14.2.35 (security + bug fixes)
- Switched package manager from Bun to npm

## Summary

| Category | Count |
|---|---|
| Critical security fixes | 4 |
| Corrupted data restored | 2 |
| Dead code cleanups | 9 files |
| Bug/UX fixes | ~10 |
| UI redesign | 3 files + global theme |
| Dependency updates | 2 |

## 7. Local Setup

Manually added a `.env.local` file with the real Firebase and Better Auth credentials needed to run the project locally (this file is git-ignored and not part of the repo/commit — only `.env.example` is tracked as a template).