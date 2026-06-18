import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Analytics() {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<string>("MARCUS JOHNSON");

  const isDemo = sessionStorage.getItem('demoMode') === 'true';

  const mockAthletes = [
    { name: "MARCUS JOHNSON" },
    { name: "ANDRE DE GRASSE" },
    { name: "CHRISTIAN COLEMAN" },
    { name: "SARAH CHEN" }
  ];

  const displayAthletes = isDemo ? mockAthletes : athletes;

  useEffect(() => {
    if (!isDemo) {
      fetch('http://localhost:8001/api/athletes/')
        .then(res => res.json())
        .then(data => {
          setAthletes(data);
          if (data.length > 0) {
            setSelectedAthlete(data[0].name);
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setSelectedAthlete("MARCUS JOHNSON");
    }
  }, [isDemo]);

  const velocityData = [
    { split: '10m', time: 1.86, speed: 19.3, avgSpeed: 18.5 },
    { split: '20m', time: 2.89, speed: 34.9, avgSpeed: 33.2 },
    { split: '30m', time: 3.82, speed: 38.7, avgSpeed: 37.1 },
    { split: '40m', time: 4.68, speed: 41.8, avgSpeed: 39.5 },
    { split: '50m', time: 5.52, speed: 42.8, avgSpeed: 41.0 },
    { split: '60m', time: 6.35, speed: 43.3, avgSpeed: 41.5 },
    { split: '70m', time: 7.18, speed: 43.3, avgSpeed: 41.2 },
    { split: '80m', time: 8.02, speed: 42.8, avgSpeed: 40.5 },
    { split: '90m', time: 8.88, speed: 41.8, avgSpeed: 39.0 },
    { split: '100m', time: 9.86, speed: 39.5, avgSpeed: 37.5 },
  ];

  const seasonProgression = [
    { meet: 'Doha', time: 10.12, pb: false },
    { meet: 'Rabat', time: 10.05, pb: false },
    { meet: 'Rome', time: 9.98, pb: true },
    { meet: 'Oslo', time: 9.95, pb: true },
    { meet: 'Paris', time: 9.92, pb: true },
    { meet: 'Monaco', time: 9.95, pb: false },
    { meet: 'London', time: 9.88, pb: true },
    { meet: 'Finals', time: 9.86, pb: true },
  ];

  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">PERFORMANCE METRICS</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">Deep dive into athlete kinematics.</p>
        </div>
        <div className="flex gap-4 bg-white border-4 border-track-dark p-2 shadow-[4px_4px_0px_#010F1A] items-center">
          <Filter className="w-5 h-5 text-track-dark stroke-[3] ml-1" />
          <select 
            value={selectedAthlete}
            onChange={e => setSelectedAthlete(e.target.value)}
            className="bg-transparent border-none font-black text-track-dark focus:outline-none uppercase text-sm cursor-pointer"
          >
            {displayAthletes.map((a, idx) => (
              <option key={idx} value={a.name}>{a.name}</option>
            ))}
            {displayAthletes.length === 0 && <option>MUBASSINA MOHAMMED</option>}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="brutal-card p-6 flex flex-col h-[500px]">
          <div className="flex justify-between items-end mb-8 border-b-4 border-track-dark pb-4">
            <h3 className="text-3xl editorial-heading-bebas text-track-dark">VELOCITY CURVE - {selectedAthlete}</h3>
            <span className="bg-track-lagoon text-track-dark font-black px-3 py-1 text-sm uppercase transform -skew-x-12 shadow-[2px_2px_0px_#010F1A]">KM/H vs DISTANCE</span>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#010F1A" opacity={0.1} vertical={false} />
                <XAxis dataKey="split" stroke="#010F1A" opacity={0.8} tick={{fill: '#010F1A', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#010F1A" opacity={0.8} tick={{fill: '#010F1A', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#FF7A45" opacity={0.8} tick={{fill: '#FF7A45', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#F8FAFC', borderColor: '#010F1A', borderWidth: '4px', borderRadius: '0px', color: '#010F1A', fontWeight: 'bold' }}
                  itemStyle={{ color: '#010F1A', fontWeight: 'black' }}
                />
                <Legend iconType="square" wrapperStyle={{ fontWeight: 'black', paddingTop: '20px' }} />
                <Line yAxisId="left" type="monotone" dataKey="speed" name="Speed (km/h)" stroke="#00C8C8" strokeWidth={5} dot={{ r: 4, fill: '#00C8C8' }} activeDot={{ r: 8 }} />
                <Line yAxisId="left" type="monotone" dataKey="avgSpeed" name="Avg Speed (km/h)" stroke="#010F1A" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="brutal-card p-6 flex flex-col h-[500px]">
          <div className="flex justify-between items-end mb-8 border-b-4 border-track-dark pb-4">
            <h3 className="text-3xl editorial-heading-bebas text-track-dark">SEASON PROGRESSION</h3>
            <span className="bg-track-coral text-white font-black px-3 py-1 text-sm uppercase transform -skew-x-12 shadow-[2px_2px_0px_#010F1A]">DIAMOND LEAGUE</span>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonProgression}>
                <CartesianGrid strokeDasharray="3 3" stroke="#010F1A" opacity={0.1} vertical={false} />
                <XAxis dataKey="meet" stroke="#010F1A" opacity={0.8} tick={{fill: '#010F1A', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis domain={[9.7, 10.3]} stroke="#010F1A" opacity={0.8} tick={{fill: '#010F1A', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(1,15,26,0.1)'}} 
                  contentStyle={{ backgroundColor: '#F8FAFC', borderColor: '#010F1A', borderWidth: '4px', borderRadius: '0px', color: '#010F1A', fontWeight: 'bold' }}
                  itemStyle={{ color: '#010F1A', fontWeight: 'black' }}
                />
                <Bar dataKey="time" name="Time (s)">
                  {
                    seasonProgression.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.pb ? '#FF7A45' : '#010F1A'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
