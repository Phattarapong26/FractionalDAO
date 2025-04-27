# FractionalDAO Smart Contract – เอกสารฉบับสมบูรณ์

## 🧭 วิสัยทัศน์และวัตถุประสงค์
FractionalDAO คือระบบ Smart Contract ที่ออกแบบมาเพื่อปฏิวัติวงการลงทุนในสินทรัพย์จริง (Real World Assets) เช่น อสังหาริมทรัพย์ งานศิลปะ หรือหลักทรัพย์ โดยเปิดโอกาสให้ทุกคนสามารถเป็นเจ้าของร่วม (Fractional Ownership) ได้อย่างโปร่งใส ปลอดภัย และตรวจสอบได้ทุกขั้นตอน ด้วยการนำเทคโนโลยี Blockchain และ DAO (Decentralized Autonomous Organization) มาประยุกต์ใช้

### จุดเด่นของ FractionalDAO
- **ลดข้อจำกัดการลงทุน**: ไม่ต้องใช้เงินก้อนใหญ่ก็เป็นเจ้าของสินทรัพย์มูลค่าสูงได้
- **โปร่งใสและตรวจสอบได้**: ทุกธุรกรรมและการตัดสินใจถูกบันทึกบน Blockchain
- **มีส่วนร่วมบริหารสินทรัพย์**: นักลงทุนสามารถโหวตข้อเสนอสำคัญผ่านระบบ DAO
- **ตลาดรองซื้อขายทันสมัย**: ซื้อ-ขายสิทธิ์การลงทุนได้ตลอดเวลา

---

## 🏗️ โครงสร้างข้อมูลสำคัญใน Smart Contract

### 1. สถานะของสินทรัพย์ (AssetStatus)
กำหนดสถานะของสินทรัพย์แต่ละรายการในระบบ เช่น รออนุมัติ ระดมทุนสำเร็จ หรือถูกยกเลิก
```solidity
enum AssetStatus {
    PENDING,    // รออนุมัติจาก Governance
    FUNDING,    // เปิดระดมทุน
    CLOSED,     // ปิดระดมทุน (สำเร็จหรือไม่สำเร็จ)
    CANCELED    // ยกเลิกโดยผู้ดูแลหรือโหวต
}
```

### 2. ข้อมูลโครงสร้างสินทรัพย์ (Asset)
ใช้แทนข้อมูลของสินทรัพย์แต่ละชิ้นที่นำมาแบ่งขายในระบบ
```solidity
struct Asset {
    uint256 id;                // หมายเลขสินทรัพย์
    string name;               // ชื่อสินทรัพย์ เช่น "คอนโดสุขุมวิท 101"
    string symbol;             // สัญลักษณ์ เช่น "SK101"
    string ipfsMetadata;       // ลิงก์ข้อมูล Metadata บน IPFS
    uint256 totalShares;       // จำนวนส่วนแบ่งทั้งหมด (เช่น 10,000 shares)
    uint256 availableShares;   // ส่วนแบ่งที่ยังเหลือขาย
    uint256 pricePerShare;     // ราคาต่อส่วนแบ่ง (หน่วยเป็น USDT)
    uint256 minInvestment;     // จำนวนเงินลงทุนขั้นต่ำ
    uint256 maxInvestment;     // จำนวนเงินลงทุนสูงสุดต่อคน
    uint256 totalValue;        // มูลค่ารวมของสินทรัพย์
    uint256 fundedAmount;      // จำนวนเงินที่ระดมทุนได้แล้ว
    uint256 apy;
    uint256 fundingDeadline;
    address[] investors;
    mapping(address => uint256) investorAmounts;
    address creator;
    AssetStatus status;
}
```
**อธิบาย:**
- แต่ละ Asset แทนสินทรัพย์จริง 1 รายการ
- กำหนดจำนวนส่วนแบ่งและราคาต่อส่วนแบ่ง
- เก็บข้อมูลนักลงทุนและสถานะการระดมทุน

### 3. ข้อเสนอ (Proposal)
```solidity
struct Proposal {
    uint256 id;
    string title;
    string description;
    string ipfsMetadata;
    uint256 assetId;
    uint256 voteStart;
    uint256 voteEnd;
    uint256 yesVotes;
    uint256 noVotes;
    uint256 executionTime;
    bool executed;
    bool passed;
    string executionData;
    address creator;
    mapping(address => bool) hasVoted;
    mapping(address => uint256) voteWeights;
}
```
**อธิบาย:**
- ใช้สำหรับการโหวตตัดสินใจใน DAO
- มีระบบ Vote Weight ตามสัดส่วนการถือครอง

