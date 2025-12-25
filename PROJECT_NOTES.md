# Vastel Secure CS Operations Center
## Integrated Ticketing & Performance Monitoring System

> **Capstone Project Documentation**
> 
> Last Updated: December 25, 2024

---

## 1. Project Overview

### 1.1 System Name
**"Vastel Secure CS Operations Center"**

### 1.2 Purpose
A centralized command center for customer service operations with:
- Integrated ticketing system
- Real-time performance monitoring
- Role-based access control (RBAC)
- KPI scoring system
- Cybersecurity audit trails

### 1.3 Technology Stack
| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 + TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js |
| Charts | Recharts |

---

## 2. Data Input Architecture

### 2.1 Input Channels

#### **Channel A: Automatic (Freshchat Webhook)**
- Webhook receives data when chat is completed in Freshchat
- AI Classification (Keyword-Based):
  - **Technical Issue** → Keywords: "GPS mati", "Offline", "Tidak gerak", "Error", "Server down"
  - **Billing** → Keywords: "Bayar", "Tagihan", "Rekening", "Invoice"
  - **General Inquiry** → Keywords: "Harga", "Promo", "Kerjasama", "Info"

#### **Channel B: Manual Entry (WhatsApp/Phone)**
- Dedicated form in dashboard
- CS manually inputs complaints from WhatsApp/Phone calls

---

## 3. Ticket Workflow ("GitHub PR Style")

### 3.1 Status Flow

```
OPEN → TRIAGE/ASSIGNED → IN PROGRESS → RESOLVED → VERIFIED → CLOSED
```

### 3.2 Status Definitions

| Status | Description | Who Can Change |
|--------|-------------|----------------|
| **OPEN** | Ticket created (from Freshchat/Manual) | System |
| **TRIAGE** | Being categorized (High/Med/Low) | CS Agent |
| **ASSIGNED** | Assigned to handler | Senior CS, Admin |
| **IN_PROGRESS** | Being worked on | Assigned Agent |
| **RESOLVED** | Fixed, pending verification | IT Support, CS |
| **PENDING_VERIFICATION** | IT fixed, CS needs to verify with customer | System (auto) |
| **VERIFIED** | Customer confirms fix works | CS Agent |
| **CLOSED** | Ticket completed, score calculated | CS Agent, Admin |

### 3.3 Assignment Rules

| Ticket Priority | Auto-Assign To | Can Be Assigned By |
|-----------------|----------------|-------------------|
| **LOW** | Junior CS | Senior CS, Admin |
| **MEDIUM** | Junior CS | Senior CS, Admin |
| **HIGH** | Senior CS (auto) | Admin only |

### 3.4 IT Support Flow
1. CS identifies technical issue
2. CS clicks "Assign to IT"
3. IT Support works on the issue
4. IT clicks "Mark as Done" → Status becomes `PENDING_VERIFICATION`
5. CS contacts customer to verify
6. Customer confirms → CS changes to `VERIFIED`
7. CS clicks "Close Ticket" → Score calculated

---

## 4. Roles & Privileges

### 4.1 Role Definitions

#### **Super Admin**
- Full system access
- User management (CRUD)
- Can configure privileges
- Access to all reports and audit logs

#### **Senior CS**
- Handle all priority tickets (Low/Medium/High)
- Can assign tickets to Junior CS or IT Support
- Access to team reports
- Can close any ticket

#### **Junior CS**
- Handle Low & Medium priority **only**
- Cannot see/handle High priority tickets (locked)
- Cannot assign to IT Support
- Can escalate to Senior CS
- Can close tickets they handle

#### **IT Support**
- View assigned tickets only
- Can only change status to `RESOLVED`
- Cannot close tickets (CS must verify first)
- Access to their own history

### 4.2 Privilege Matrix

| Privilege Code | Super Admin | Senior CS | Junior CS | IT Support |
|----------------|:-----------:|:---------:|:---------:|:----------:|
| VIEW_ALL_TICKETS | ✅ | ✅ | ❌ | ❌ |
| VIEW_LOW_MED_ONLY | ✅ | ✅ | ✅ | ❌ |
| VIEW_ASSIGNED_ONLY | ✅ | ✅ | ✅ | ✅ |
| HANDLE_HIGH_PRIORITY | ✅ | ✅ | ❌ | ✅ |
| ASSIGN_TO_IT | ✅ | ✅ | ❌ | ❌ |
| ASSIGN_TO_JUNIOR | ✅ | ✅ | ❌ | ❌ |
| MARK_RESOLVED | ✅ | ✅ | ✅ | ✅ |
| CLOSE_TICKET | ✅ | ✅ | ✅ | ❌ |
| MANAGE_USERS | ✅ | ❌ | ❌ | ❌ |
| VIEW_REPORTS | ✅ | ✅ | ❌ | ❌ |
| VIEW_AUDIT_LOGS | ✅ | ❌ | ❌ | ❌ |

### 4.3 Navigation per Role

| Role | Dashboard | Tickets | Users | Reports | Analytics | Audit Logs | History |
|------|:---------:|:-------:|:-----:|:-------:|:---------:|:----------:|:-------:|
| Super Admin | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Senior CS | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Junior CS | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ✅* |
| IT Support | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

*Junior CS History: Only shows their own resolved tickets

---

## 5. KPI Scoring System

### 5.1 Core Concept
- **Demerit Points System** (Penalty-based)
- **Starting Score:** 100 points/month
- **Reset:** Every 1st of the month
- **Calculation:** Triggered when status changes to `CLOSED`

### 5.2 SLA Targets

