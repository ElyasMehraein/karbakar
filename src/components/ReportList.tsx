import React from 'react';
import { Report } from '../types/report';

interface ReportListProps {
  reports: Report[];
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">گزارش‌ها</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-blue-500">همه</button>
          <button className="px-4 py-2 text-blue-500">گزارش‌های فروش</button>
          <button className="px-4 py-2 text-blue-500">گزارش‌های مالی</button>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-gray-600">{report.period}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded ${
                  report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status === 'completed' ? 'تکمیل شده' : 'در حال پردازش'}
                </span>
                {report.status === 'completed' && (
                  <a
                    href={report.downloadUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    دانلود
                  </a>
                )}
              </div>
            </div>
            <p className="text-gray-600 mt-2">تاریخ ایجاد: {report.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportList; 