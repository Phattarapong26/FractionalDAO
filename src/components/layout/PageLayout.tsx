import React, { ReactNode } from "react";
import Header from "./Header";
import { Github, Globe, ExternalLink, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-8 bg-white border-t border-gray-200">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 mr-2 text-indigo-500" />
                <span className="text-xl font-bold text-indigo-600">FractionalDAO</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                แพลตฟอร์มที่ช่วยให้ผู้ใช้สามารถเข้าถึงการลงทุนในสินทรัพย์ได้อย่างง่ายดายผ่าน Smart Contracts
              </p>
              <div className="flex space-x-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                  <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">ชุมชน</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    ฟอรั่ม
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                    <HeartHandshake className="h-4 w-4 mr-2" />
                    พันธมิตร
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    บล็อก
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">ลิงก์ด่วน</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/marketplace" className="text-sm text-gray-500 hover:text-indigo-600">ตลาด</Link>
                </li>
                <li>
                  <Link to="/governance" className="text-sm text-gray-500 hover:text-indigo-600">การบริหาร</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="text-sm text-gray-500 hover:text-indigo-600">แดชบอร์ด</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">นโยบาย</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">เงื่อนไขการใช้บริการ</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">นโยบายความเป็นส่วนตัว</a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-indigo-600">นโยบายคุกกี้</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 FractionalDAO. สงวนลิขสิทธิ์ทั้งหมด
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-xs text-gray-500 hover:text-indigo-600">
                ช่วยเหลือ
              </a>
              <span className="text-gray-300">|</span>
              <a href="#" className="text-xs text-gray-500 hover:text-indigo-600">
                ติดต่อเรา
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
