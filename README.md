# 🚪 Campus Go

**Campus Go** is a centralized system designed to manage and monitor student movement in and out of the campus. Built for institutes like **NIT Hamirpur**, it helps ensure safety, accountability, and streamlined gate access through digital approval and logging mechanisms.

---

## 🧭 Overview

Campus Go replaces manual entry logs with a smart digital solution, where students can:
- Request gate passes
- Get approvals from wardens or authorities
- Log entry/exit timestamps
- Track movement history

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js (App Router)
- Tailwind CSS
- shadcn/ui

**Backend:**
- MongoDB (via Mongoose)
- Server actions

**Other Tools:**
- Cloudinary (Profile Photos / ID Uploads)

---

## 🔐 User Roles

- **Student**: Request gate passes, view approval status, entry/exit log
- **Warden/Admin**: Approve or reject requests, view movement dashboard
- **Guard**: Log actual entry/exit based on approvals

---

## 🚀 Features

- 📝 Gate pass request form
- ✅ Warden approval flow
- ⏱️ Real-time entry/exit logs
- 🧑‍💼 Role-based dashboards
- 📊 Movement history tracking
- 🛑 Alert if student hasn’t returned on time

---

## 📦 Getting Started

### Clone & Install

```bash
git clone https://github.com/your-username/campus-go.git
cd campus-go
npm install
