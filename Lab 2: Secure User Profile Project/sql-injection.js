// sql-injection.js - SQL Injection Demo System

// จำลองฐานข้อมูลผู้ใช้
const mockDatabase = [
    { id: 1, username: 'admin', password: 'admin123', role: 'administrator', email: 'admin@example.com' },
    { id: 2, username: 'user', password: 'password', role: 'user', email: 'user@example.com' },
    { id: 3, username: 'test', password: 'test123', role: 'tester', email: 'test@example.com' },
    { id: 4, username: 'guest', password: 'guest', role: 'guest', email: 'guest@example.com' },
    { id: 5, username: 'manager', password: 'manager456', role: 'manager', email: 'manager@example.com' }
];

// ฟังก์ชันจำลอง SQL Query ที่มีช่องโหว่ (โหมดไม่ปลอดภัย)
function vulnerableQuery(username, password) {
    console.log('🔴 กำลังใช้ Vulnerable SQL Query');
    
    // สร้าง SQL query โดยตรง (อันตราย!)
    const sqlQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    console.log('SQL Query:', sqlQuery);
    
    // ตรวจสอบ SQL Injection patterns
    const injectionPatterns = [
        "' OR 1=1",
        "' OR '1'='1",
        "' UNION SELECT",
        "' /*",
        "' OR 'x'='x",
        "admin' --",
        "admin' #",
        "' OR 1=1 --",
        "' OR 1=1 #"
    ];
    
    let isInjection = false;
    let injectionType = '';
    
    // ตรวจสอบว่ามี SQL Injection หรือไม่
    for (let pattern of injectionPatterns) {
        if (username.toLowerCase().includes(pattern.toLowerCase()) || 
            password.toLowerCase().includes(pattern.toLowerCase())) {
            isInjection = true;
            
            if (pattern.includes('UNION')) {
                injectionType = 'Union Attack';
            } else if (pattern.includes('/*')) {
                injectionType = 'Comment Attack';
            } else if (pattern.includes('1=1')) {
                injectionType = 'Boolean Attack';
            } else {
                injectionType = 'Basic SQL Injection';
            }
            break;
        }
    }
    
    if (isInjection) {
        console.log(`🚨 ตรวจพบ SQL Injection: ${injectionType}`);
        
        // ในโหมดไม่ปลอดภัย SQL Injection จะสำเร็จ
        return {
            success: true,
            message: `🔓 SQL Injection สำเร็จ! (${injectionType})`,
            data: mockDatabase, // ส่งข้อมูลทั้งหมด
            query: sqlQuery,
            vulnerability: true,
            injectionType: injectionType
        };
    }
    
    // การ login ปกติ
    const user = mockDatabase.find(u => u.username === username && u.password === password);
    
    if (user) {
        return {
            success: true,
            message: `✅ เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${user.username}`,
            data: [user],
            query: sqlQuery,
            vulnerability: false
        };
    } else {
        return {
            success: false,
            message: '❌ Username หรือ Password ไม่ถูกต้อง',
            data: [],
            query: sqlQuery,
            vulnerability: false
        };
    }
}

// ฟังก์ชันจำลอง SQL Query ที่ปลอดภัย (โหมดปลอดภัย)
function secureQuery(username, password) {
    console.log('🟢 กำลังใช้ Secure SQL Query');
    
    // Input Validation และ Sanitization
    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);
    
    // สร้าง Parameterized Query (จำลอง)
    const sqlQuery = `SELECT * FROM users WHERE username = ? AND password = ?`;
    console.log('SQL Query:', sqlQuery);
    console.log('Parameters:', [cleanUsername, cleanPassword]);
    
    // ตรวจสอบ SQL Injection patterns
    if (containsSQLInjection(username) || containsSQLInjection(password)) {
        console.log('🛡️ ป้องกัน SQL Injection สำเร็จ');
        return {
            success: false,
            message: '🛡️ ตรวจพบการพยายาม SQL Injection - การเข้าสู่ระบบถูกปฏิเสธ',
            data: [],
            query: sqlQuery,
            parameters: [cleanUsername, cleanPassword],
            vulnerability: false,
            blocked: true
        };
    }
    
    // การ login ปกติ (ใช้ข้อมูลที่ผ่านการ sanitize แล้ว)
    const user = mockDatabase.find(u => u.username === cleanUsername && u.password === cleanPassword);
    
    if (user) {
        return {
            success: true,
            message: `✅ เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ${user.username}`,
            data: [user],
            query: sqlQuery,
            parameters: [cleanUsername, cleanPassword],
            vulnerability: false
        };
    } else {
        return {
            success: false,
            message: '❌ Username หรือ Password ไม่ถูกต้อง',
            data: [],
            query: sqlQuery,
            parameters: [cleanUsername, cleanPassword],
            vulnerability: false
        };
    }
}

