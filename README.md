# SmartContractMD 🚀

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

## 📖 เกี่ยวกับโปรเจค

SmartContractMD เป็นเว็บแอปพลิเคชันที่พัฒนาด้วย React, TypeScript และ Vite ที่เชื่อมต่อกับ Smart Contract บน Blockchain เพื่อจัดการข้อมูลแบบกระจายศูนย์ โปรเจคนี้ใช้ Shadcn/UI สำหรับส่วนติดต่อผู้ใช้ที่สวยงาม

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: React, TypeScript, Vite
- **UI Components**: Shadcn/UI, Tailwind CSS
- **Blockchain**: Ethers.js
- **Smart Contract**: Solidity
- **Routing**: React Router DOM
- **Form Management**: React Hook Form, Zod

## 🚀 การติดตั้ง

```bash
# โคลนโปรเจค
git clone https://github.com/yourusername/SmartContractMD.git
cd SmartContractMD

# ติดตั้ง Dependencies
npm install

# รันในโหมดพัฒนา
npm run dev
```

## 📁 โครงสร้างโปรเจค

```
SmartContractMD/
├── src/                  # โค้ดหลักของแอปพลิเคชัน
│   ├── components/       # React Components ที่ใช้ร่วมกัน
│   ├── contexts/         # React Contexts
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # ฟังก์ชันและ Utilities
│   ├── pages/            # หน้าต่างๆ ของแอป
│   ├── types/            # TypeScript Types
│   ├── App.tsx           # Component หลัก
│   └── main.tsx          # Entry point
├── smartContract/        # Smart Contract เขียนด้วย Solidity
│   └── smartContract.sol # ไฟล์ Smart Contract
├── public/               # Assets สาธารณะ
├── docs/                 # เอกสารประกอบโปรเจค
│   ├── SMART_CONTRACT.md # เอกสารอธิบาย Smart Contract
│   ├── USER_GUIDE.md     # คู่มือการใช้งานสำหรับผู้ใช้ทั่วไป
│   └── DEVELOPER.md      # เอกสารสำหรับนักพัฒนา
└── ...                   # ไฟล์การกำหนดค่าต่างๆ
```

## 🔧 การใช้งาน

1. เชื่อมต่อกับ Wallet (Metamask หรือ wallet อื่นๆ ที่รองรับ)
2. ดำเนินการโต้ตอบกับ Smart Contract ผ่านอินเตอร์เฟซที่ใช้งานง่าย
3. ดูข้อมูลและธุรกรรมที่บันทึกบน Blockchain

ดูรายละเอียดเพิ่มเติมได้ที่ [คู่มือการใช้งาน](docs/USER_GUIDE.md)

## 📝 วิธีมีส่วนร่วมในการพัฒนา

การมีส่วนร่วมในโปรเจคนี้ยินดีต้อนรับเสมอ! เรียนรู้เพิ่มเติมได้ที่ [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 เอกสารเพิ่มเติม

- [รายละเอียด Smart Contract](docs/SMART_CONTRACT.md) - เอกสารอธิบายการทำงานของ Smart Contract
- [คู่มือการใช้งาน](docs/USER_GUIDE.md) - สำหรับผู้ใช้งานทั่วไป
- [เอกสารสำหรับนักพัฒนา](docs/DEVELOPER.md) - รายละเอียดสำหรับนักพัฒนา

## 📄 ลิขสิทธิ์

โปรเจคนี้เผยแพร่ภายใต้ลิขสิทธิ์ MIT - ดูไฟล์ [LICENSE.md](LICENSE.md) สำหรับรายละเอียด

## 📞 ติดต่อ

หากคุณมีคำถามหรือข้อเสนอแนะ กรุณาเปิด Issue ใน GitHub Repository นี้ หรือติดต่อเราที่ [อีเมล](mailto:support@example.com)

---

พัฒนาด้วย ❤️ โดยทีม SmartContractMD
