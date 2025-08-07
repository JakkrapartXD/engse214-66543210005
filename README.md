# 🛡️ ENGSE214 Security Engineering Labs Portfolio

รหัสนักศึกษา: **66543210005**

## 📋 รายการ Labs

### 🚀 Lab 1: Cross-Site Scripting (XSS) Challenge
- **สถานะ**: ✅ พร้อมใช้งาน
- **เรื่อง**: เว็บสื่อการสอน Cross-Site Scripting (XSS) Prevention
- **ฟีเจอร์**:
  - โหมดสลับปลอดภัย/ไม่ปลอดภัย
  - ตัวอย่าง XSS Payloads
  - ฟังก์ชันป้องกัน XSS
  - UI การสอนที่เข้าใจง่าย

### 🔒 Lab 2: Secure User Profile Project
- **สถานะ**: 🚧 กำลังพัฒนา
- **เรื่อง**: ระบบโปรไฟล์ผู้ใช้ที่ปลอดภัย
- **ฟีเจอร์ที่จะมี**:
  - ระบบ Authentication ที่ปลอดภัย
  - การจัดการ Session
  - Input Validation
  - CSRF Protection

## 🌐 GitHub Pages Setup

### วิธีเปิดใช้ GitHub Pages:

1. **Push โค้ดขึ้น GitHub Repository**
   ```bash
   git add .
   git commit -m "Add security labs portfolio"
   git push origin main
   ```

2. **เปิดใช้ GitHub Pages**
   - ไปที่ Repository Settings
   - เลื่อนลงไปที่ส่วน "Pages"
   - เลือก Source: "Deploy from a branch"
   - เลือก Branch: "main" และ Folder: "/ (root)"
   - คลิก Save

3. **URL Structure**
   ```
   หน้าหลัก: https://[username].github.io/engse214-66543210005/
   Lab 1: https://[username].github.io/engse214-66543210005/Lab%201:%20Cross-Site%20Scripting%20(XSS)%20Challenge/
   Lab 2: https://[username].github.io/engse214-66543210005/Lab%202:%20Secure%20User%20Profile%20Project/
   ```

### 📁 โครงสร้างไฟล์:

```
engse214-66543210005/
├── index.html                              # หน้าหลักเลือก Labs
├── README.md                               # เอกสารนี้
├── Lab 1: Cross-Site Scripting (XSS) Challenge/
│   ├── index.html                          # XSS Lab interface
│   ├── app.js                              # XSS demonstration logic
│   └── index.html.backup                   # สำรองไฟล์เดิม
└── Lab 2: Secure User Profile Project/
    ├── index.html                          # User Profile Lab
    └── ... (จะเพิ่มเติมในอนาคต)
```

## 🛠️ วิธีรันในเครื่อง (Local Development)

### Lab 1 (XSS Challenge):
```bash
cd "Lab 1: Cross-Site Scripting (XSS) Challenge"
python3 -m http.server 8000
# เปิดเบราว์เซอร์ไปที่ http://localhost:8000
```

### หน้าหลัก:
```bash
python3 -m http.server 8000
# เปิดเบราว์เซอร์ไปที่ http://localhost:8000
```

## 🎯 จุดประสงค์การเรียนรู้

### Lab 1: XSS Prevention
- เข้าใจช่องโหว่ Cross-Site Scripting
- รู้จักวิธีการป้องกัน XSS
- เรียนรู้การใช้ Sanitization
- เข้าใจความแตกต่างระหว่างโหมดปลอดภัย/ไม่ปลอดภัย

### Lab 2: Secure Authentication (กำลังพัฒนา)
- ระบบ Login/Register ที่ปลอดภัย
- Session Management
- Input Validation และ Sanitization
- CSRF Token Protection

## 📞 ติดต่อ

- **รหัสนักศึกษา**: 66543210005
- **วิชา**: ENGSE214 Security Engineering
- **GitHub Repository**: `https://github.com/[username]/engse214-66543210005`

---

**⚠️ หมายเหตุ**: Labs เหล่านี้สร้างขึ้นเพื่อการศึกษาเท่านั้น โปรดใช้ความรู้ที่ได้รับในทางที่ถูกต้องและมีจริยธรรม