// ฟังก์ชัน Sanitize Input
function sanitizeInput(input) {
    if (!input) return '';
    
    return input
        .replace(/'/g, "''")           // Escape single quotes
        .replace(/--/g, "")            // Remove SQL comments
        .replace(/\/\*/g, "")          // Remove block comment start
        .replace(/\*\//g, "")          // Remove block comment end
        .replace(/;/g, "")             // Remove semicolon
        .replace(/\bUNION\b/gi, "")    // Remove UNION keyword
        .replace(/\bSELECT\b/gi, "")   // Remove SELECT keyword
        .replace(/\bINSERT\b/gi, "")   // Remove INSERT keyword
        .replace(/\bUPDATE\b/gi, "")   // Remove UPDATE keyword
        .replace(/\bDELETE\b/gi, "")   // Remove DELETE keyword
        .replace(/\bDROP\b/gi, "")     // Remove DROP keyword
        .trim();
}

// ฟังก์ชันตรวจสอบ SQL Injection patterns
function containsSQLInjection(input) {
    if (!input) return false;
    
    const injectionPatterns = [
        /'/,                           // Single quote
        /--/,                          // SQL comment
        /\/\*/,                        // Block comment start
        /\*\//,                        // Block comment end
        /\bOR\s+1\s*=\s*1\b/i,        // OR 1=1
        /\bOR\s+'\w*'\s*=\s*'\w*'\b/i, // OR 'x'='x'
        /\bUNION\b/i,                 // UNION
        /\bSELECT\b/i,                // SELECT
        /\bINSERT\b/i,                // INSERT
        /\bUPDATE\b/i,                // UPDATE
        /\bDELETE\b/i,                // DELETE
        /\bDROP\b/i                   // DROP
    ];
    
    return injectionPatterns.some(pattern => pattern.test(input));
}

// ฟังก์ชันสร้างตาราง HTML สำหรับแสดงผลลัพธ์
function createResultTable(data) {
    if (!data || data.length === 0) {
        return '<p>ไม่พบข้อมูล</p>';
    }
    
    let html = '<table class="users-table">';
    html += '<thead><tr><th>ID</th><th>Username</th><th>Password</th><th>Role</th><th>Email</th></tr></thead>';
    html += '<tbody>';
    
    data.forEach(user => {
        html += `<tr>
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.password}</td>
            <td>${user.role}</td>
            <td>${user.email}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    return html;
}

// ฟังก์ชันแสดงผลลัพธ์
function showResult(result) {
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const resultContent = document.getElementById('result-content');
    
    if (!resultSection || !resultTitle || !resultContent) return;
    
    // แสดง result section
    resultSection.style.display = 'block';
    
    // กำหนดสีและสไตล์ตามผลลัพธ์
    if (result.success) {
        resultSection.className = 'result-section result-success';
        resultTitle.textContent = '✅ ผลลัพธ์การ Login - สำเร็จ';
    } else {
        resultSection.className = 'result-section result-error';
        resultTitle.textContent = '❌ ผลลัพธ์การ Login - ล้มเหลว';
    }
    
    // สร้างเนื้อหา
    let content = `<p><strong>ข้อความ:</strong> ${result.message}</p>`;
    
    if (result.vulnerability) {
        content += `<p><strong>🚨 ประเภทการโจมตี:</strong> ${result.injectionType}</p>`;
        content += `<p><strong>⚠️ ข้อมูลที่รั่วไหล:</strong> ข้อมูลผู้ใช้ทั้งหมดในระบบ!</p>`;
    }
    
    if (result.blocked) {
        content += `<p><strong>🛡️ การป้องกัน:</strong> ระบบตรวจพบและบล็อกการโจมตีแล้ว</p>`;
    }
    
    content += `<p><strong>SQL Query:</strong></p>`;
    content += `<div class="code-block">${result.query}</div>`;
    
    if (result.parameters) {
        content += `<p><strong>Parameters:</strong> ${JSON.stringify(result.parameters)}</p>`;
    }
    
    if (result.data && result.data.length > 0) {
        content += `<p><strong>ข้อมูลที่ได้รับ:</strong></p>`;
        content += createResultTable(result.data);
    }
    
    resultContent.innerHTML = content;
    
    // Scroll ไปที่ผลลัพธ์
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// ฟังก์ชันประมวลผลการ login
function processLogin(username, password) {
    const mode = localStorage.getItem('sqlMode') || 'safe';
    
    console.log(`🔍 กำลังประมวลผล Login - โหมด: ${mode}`);
    console.log(`Username: "${username}", Password: "${password}"`);
    
    let result;
    
    if (mode === 'unsafe') {
        result = vulnerableQuery(username, password);
    } else {
        result = secureQuery(username, password);
    }
    
    showResult(result);
    
    // Log ผลลัพธ์ในคอนโซล
    console.log('📊 ผลลัพธ์:', result);
    
    return result;
}

// ฟังก์ชันสำหรับการทดสอบ payloads ต่างๆ
function testAllPayloads() {
    const payloads = [
        "' OR 1=1 --",
        "' UNION SELECT * FROM users --",
        "'/*",
        "' OR '1'='1",
        "admin' --",
        "' OR 'x'='x' --"
    ];
    
    console.log('🧪 กำลังทดสอบ SQL Injection payloads ทั้งหมด:');
    
    payloads.forEach((payload, index) => {
        console.log(`\n--- Test ${index + 1}: ${payload} ---`);
        processLogin(payload, 'anything');
    });
}

// Event Listener สำหรับฟอร์ม login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (!username.trim()) {
                alert('กรุณาใส่ Username');
                return;
            }
            
            processLogin(username, password);
        });
    }
    
    console.log('💉 SQL Injection Demo System โหลดเรียบร้อย');
    console.log('📚 ฟังก์ชันที่ใช้ได้:');
    console.log('- testAllPayloads() - ทดสอบ payloads ทั้งหมด');
    console.log('- processLogin(username, password) - ทดสอบ login');
    console.log('- containsSQLInjection(input) - ตรวจสอบ SQL injection');
});

// เพิ่มฟังก์ชันลงใน window เพื่อให้เรียกได้จาก Console
window.testAllPayloads = testAllPayloads;
window.processLogin = processLogin;
window.containsSQLInjection = containsSQLInjection;
window.mockDatabase = mockDatabase;