# 🌐 GitHub Pages Setup Guide

## การตั้งค่า GitHub Pages สำหรับ ENGSE214 Security Labs

### 📋 ข้อกำหนดเบื้องต้น

1. บัญชี GitHub
2. Git ติดตั้งในเครื่อง
3. โปรเจ็กต์ Labs ที่พร้อมใช้งาน

---

## 🚀 ขั้นตอนการตั้งค่า

### 1. สร้าง Repository บน GitHub

```bash
# สร้าง repository ชื่อ engse214-66543210005
# หรือใช้ชื่ออื่นตามต้องการ
```

### 2. เชื่อมต่อ Local Repository กับ GitHub

```bash
# เริ่มต้น Git repository (ถ้ายังไม่ได้เริ่ม)
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit การเปลี่ยนแปลง
git commit -m "Initial commit: Add security labs portfolio"

# เชื่อมต่อกับ GitHub repository (แทนที่ [username] ด้วยชื่อผู้ใช้ของคุณ)
git remote add origin https://github.com/[username]/engse214-66543210005.git

# Push ขึ้น GitHub
git push -u origin main
```

### 3. เปิดใช้งาน GitHub Pages

#### วิธีที่ 1: ผ่าน GitHub Web Interface

1. **ไปที่ Repository**
   - เข้า https://github.com/[username]/engse214-66543210005

2. **เข้าสู่ Settings**
   - คลิกแท็บ "Settings" ด้านบนของ repository

3. **ค้นหาส่วน Pages**
   - เลื่อนลงไปในเมนูด้านซ้าย
   - คลิก "Pages"

4. **กำหนดค่า Source**
   - Source: เลือก "Deploy from a branch"
   - Branch: เลือก "main"
   - Folder: เลือก "/ (root)"
   - คลิก "Save"

5. **รอการ Deploy**
   - GitHub จะใช้เวลา 5-10 นาทีในการ deploy
   - URL จะแสดงเป็น: `https://[username].github.io/engse214-66543210005/`

#### วิธีที่ 2: ผ่าน GitHub Actions (Advanced)

สร้างไฟล์ `.github/workflows/pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🔗 URL Structure

### URLs หลังจากตั้งค่าเสร็จ:

```
📋 หน้าหลัก
https://[username].github.io/engse214-66543210005/

🚀 Lab 1: XSS Challenge
https://[username].github.io/engse214-66543210005/Lab%201:%20Cross-Site%20Scripting%20(XSS)%20Challenge/

🔒 Lab 2: Secure User Profile
https://[username].github.io/engse214-66543210005/Lab%202:%20Secure%20User%20Profile%20Project/
```

### หมายเหตุเรื่อง URL Encoding:
- ช่องว่างจะถูกแปลงเป็น `%20`
- เครื่องหมาย `:` จะถูกแปลงเป็น `%3A`
- เครื่องหมาย `()` จะถูกแปลงเป็น `%28%29`

---

## 📁 โครงสร้างไฟล์ที่แนะนำ

```
engse214-66543210005/
├── index.html                              # 🏠 หน้าหลัก (Portfolio)
├── README.md                               # 📋 เอกสารโปรเจ็กต์
├── GITHUB_PAGES_SETUP.md                   # 📖 คู่มือนี้
├── Lab 1: Cross-Site Scripting (XSS) Challenge/
│   ├── index.html                          # 🚀 XSS Lab Interface
│   ├── app.js                              # ⚙️ XSS Demo Logic
│   └── index.html.backup                   # 💾 Backup File
├── Lab 2: Secure User Profile Project/
│   ├── index.html                          # 🔒 User Profile Lab
│   ├── app.js                              # ⚙️ (จะเพิ่มในอนาคต)
│   ├── style.css                           # 🎨 (จะเพิ่มในอนาคต)
│   └── ... (ไฟล์อื่นๆ)
└── .github/                                # ⚙️ GitHub Actions (ไม่บังคับ)
    └── workflows/
        └── pages.yml
```

---

## 🔧 การอัพเดทและ Deploy

### การอัพเดทไฟล์:

```bash
# แก้ไขไฟล์
# ...

# Add การเปลี่ยนแปลง
git add .

# Commit
git commit -m "Update labs with new features"

# Push
git push origin main

# GitHub Pages จะ auto-deploy ภายใน 5-10 นาที
```

### การตรวจสอบสถานะ Deploy:

1. ไปที่ Repository
2. คลิกแท็บ "Actions"
3. ดูสถานะการ deploy ล่าสุด

---

## 🛠️ การแก้ไขปัญหาที่พบบ่อย

### 1. หน้าไม่แสดงผล (404 Error)

**สาเหตุ**: ไฟล์ `index.html` ไม่อยู่ใน root directory

**การแก้ไข**:
```bash
# ตรวจสอบว่ามีไฟล์ index.html ใน root
ls -la index.html

# ถ้าไม่มี ให้สร้างหรือย้าย
```

### 2. Labs ไม่แสดงผล

**สาเหตุ**: Path ไม่ถูกต้องหรือชื่อ folder มีอักขระพิเศษ

**การแก้ไข**:
- ตรวจสอบชื่อ folder
- ใช้ URL encoding สำหรับ special characters
- ตรวจสอบว่ามี `index.html` ในแต่ละ lab folder

### 3. Changes ไม่อัพเดท

**สาเหตุ**: Browser cache หรือ GitHub Pages cache

**การแก้ไข**:
```bash
# Hard refresh browser
Ctrl + Shift + R (Windows/Linux)
Cmd + Shift + R (Mac)

# หรือเปิด incognito/private mode
```

### 4. JavaScript/CSS ไม่ทำงาน

**สาเหตุ**: Path ไม่ถูกต้องหรือ MIME type

**การแก้ไข**:
- ใช้ relative path แทน absolute path
- ตรวจสอบ file extension (`.js`, `.css`)

---

## 📊 การติดตาม Analytics (ไม่บังคับ)

### เพิ่ม Google Analytics:

```html
<!-- เพิ่มใน <head> ของทุกหน้า -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔐 Security Best Practices

### 1. ไม่เปิดเผยข้อมูลสำคัญ

- ไม่ commit passwords, API keys
- ใช้ `.gitignore` สำหรับไฟล์ sensitive

### 2. HTTPS บังคับ

GitHub Pages ใช้ HTTPS โดยอัตโนมัติ ✅

### 3. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

---

## 📞 การขอความช่วยเหลือ

### GitHub Pages Documentation:
- https://docs.github.com/en/pages

### GitHub Community:
- https://github.community/

### Stack Overflow:
- Tag: `github-pages`

---

**🎯 เมื่อทำตามขั้นตอนเหล่านี้เสร็จ คุณจะได้:**

✅ หน้า Portfolio หลักที่ `https://[username].github.io/engse214-66543210005/`  
✅ Lab 1 XSS Challenge ที่สามารถเข้าถึงได้  
✅ Lab 2 Placeholder ที่พร้อมสำหรับพัฒนาต่อ  
✅ ระบบ Auto-deploy เมื่อมีการ push code ใหม่  

**Happy Coding! 🚀**