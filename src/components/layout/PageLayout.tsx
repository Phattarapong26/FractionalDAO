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
                <img 
                width={150} 
                height={150} 
                className="text-dao mr-2" 
                src="https://github.com/Phattarapong26/image/blob/main/Screenshot%202568-02-03%20at%2018.03.49.png?raw=true" 
                alt="FractionalDAO Logo" 
              />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                แพลตฟอร์มที่ช่วยให้ผู้ใช้สามารถเข้าถึงการลงทุนในสินทรัพย์ได้อย่างง่ายดายผ่าน Smart Contracts
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 FractionalDAO. สงวนลิขสิทธิ์ทั้งหมด
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/Phattarapong26/SmartContract" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600">
                  <Github className="h-5 w-5" />
                </a>
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
