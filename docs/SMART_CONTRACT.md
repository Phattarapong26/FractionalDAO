# FractionalDAO Smart Contract 📄

## 📝 ภาพรวม

FractionalDAO เป็น Smart Contract ที่พัฒนาด้วย Solidity สำหรับการจัดการกรรมสิทธิ์แบบแบ่งส่วน (Fractional Ownership) ของสินทรัพย์ในโลกจริง โดยใช้ Blockchain เป็นพื้นฐาน Contract นี้อำนวยความสะดวกในการระดมทุน การซื้อขายส่วนแบ่ง และการบริหารจัดการสินทรัพย์ร่วมกันผ่านระบบ DAO (Decentralized Autonomous Organization)

## 🛠️ โครงสร้างหลัก

### สถานะสินทรัพย์ (Asset Status)

```solidity
enum AssetStatus {
    PENDING,    // เพิ่งสร้าง รอการอนุมัติจาก governance
    FUNDING,    // ได้รับการอนุมัติแล้ว กำลังระดมทุน
    CLOSED,     // สิ้นสุดระยะเวลาระดมทุน
    CANCELED    // สินทรัพย์ถูกปฏิเสธหรือยกเลิก
}
```

### สินทรัพย์ (Asset)

```solidity
struct Asset {
    uint256 id;                               // ID ของสินทรัพย์
    string name;                              // ชื่อสินทรัพย์
    string symbol;                            // สัญลักษณ์
    string ipfsMetadata;                      // ข้อมูล metadata บน IPFS
    uint256 totalShares;                      // จำนวนส่วนแบ่งทั้งหมด
    uint256 availableShares;                  // จำนวนส่วนแบ่งที่ยังว่างอยู่
    uint256 pricePerShare;                    // ราคาต่อส่วนแบ่ง
    uint256 minInvestment;                    // การลงทุนขั้นต่ำ
    uint256 maxInvestment;                    // การลงทุนสูงสุด
    uint256 totalValue;                       // มูลค่ารวมของสินทรัพย์
    uint256 fundedAmount;                     // จำนวนเงินที่ระดมทุนได้
    uint256 apy;                              // อัตราผลตอบแทนต่อปี
    uint256 fundingDeadline;                  // กำหนดเวลาสิ้นสุดการระดมทุน
    address[] investors;                      // รายชื่อนักลงทุน
    mapping(address => uint256) investorAmounts; // จำนวนเงินลงทุนของแต่ละคน
    address creator;                          // ผู้สร้างสินทรัพย์
    AssetStatus status;                       // สถานะของสินทรัพย์
}
```

### ข้อเสนอ (Proposal)

```solidity
struct Proposal {
    uint256 id;                              // ID ของข้อเสนอ
    string title;                            // ชื่อข้อเสนอ
    string description;                      // รายละเอียดข้อเสนอ
    string ipfsMetadata;                     // ข้อมูล metadata บน IPFS
    uint256 assetId;                         // ID ของสินทรัพย์ที่เกี่ยวข้อง
    uint256 voteStart;                       // เวลาเริ่มต้นการโหวต
    uint256 voteEnd;                         // เวลาสิ้นสุดการโหวต
    uint256 yesVotes;                        // จำนวนโหวตเห็นด้วย
    uint256 noVotes;                         // จำนวนโหวตไม่เห็นด้วย
    uint256 executionTime;                   // เวลาที่จะดำเนินการ
    bool executed;                           // สถานะการดำเนินการ
    bool passed;                             // ผ่านการโหวตหรือไม่
    string executionData;                    // ข้อมูลการดำเนินการ
    address creator;                         // ผู้สร้างข้อเสนอ
    mapping(address => bool) hasVoted;       // ตรวจสอบว่าใครโหวตไปแล้ว
    mapping(address => uint256) voteWeights; // น้ำหนักการโหวตของแต่ละคน
}
```

### การซื้อขาย (Order & Trade)

```solidity
struct Order {
    uint256 id;                // ID ของคำสั่งซื้อ/ขาย
    uint256 assetId;           // ID ของสินทรัพย์
    address creator;           // ผู้สร้างคำสั่ง
    uint256 shareAmount;       // จำนวนส่วนแบ่ง
    uint256 pricePerShare;     // ราคาต่อส่วนแบ่ง
    uint256 totalPrice;        // ราคารวม
    uint256 filledAmount;      // จำนวนที่ถูกซื้อ/ขายไปแล้ว
    uint256 timestamp;         // เวลาที่สร้างคำสั่ง
    bool isBuyOrder;           // เป็นคำสั่งซื้อหรือไม่
    bool isActive;             // คำสั่งยังใช้งานได้หรือไม่
}
```