### 4. การซื้อขาย (Order & Trade)
```solidity
struct Order {
    uint256 id;
    uint256 assetId;
    address creator;
    uint256 shareAmount;
    uint256 pricePerShare;
    uint256 totalPrice;
    uint256 filledAmount;
    uint256 timestamp;
    bool isBuyOrder;
    bool isActive;
}
struct Trade {
    uint256 id;
    uint256 assetId;
    uint256 orderId;
    address buyer;
    address seller;
    uint256 shareAmount;
    uint256 pricePerShare;
    uint256 totalPrice;
    uint256 timestamp;
}
```

---

## ⚙️ ฟังก์ชันหลัก (Main Functions)

### 1. Asset Management
- `createAsset(string name, ...)` – สร้างสินทรัพย์ใหม่
- `purchaseShares(uint256 assetId, uint256 amount)` – ซื้อส่วนแบ่ง
- `closeFunding(uint256 assetId)` – ปิดการระดมทุน

### 2. Governance (DAO)
- `createProposal(...)` – เสนอข้อเสนอใหม่
- `castVote(uint256 proposalId, bool support)` – โหวต
- `executeProposal(uint256 proposalId)` – ดำเนินการข้อเสนอที่ผ่านการโหวต

### 3. Trading
- `createOrder(assetId, ...)` – สร้างคำสั่งซื้อ/ขาย
- `fillOrder(orderId, amount)` – จับคู่ซื้อขาย
- `cancelOrder(orderId)` – ยกเลิกคำสั่ง

### 4. Earnings
- `distributeEarnings(assetId)` – กระจายผลตอบแทน
- `claimEarnings(assetId)` – รับผลตอบแทน

---

## 🔄 ลำดับการใช้งาน (User Journey)
1. ผู้สร้างสินทรัพย์ สร้าง Asset ใหม่ → รออนุมัติ (PENDING)
2. ผ่านการโหวต → เปิดระดมทุน (FUNDING)
3. นักลงทุนซื้อส่วนแบ่ง → เมื่อครบกำหนดหรือครบยอด → ปิดระดมทุน (CLOSED)
4. นักลงทุนสามารถเสนอ/โหวตข้อเสนอ (Proposal) เกี่ยวกับการบริหารสินทรัพย์
5. ผู้ถือส่วนแบ่งสามารถซื้อขายในตลาดรอง (Secondary Market)
6. ผลตอบแทน (Earnings) จะถูกกระจายตามสัดส่วน

---

## 💸 ค่าธรรมเนียมและข้อกำหนด
- ค่าธรรมเนียมการโหวต: 10 FUN Tokens
- ค่าธรรมเนียมการซื้อขาย: 1% ของมูลค่าการซื้อขาย
- ระยะเวลาโหวต: 7 วัน
- ระยะเวลารอดำเนินการ: 1 วันหลังโหวตเสร็จ

---

## 🛡️ ความปลอดภัย (Security)
- ใช้ OpenZeppelin Ownable, ReentrancyGuard, IERC20
- ป้องกันการโจมตี Reentrancy
- จำกัดฟังก์ชันสำคัญเฉพาะเจ้าของ

---

## 🔗 ตัวอย่างการใช้งาน (Solidity)
```solidity
// สร้างสินทรัพย์ใหม่
createAsset("บ้านริมทะเล", "BEACH", ...);

// นักลงทุนซื้อส่วนแบ่ง
purchaseShares(1, 100);

// เสนอข้อเสนอใหม่
createProposal(...);

// โหวตข้อเสนอ
castVote(1, true);

// ซื้อขายส่วนแบ่ง
createOrder(1, 50, 1000, true); // คำสั่งซื้อ 50 shares ราคา 1000
fillOrder(1, 50);
```

---

## 🤝 การเชื่อมต่อกับ Frontend
- ใช้ Ethers.js หรือ Web3.js ในการเชื่อมต่อและเรียกฟังก์ชัน
- ตัวอย่างการเชื่อมต่อ Metamask, การ Approve Token
- การแสดงผลข้อมูล Asset, Proposal, Order, Trade บนหน้าเว็บ

---

## ❓ Q&A / ข้อควรระวัง
- การลงทุนมีความเสี่ยง ผู้ลงทุนควรศึกษาข้อมูลก่อนตัดสินใจ
- Smart Contract นี้ใช้สำหรับการศึกษาและทดลอง

---

## 📚 อ้างอิง
- [โค้ดต้นฉบับ Solidity](../smartContract/smartContract.sol)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
- [Fractional Ownership on Blockchain](https://ethereum.org/en/developers/docs/standards/tokens/)
