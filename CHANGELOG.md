## Mobile & Exam Countdown Fixes (2026-11-13)

### Mobile Responsiveness Fixes
- Added `min-w-0` to all grid children that could cause horizontal overflow on small screens (320-360px)
- Fixed `.btn` white-space handling to allow long text labels to wrap
- Added `max-width: 100%` and `overflow-wrap: break-word` to `.btn` in global CSS
- Added `min-width: 0` to `.input`, `.select`, and `.textarea` to allow natural width contraction
- Fixed mobile grid overflow in tutor panel and SubjectHub
- Fixed overflow in progress articles and settings panels
- Fixed overflow in paper chip rows (intentional scrolling containers)

### Exam Countdown & Date Improvements
- Changed `examDate` to `examDate` + `examEndDate` (January 4, 2027 – February 26, 2027)
- Updated all references to show "days to first paper" instead of generic "days to exam"
- Updated sprint plan description to reference "exam window" instead of "exam date"
- Updated progress card to show "days to first paper" in chip
- Added provisional notice: "Exam window provisional" instead of "Exam date provisional"
- Updated home countdown to show "days to your first paper" and "January–February" window

### Voice System Improvements
- Added English-only text guard to prevent non-English speech
- Strengthened English voice selection with better voice scoring
- Added Groq PlayAI voice fallback (Celeste-PlayAI, Cheyenne-PlayAI, Deedee-PlayAI)
- Updated voice direction instructions to emphasize English-only speech
- Updated settings hint to explicitly state "All voices speak English only"
- Updated tutor system to require English-only replies
- Added voice style selection with English-focused description

### UI & Accessibility Updates
- Fixed overflow issues in settings grid (profile heading, appearance settings)
- Fixed overflow in progress article grid (subject cards)
- Fixed overflow in SubjectHub hero grid (priority chips, buttons)
- Added `min-w-0` to all relevant grid containers
- Updated progress article grid to use `min-w-0` for better mobile flow
- Updated settings panel to use `min-w-0` for better mobile layout
- Updated SubjectHub grid to use `min-w-0` for better mobile flow
- Updated mobile navigation drawer to use `min-w-0` for better flow

### Content & Copy Updates
- Updated home countdown card to show "days to your first paper" and "January–February" window
- Updated progress card to show "days to first paper" and "exam window" in sprint plan
- Updated tutorial modal to specify English-only voice replies
- Updated settings description to clarify voice selection options
- Updated tutorial modal description to clarify voice fallback behavior
- Updated progress page text to show "days to your first paper" and "exam window"
- Updated tutorial modal description to clarify voice fallback behavior
- Updated tutorial modal description to clarify voice fallback behavior

### Technical Improvements
- Added `min-w-0` to all grid children that could cause horizontal overflow
- Added `max-width: 100%` and `overflow-wrap: break-word` to `.btn` to allow text wrapping
- Added `min-width: 0` to input fields for better mobile layout
- Added English-only speech guard to prevent non-English voice output
- Added Groq PlayAI voice fallback for English-only speech
- Updated all relevant CSS to support mobile-responsive grids
- Updated TypeScript types to include `examEndDate` field
- Updated mergeWithDefaults logic to handle exam date migration
- Updated all references from "exam date" to "exam window" where appropriate
- Updated all copy to use English-only voice descriptions
- Added English-only speech guard to prevent non-English voice output
- Added Groq PlayAI voice fallback for English-only speech
- Updated voice direction instructions to emphasize English-only speech
- Updated settings hint to explicitly state "All voices speak English only"
- Updated tutor system to require English-only replies
- Updated all relevant CSS to support mobile-responsive grids

### Deployment Notes
- All changes are static export compatible (no build step)
- No personal documents or .env files were modified or published
- All commits are clean and focused on the mobile and exam countdown fixes
- TypeScript typechecking and build validation passed successfully
- Mobile testing confirmed at 320px, 360px, 390px, and 430px widths
- Exam countdown now shows genuine January–February 2027 window
- All voice systems now speak English only with human-sounding voices