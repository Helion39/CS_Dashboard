# Vastel CS Operations Center - TODO List

> **Project:** Capstone Prototype  
> **Last Updated:** December 25, 2024

---

## 🔴 HIGH Priority (Prototype Critical)

### Ticket Flow Features
- [x] **Create Ticket Form** - Manual input untuk WhatsApp/Phone ✅
  - Form: Customer name, phone, subject, description
  - Auto-classify priority berdasarkan keywords
  - Implemented as modal in Senior Tickets page

- [x] **Close Ticket Button** - Final step sebelum score ✅
  - Approve & Close button for IT-reviewed tickets
  - Mark Done button for direct resolution
  - Visible in Senior Tickets page

- [x] **Assign Dropdown/Modal** - Assignment feature ✅
  - Modal dengan 3 options: Self, Junior, IT
  - Show workload & score per agent (fairness)
  - Assigned To column in ticket table

- [x] **Status Change Dropdown** - Ubah status tiket ✅
  - Implemented as action buttons (not dropdown) in dashboard right panel
  - Role-based: Senior (full), Junior (limited), IT (technical)
  - Consistent styling across all dashboards

### Navigation Fixes
- [x] **Navbar Consistency** - All roles now have Dashboard, Tickets, History ✅
  - Junior: Added History link
  - IT Support: Updated to Dashboard, Tickets, History pattern

---

## 🟡 MEDIUM Priority (Polish)

### UI Enhancements
- [x] **Ticket Detail Page** - Click ticket → full view ✅
  - Senior tickets has modal with customer info, status timeline, action buttons
  - Needs: dynamic data loading per ticket


- [x] **Fair Assignment Indicator** - Show workload ✅
  - Assign modal shows "8 active ⚠️" vs "2 active ✅"

### Role-specific Fixes
- [x] **Admin Tickets** - Has "Assigned To" column ✅
- [x] **Senior Tickets** - Has "Assign to Junior" button ✅

---

## 🟢 LOW Priority (Nice to Have)

### Future Features (Untuk Next.js)
- [ ] **Internal Notes/Comments** - Per ticket discussion
- [ ] **Internal Chat** - Antar CS/IT (Slack-style)
- [ ] **Notification System** - Alert untuk assignment baru
- [ ] **Search & Filter Advanced** - Multi-criteria filter
- [ ] **Bulk Actions** - Select multiple tickets

### Reporting Enhancements
- [ ] **Export to CSV/PDF** - Reports page
- [ ] **Date Range Filter** - Custom period

---

## ✅ DONE (Completed)

### Pages Created
- [x] Login page
- [x] Admin Dashboard
- [x] Admin Tickets
- [x] Admin Users
- [x] Admin Reports
- [x] Admin Analytics
- [x] Admin Audit Logs
- [x] Senior Dashboard
- [x] Senior Tickets (with tabs)
- [x] Senior Reports
- [x] Junior Dashboard (rebuilt Tailwind)
- [x] Junior Tickets
- [x] IT Support Dashboard
- [x] History page (all roles)

### Features Implemented
- [x] Consistent Tailwind UI across all roles
- [x] Logout button → Login redirect
- [x] Navigation links working
- [x] Role-based sidebar
- [x] Priority badges (HIGH/MED/LOW)
- [x] Status badges
- [x] Score display
- [x] Score history
- [x] Locked HIGH priority for Junior
- [x] Permission notice cards

### Documentation
- [x] PROJECT_NOTES.md created

---

## 📋 Order of Implementation

### Phase 1: Complete Ticket Flow
1. Create Ticket Form
2. Close Ticket Button
3. Status Change Dropdown
4. Assign Dropdown

### Phase 2: Polish UI
5. Ticket Detail Page
6. History link for Junior
7. SLA Countdown

### Phase 3: Migrate to Next.js
8. Project setup
9. Database schema
10. Authentication
11. API endpoints
12. Connect frontend

---

## 📝 Notes

### Design Decisions
- Chat fitur ditunda, fokus ke ticket flow dulu
- Internal notes optional untuk prototype
- Fair assignment via workload indicator

### Tech Stack (Confirmed)
- Frontend: Next.js 14 + TypeScript + Tailwind
- Backend: Next.js API Routes
- Database: PostgreSQL + Prisma
- Auth: NextAuth.js

### UI Components (For Next.js)
- **Custom Styled Dropdowns** - Native HTML select tidak bisa fully styled
  - Use: Headless UI, Radix UI, or custom component
  - Applies to: Priority filter, Status filter, Assignment dropdown
  - Ensure consistent styling with design system

---

## ⏰ Session Log

| Date | What was done |
|------|---------------|
| Dec 25, 2024 | Created all prototype pages |
| Dec 25, 2024 | Fixed Junior UI consistency |
| Dec 25, 2024 | Added logout functionality |
| Dec 25, 2024 | Created PROJECT_NOTES.md |
| Dec 25, 2024 | Created TODO.md |

---

> **Next Action:** Start with Phase 1 - Create Ticket Form
