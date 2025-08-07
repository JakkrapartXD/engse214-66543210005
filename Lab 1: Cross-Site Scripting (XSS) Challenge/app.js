document.addEventListener('DOMContentLoaded', () => {
    const commentsContainer = document.getElementById('comments-container');
    const commentForm = document.getElementById('comment-form');
    const nameInput = document.getElementById('name-input');
    const commentInput = document.getElementById('comment-input');
    const modeStatus = document.getElementById('mode-status');
    const safeModeBtn = document.getElementById('safe-mode-btn');
    const unsafeModeBtn = document.getElementById('unsafe-mode-btn');

    // สถานะปัจจุบัน: ปลอดภัย = true, ไม่ปลอดภัย = false
    let isSafeMode = true;

    // อาเรย์เก็บความคิดเห็น
    let comments = [
        {
            name: "ผู้ดูแลระบบ",
            text: "ยินดีต้อนรับสู่เว็บสื่อการสอน XSS! ลองสลับโหมดและทดสอบ payload ต่างๆ"
        },
        {
            name: "นักเรียน",
            text: "ขอบคุณสำหรับตัวอย่างที่ดี ได้เรียนรู้เรื่อง XSS มากเลย!"
        }
    ];

    // ฟังก์ชันสำหรับ Sanitize ข้อมูล (ป้องกัน XSS)
    const sanitize = (str) => {
        const temp = document.createElement('div');
        // .textContent จะแปลงอักขระพิเศษโดยอัตโนมัติ
        temp.textContent = str;
        return temp.innerHTML;
    };

    // ฟังก์ชันแสดงความคิดเห็นแบบปลอดภัย (ป้องกัน XSS)
    function displayCommentsSafe(comments) {
        console.log('🟢 ใช้โหมดปลอดภัย - ป้องกัน XSS');
        commentsContainer.innerHTML = '<h3>💬 ความคิดเห็น (โหมดปลอดภัย)</h3>';
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            // ใช้ฟังก์ชัน sanitize กับข้อมูลที่มาจากผู้ใช้ก่อนแสดงผล
            const safeName = sanitize(comment.name);
            const safeText = sanitize(comment.text);

            // ใช้ innerHTML หลังจาก sanitize แล้ว
            commentElement.innerHTML = `<strong>${safeName}:</strong> ${safeText}`;
            commentsContainer.appendChild(commentElement);
        });
    }

    // ฟังก์ชันแสดงความคิดเห็นแบบไม่ปลอดภัย (มีช่องโหว่ XSS)
    function displayCommentsUnsafe(comments) {
        console.log('🔴 ใช้โหมดไม่ปลอดภัย - มีช่องโหว่ XSS');
        commentsContainer.innerHTML = '<h3>💬 ความคิดเห็น (โหมดไม่ปลอดภัย - มีช่องโหว่!)</h3>';
        
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            // ⚠️ ปัญหา! ใช้ .innerHTML โดยตรงโดยไม่ sanitize
            // ทำให้สามารถฉีด JavaScript ได้
            commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.text}`;
            commentsContainer.appendChild(commentElement);
        });
    }

    // ฟังก์ชันอัพเดทการแสดงผลตามโหมด
    function updateDisplay() {
        if (isSafeMode) {
            displayCommentsSafe(comments);
            modeStatus.textContent = '🟢 โหมดปลอดภัย - ป้องกัน XSS';
            modeStatus.className = 'mode-status mode-safe';
        } else {
            displayCommentsUnsafe(comments);
            modeStatus.textContent = '🔴 โหมดไม่ปลอดภัย - มีช่องโหว่ XSS';
            modeStatus.className = 'mode-status mode-unsafe';
        }
    }

    // Event Listeners สำหรับปุ่มสลับโหมด
    safeModeBtn.addEventListener('click', () => {
        isSafeMode = true;
        updateDisplay();
        console.log('เปลี่ยนเป็นโหมดปลอดภัย');
    });

    unsafeModeBtn.addEventListener('click', () => {
        isSafeMode = false;
        updateDisplay();
        console.log('⚠️ เปลี่ยนเป็นโหมดไม่ปลอดภัย - ระวัง XSS!');
        
        // แสดงคำเตือน
        setTimeout(() => {
            if (confirm('คุณกำลังเปลี่ยนเป็นโหมดไม่ปลอดภัย ซึ่งมีช่องโหว่ XSS จริง!\n\nใช้เพื่อการศึกษาเท่านั้น\n\nคลิก OK เพื่อดำเนินการต่อ')) {
                console.log('ผู้ใช้ยืนยันการใช้โหมดไม่ปลอดภัย');
            }
        }, 100);
    });

    // Event Listener สำหรับฟอร์มโพสต์ความคิดเห็น
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = nameInput.value.trim();
        const text = commentInput.value.trim();
        
        if (name && text) {
            // เพิ่มความคิดเห็นใหม่
            const newComment = { name, text };
            comments.push(newComment);
            
            console.log('เพิ่มความคิดเห็นใหม่:', newComment);
            
            // อัพเดทการแสดงผล
            updateDisplay();
            
            // ล้างฟอร์ม
            nameInput.value = '';
            commentInput.value = '';
            
            // แสดงการแจ้งเตือนเมื่อโพสต์สำเร็จ
            const alertMsg = isSafeMode 
                ? 'โพสต์ความคิดเห็นสำเร็จ! (โหมดปลอดภัย)' 
                : 'โพสต์ความคิดเห็นสำเร็จ! (โหมดไม่ปลอดภัย - ระวัง XSS!)';
            
            setTimeout(() => alert(alertMsg), 100);
        }
    });

    // ฟังก์ชันตัวอย่างสำหรับการศึกษา
    function demonstrateXSSProtection() {
        console.log('=== การป้องกัน XSS ===');
        console.log('Input ดิบ: <script>alert("XSS")</script>');
        console.log('หลัง sanitize:', sanitize('<script>alert("XSS")</script>'));
        console.log('========================');
    }

    // เพิ่มฟังก์ชันสาธิตลงใน window เพื่อให้เรียกได้จาก Console
    window.demonstrateXSS = demonstrateXSSProtection;
    window.addTestPayload = (name, payload) => {
        comments.push({ name, text: payload });
        updateDisplay();
        console.log('เพิ่ม test payload:', { name, text: payload });
    };

    // แสดงความคิดเห็นเริ่มต้น
    updateDisplay();
    
    // แสดงข้อมูลในคอนโซลสำหรับการเรียนรู้
    console.log('🛡️ เว็บสื่อการสอน XSS พร้อมใช้งาน!');
    console.log('📚 คำสั่งที่ใช้ได้:');
    console.log('- demonstrateXSS() - แสดงตัวอย่างการป้องกัน XSS');
    console.log('- addTestPayload("ชื่อ", "payload") - เพิ่ม test payload');
    console.log('💡 ลองสลับโหมดและทดสอบ XSS payload ต่างๆ!');
    
    // แสดงตัวอย่างการป้องกัน XSS
    demonstrateXSSProtection();
});