| Priority | SLA Target |
|----------|------------|
| LOW | 24 Hours |
| MEDIUM | 12 Hours |
| HIGH | 4 Hours |

### 5.3 Scoring Table

#### LOW Priority (General Inquiry, Product Questions)
| Resolution Time | Points Deducted | Label |
|-----------------|:---------------:|-------|
| < 30 minutes | **-0** | Excellent |
| 30 min - 3 hours | **-1** | Normal |
| 3 hours - 24 hours | **-2** | Slow |
| > 3 days | **-5** | Very Bad |

#### MEDIUM Priority (Billing, Administrative)
| Resolution Time | Points Deducted | Label |
|-----------------|:---------------:|-------|
| < 1 hour | **-0** | Excellent |
| 1 - 6 hours | **-2** | Normal |
| 6 - 12 hours | **-4** | Slow |
| > 2 days | **-10** | Warning! |

#### HIGH Priority (GPS Down, Server Issues)
| Resolution Time | Points Deducted | Label |
|-----------------|:---------------:|-------|
| < 30 minutes | **-0** | Heroic! |
| 30 min - 2 hours | **-5** | Normal |
| 2 - 4 hours | **-10** | Critical |
| > 1 day | **-20** | SP 1 |

### 5.4 Score Interpretation

| Score Range | Status | Action |
|-------------|--------|--------|
| 90-100 | 🟢 Excellent | Bonus eligible |
| 70-89 | 🟡 Good | Normal performance |
| 50-69 | 🟠 Warning | Needs improvement |
| < 50 | 🔴 Critical | Requires intervention |

---

## 6. Cybersecurity Features

### 6.1 Granular Access Control (Authorization)
- Implementation of **Least Privilege Principle**
- Junior CS cannot access High Priority tickets (system-enforced lock)
- Prevents insider threat and procedural errors

### 6.2 Audit Trails (Non-Repudiation)
- Every status change is logged
- Every action includes: User, Timestamp, IP Address, Old Value, New Value
- Log format example:
  ```
  [2024-12-25 14:00:00] User 'IT_Support_1' changed Ticket #8821 status from 'IN_PROGRESS' to 'RESOLVED'
  IP: 192.168.1.100 | User-Agent: Chrome/120
  ```

### 6.3 Secure PII Handling
- Automatic masking of sensitive data:
  - Phone: `081234567890` → `0812****7890`
  - NIK: `3201234567890001` → `3201****0001`
- Hash stored for lookup if needed
- Only visible to authorized roles

### 6.4 Session Security
- NextAuth.js for session management
- JWT tokens with expiration
- Role-based middleware protection

---

## 7. Dashboard Visualization

### 7.1 Agent Dashboard
- **Live Score Card:** "Hello Jay Won, Score: 87/100" (Color-coded)
- **Performance Chart:** Line graph showing score trend (Day 1-30)
- **Active Tickets:**
  - High: 2 (Red - Blinking)
  - Medium: 5 (Yellow)
  - Low: 10 (Blue)

### 7.2 Admin Dashboard
- **Team Overview:** All agents with scores
- **Ticket Volume:** Trends over time
- **Resolution Time:** Average per priority
- **Agent Leaderboard:** Rankings

---

## 8. Prototype Pages

### 8.1 Implemented Pages

| Role | Page | File | Status |
|------|------|------|:------:|
| Super Admin | Dashboard | `admin-dashboard.html` | ✅ |
| Super Admin | Tickets | `admin-tickets.html` | ✅ |
| Super Admin | Users | `dashboard-admin.html` | ✅ |
| Super Admin | Reports | `admin-reports.html` | ✅ |
| Super Admin | Analytics | `admin-analytics.html` | ✅ |
| Super Admin | Audit Logs | `admin-audit.html` | ✅ |
| Senior CS | Dashboard | `dashboard-senior.html` | ✅ |
| Senior CS | Tickets | `senior-tickets.html` | ✅ |
| Senior CS | Reports | `senior-reports.html` | ✅ |
| Junior CS | Dashboard | `dashboard-junior.html` | ✅ |
| Junior CS | Tickets | `junior-tickets.html` | ✅ |
| IT Support | Dashboard | `dashboard-it.html` | ✅ |
| All Roles | History | `history.html` | ✅ |
| All | Login | `login.html` | ✅ |

---

## 9. Demo Accounts

| Email | Role | Dashboard |
|-------|------|-----------|
| `admin@vastel.id` | Super Admin | `admin-dashboard.html` |
| `jay@vastel.id` | Senior CS | `dashboard-senior.html` |
| `himari@vastel.id` | Junior CS | `dashboard-junior.html` |
| `budi@vastel.id` | IT Support | `dashboard-it.html` |

---

## 10. Next Steps

1. **Prototype Review** - Finalize all UI/UX
2. **Next.js Migration** - Set up project structure
3. **Database Setup** - PostgreSQL + Prisma schema
4. **Authentication** - NextAuth.js implementation
5. **API Development** - CRUD endpoints
6. **Webhook Integration** - Freshchat receiver
7. **Testing** - Unit, Integration, E2E
8. **Deployment** - Vercel

---

## 11. Project Files

```
CS-Prototype/
├── login.html
├── dashboard-junior.html
├── dashboard-senior.html
├── dashboard-it.html
├── dashboard-admin.html (Users)
├── admin-dashboard.html (Overview)
├── admin-tickets.html
├── admin-reports.html
├── admin-analytics.html
├── admin-audit.html
├── senior-tickets.html
├── senior-reports.html
├── junior-tickets.html
├── history.html
└── css/
    ├── styles.css
    └── dashboard.css
```

---

> **Document maintained by:** Development Team
> **Version:** 1.0.0