```solidity
struct Trade {
    uint256 id;                // ID ของการซื้อขาย
    uint256 assetId;           // ID ของสินทรัพย์
    uint256 orderId;           // ID ของคำสั่งซื้อ/ขาย
    address buyer;             // ผู้ซื้อ
    address seller;            // ผู้ขาย
    uint256 shareAmount;       // จำนวนส่วนแบ่งที่ซื้อขาย
    uint256 pricePerShare;     // ราคาต่อส่วนแบ่ง
    uint256 totalPrice;        // ราคารวม
    uint256 timestamp;         // เวลาที่ซื้อขาย
}
```

## 🔍 ฟังก์ชันหลัก

### การจัดการสินทรัพย์

1. **createAsset**: สร้างสินทรัพย์ใหม่เพื่อระดมทุน
2. **purchaseShares**: ซื้อส่วนแบ่งของสินทรัพย์
3. **closeFunding**: ปิดการระดมทุนของสินทรัพย์

### การบริหารจัดการ (Governance)

1. **createProposal**: สร้างข้อเสนอใหม่
2. **castVote**: โหวตข้อเสนอ
3. **executeProposal**: ดำเนินการตามข้อเสนอที่ผ่านการโหวต

### การซื้อขายส่วนแบ่ง (Trading)

1. **createOrder**: สร้างคำสั่งซื้อหรือขาย
2. **fillOrder**: จับคู่การซื้อขาย
3. **cancelOrder**: ยกเลิกคำสั่งซื้อหรือขาย

### การจัดการผลตอบแทน

1. **distributeEarnings**: กระจายผลตอบแทนให้กับผู้ถือส่วนแบ่ง
2. **claimEarnings**: รับผลตอบแทนที่ได้รับการจัดสรร

## 🔄 การทำงานของระบบ

1. **ผู้สร้างสินทรัพย์** สร้างสินทรัพย์ใหม่โดยระบุรายละเอียดและจำนวนส่วนแบ่ง
2. **ผู้ลงทุน** สามารถซื้อส่วนแบ่งในช่วงเวลาระดมทุน
3. **เมื่อปิดการระดมทุน** สินทรัพย์จะเข้าสู่สถานะ CLOSED
4. **ผู้ถือส่วนแบ่ง** สามารถสร้างและโหวตข้อเสนอเกี่ยวกับการจัดการสินทรัพย์
5. **การซื้อขายทุติยภูมิ** ผู้ถือส่วนแบ่งสามารถซื้อขายส่วนแบ่งผ่านระบบการซื้อขายที่กำหนดไว้
6. **ผลตอบแทน** จะถูกกระจายให้ผู้ถือส่วนแบ่งตามสัดส่วนการถือครอง

## 📜 ข้อกำหนดและค่าธรรมเนียม

- **ค่าธรรมเนียมการโหวต**: 10 FUN Tokens
- **ค่าธรรมเนียมการซื้อขาย**: 1% ของมูลค่าการซื้อขาย
- **ระยะเวลาโหวต**: 7 วัน
- **ระยะเวลารอดำเนินการ**: 1 วัน หลังจากโหวตเสร็จสิ้น

## 🔒 ความปลอดภัย

Smart Contract นี้ใช้การป้องกันจาก OpenZeppelin ดังนี้:
- **Ownable**: จำกัดการเข้าถึงฟังก์ชันบางอย่างเฉพาะเจ้าของสัญญา
- **ReentrancyGuard**: ป้องกันการโจมตีแบบ reentrancy
- **IERC20**: มาตรฐานสำหรับโทเค็น ERC-20 ที่ใช้ในระบบ

## 📋 วิธีใช้งาน

1. เชื่อมต่อกับกระเป๋าเงินดิจิทัล (Wallet) ของคุณ
2. อนุมัติการใช้งานโทเค็น USDT และ FUN ในระบบ
3. จ่ายค่าธรรมเนียมด้วยโทเค็น FUN เพื่อเข้าร่วมระบบบริหารจัดการ
4. สำรวจสินทรัพย์ที่มีอยู่หรือสร้างสินทรัพย์ใหม่
5. ลงทุนในสินทรัพย์ที่คุณสนใจ
6. มีส่วนร่วมในการบริหารจัดการผ่านระบบโหวต

---

สำหรับรายละเอียดเพิ่มเติม กรุณาดูที่ [เอกสารเต็ม](https://example.com/docs) หรือ [โค้ดต้นฉบับ](../smartContract/smartContract.sol) 