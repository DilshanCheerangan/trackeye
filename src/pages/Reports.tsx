import { FileText, Download, FileSpreadsheet, FileJson, Clock } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: "OFFICIAL RESULTS - MEN'S 100M FINAL", time: "10 MINS AGO", type: "pdf", size: "1.2 MB" },
    { title: "START LIST - WOMEN'S LONG JUMP", time: "1 HOUR AGO", type: "pdf", size: "0.8 MB" },
    { title: "FULL MEET ANALYTICS EXPORT", time: "YESTERDAY", type: "excel", size: "4.5 MB" },
    { title: "ATHLETE PROGRESSION DATA", time: "YESTERDAY", type: "csv", size: "2.1 MB" },
  ];

  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">EXPORTS & DOCS</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">Generate and download raw data.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => alert("Report generation scheduled.")} className="px-6 py-4 bg-track-foam border-4 border-track-dark font-black uppercase tracking-widest text-track-dark hover:bg-track-lagoon transition-all transform -skew-x-6 hover:-translate-y-1 shadow-[4px_4px_0px_#010F1A]">
            Generate Report
          </button>
          <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/stats/report/csv`} download className="inline-block px-6 py-4 bg-track-dark border-4 border-track-dark font-black uppercase tracking-widest text-white hover:bg-track-coral transition-all transform -skew-x-6 hover:-translate-y-1 shadow-[4px_4px_0px_#FF7A45]">
            Download CSV
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div onClick={() => alert("Downloading PDF reports...")} className="brutal-card p-8 flex flex-col items-center justify-center text-center gap-6 cursor-pointer hover:bg-track-coral hover:text-white group">
          <div className="w-20 h-20 bg-track-dark flex items-center justify-center transform -skew-x-12 shadow-[4px_4px_0px_#010F1A] group-hover:shadow-[4px_4px_0px_white]">
            <FileText className="w-10 h-10 text-track-coral group-hover:text-white stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-3xl editorial-heading-bebas text-track-dark group-hover:text-white">PDF REPORTS</h3>
            <p className="text-sm font-black text-track-dark/60 uppercase group-hover:text-white/80">Official start lists and results</p>
          </div>
        </div>
        
        <div className="brutal-card p-8 flex flex-col items-center justify-center text-center gap-6 cursor-pointer hover:bg-[#21A366] hover:text-white group">
          <div className="w-20 h-20 bg-track-dark flex items-center justify-center transform -skew-x-12 shadow-[4px_4px_0px_#010F1A] group-hover:shadow-[4px_4px_0px_white]">
            <FileSpreadsheet className="w-10 h-10 text-[#21A366] group-hover:text-white stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-3xl editorial-heading-bebas text-track-dark group-hover:text-white">EXCEL EXPORTS</h3>
            <p className="text-sm font-black text-track-dark/60 uppercase group-hover:text-white/80">Formatted meet data and analytics</p>
          </div>
        </div>
        
        <div className="brutal-card p-8 flex flex-col items-center justify-center text-center gap-6 cursor-pointer hover:bg-track-sand hover:text-track-dark group">
          <div className="w-20 h-20 bg-track-dark flex items-center justify-center transform -skew-x-12 shadow-[4px_4px_0px_#010F1A] group-hover:shadow-[4px_4px_0px_white]">
            <FileJson className="w-10 h-10 text-track-sand group-hover:text-track-dark stroke-[2.5]" />
          </div>
          <div>
            <h3 className="text-3xl editorial-heading-bebas text-track-dark">RAW CSV/JSON</h3>
            <p className="text-sm font-black text-track-dark/60 uppercase group-hover:text-track-dark/80">Raw timing and tracking data</p>
          </div>
        </div>
      </div>

      <div className="brutal-card p-0 overflow-hidden">
        <div className="p-4 border-b-8 border-track-dark bg-track-foam">
          <h3 className="font-black text-3xl editorial-heading-bebas text-track-dark">RECENT EXPORTS</h3>
        </div>
        <div className="bg-white">
          {reports.map((report, i) => (
            <div key={i} className={`flex items-center justify-between p-6 border-b-4 border-track-dark/10 hover:bg-track-foam transition-colors group ${i === reports.length - 1 ? 'border-b-0' : ''}`}>
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 flex items-center justify-center transform -skew-x-6 border-4 border-track-dark shadow-[4px_4px_0px_#010F1A] ${
                  report.type === 'pdf' ? 'bg-track-coral text-white' :
                  report.type === 'excel' ? 'bg-[#21A366] text-white' :
                  'bg-track-sand text-track-dark'
                }`}>
                  {report.type === 'pdf' ? <FileText className="w-6 h-6 stroke-[2.5]" /> : 
                   report.type === 'excel' ? <FileSpreadsheet className="w-6 h-6 stroke-[2.5]" /> : 
                   <FileJson className="w-6 h-6 stroke-[2.5]" />}
                </div>
                <div>
                  <h4 className="font-black text-xl text-track-dark group-hover:text-track-coral transition-colors">{report.title}</h4>
                  <div className="flex items-center gap-4 text-xs font-bold text-track-dark/50 mt-1 uppercase tracking-widest">
                    <span>{report.type}</span>
                    <span>{report.size}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {report.time}</span>
                  </div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); alert("Downloading report..."); }} className="brutal-button p-3 bg-white hover:bg-track-lagoon shadow-[4px_4px_0px_#010F1A]">
                <Download className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
