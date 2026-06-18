import { Search, Plus, Filter, MapPin, Award, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Athlete {
  id: number;
  athlete_id: string;
  name: string;
  event: string;
  island: string;
  pb: string;
  status: string;
}

export default function Athletes() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newAthlete, setNewAthlete] = useState({
    athlete_id: '',
    name: '',
    event: '',
    island: '',
    pb: '',
    status: 'ACTIVE'
  });

  const fetchAthletes = () => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/athletes/`)
      .then(res => res.json())
      .then(data => {
        setAthletes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch athletes:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAthletes();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/athletes/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAthlete)
      });
      if (response.ok) {
        setIsModalOpen(false);
        setNewAthlete({ athlete_id: '', name: '', event: '', island: '', pb: '', status: 'ACTIVE' });
        fetchAthletes(); // Refresh list
      } else {
        alert("Failed to register athlete. Make sure Athlete ID is unique.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this athlete?")) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8001/api'}/athletes/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchAthletes();
        } else {
          alert("Failed to delete athlete.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isDemo = sessionStorage.getItem('demoMode') === 'true';

  const mockAthletes = [
    { id: 1, athlete_id: "ATH-1001", name: "MARCUS JOHNSON", event: "100M SPRINT", island: "ANDROTH", pb: "9.86s", status: "ACTIVE" },
    { id: 2, athlete_id: "ATH-1002", name: "ANDRE DE GRASSE", event: "200M SPRINT", island: "MINICOY", pb: "9.89s", status: "ACTIVE" },
    { id: 3, athlete_id: "ATH-1003", name: "CHRISTIAN COLEMAN", event: "100M SPRINT", island: "KAVARATTI", pb: "9.92s", status: "INJURED" },
    { id: 4, athlete_id: "ATH-1004", name: "FERDINAND OMANYALA", event: "100M SPRINT", island: "AGATTI", pb: "9.95s", status: "ACTIVE" },
    { id: 5, athlete_id: "ATH-1005", name: "AKANI SIMBINE", event: "100M SPRINT", island: "KAVARATTI", pb: "9.98s", status: "RESTING" },
    { id: 6, athlete_id: "ATH-1006", name: "SARAH CHEN", event: "LONG JUMP", island: "AMINI", pb: "7.15m", status: "ACTIVE" },
  ];

  const displayAthletes = isDemo ? mockAthletes : athletes;

  const filteredAthletes = displayAthletes.filter(athlete => {
    const q = searchQuery.toLowerCase();
    return (
      athlete.name.toLowerCase().includes(q) ||
      athlete.athlete_id.toLowerCase().includes(q) ||
      athlete.event.toLowerCase().includes(q) ||
      athlete.island.toLowerCase().includes(q)
    );
  });
  return (
    <div className="pb-10 pt-4 px-2 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl editorial-heading-bebas text-track-dark leading-none">ATHLETE ROSTER</h1>
          <p className="text-xl font-black text-track-dark/60 uppercase tracking-widest border-l-4 border-track-coral pl-3 mt-2">
            Manage competitors, performance records, and statuses.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-track-coral text-white font-black text-lg uppercase px-6 py-3 border-4 border-track-dark shadow-[4px_4px_0px_#010F1A] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5 stroke-[3]" />
          REGISTER ATHLETE
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center bg-white border-4 border-track-dark p-2 shadow-[4px_4px_0px_#010F1A]">
          <Search className="w-6 h-6 text-track-dark/40 ml-2" />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME, ID, OR EVENT..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none focus:outline-none px-4 font-black text-track-dark uppercase tracking-wider placeholder:text-track-dark/30"
          />
        </div>
        <button onClick={() => alert("Filters functionality is under development.")} className="bg-track-dark text-white font-black uppercase px-6 py-3 border-4 border-track-dark flex items-center gap-2 hover:bg-track-foam hover:text-track-dark transition-colors">
          <Filter className="w-5 h-5" />
          FILTERS
        </button>
      </div>

      {/* Data Table */}
      <div className="brutal-card p-0 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-track-foam border-b-4 border-track-dark">
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark w-24">ID</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark">ATHLETE NAME</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark">PRIMARY EVENT</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark">ISLAND</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark w-32">PERSONAL BEST</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm border-r-4 border-track-dark w-32">STATUS</th>
                <th className="p-4 font-black text-track-dark uppercase tracking-widest text-sm w-16 text-center">ACT</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-black text-track-dark/40 uppercase tracking-widest">
                    LOADING ATHLETES...
                  </td>
                </tr>
              ) : filteredAthletes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-black text-track-dark/40 uppercase tracking-widest">
                    NO ATHLETES FOUND.
                  </td>
                </tr>
              ) : filteredAthletes.map((athlete, i) => (
                <tr key={i} className="border-b-4 border-track-dark hover:bg-track-foam/50 transition-colors group">
                  <td className="p-4 border-r-4 border-track-dark font-bold text-track-dark/60">{athlete.athlete_id}</td>
                  <td className="p-4 border-r-4 border-track-dark font-black text-lg text-track-dark">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-track-dark text-white flex items-center justify-center font-editorial-bebas text-xl pt-1 transform -skew-x-6">
                        {athlete.name.charAt(0)}
                      </div>
                      {athlete.name}
                    </div>
                  </td>
                  <td className="p-4 border-r-4 border-track-dark">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-track-coral/10 text-track-coral font-black text-xs uppercase tracking-widest border-2 border-track-coral/20">
                      <Award className="w-3 h-3" />
                      {athlete.event}
                    </span>
                  </td>
                  <td className="p-4 border-r-4 border-track-dark">
                    <div className="flex items-center gap-1.5 font-bold text-track-dark/80 text-sm uppercase">
                      <MapPin className="w-4 h-4 text-track-lagoon" />
                      {athlete.island}
                    </div>
                  </td>
                  <td className="p-4 border-r-4 border-track-dark font-black text-xl text-track-dark editorial-heading-bebas">
                    {athlete.pb}
                  </td>
                  <td className="p-4 border-r-4 border-track-dark">
                    <span className={`px-2 py-1 font-black text-xs uppercase tracking-widest border-2 ${
                      athlete.status === 'ACTIVE' 
                        ? 'bg-track-lagoon/20 text-track-dark border-track-lagoon' 
                        : athlete.status === 'INJURED'
                        ? 'bg-track-coral/20 text-track-coral border-track-coral'
                        : 'bg-track-dark/10 text-track-dark/60 border-track-dark/20'
                    }`}>
                      {athlete.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleDelete(athlete.id)} 
                      className="p-2 text-track-dark/40 hover:text-track-coral transition-colors hover:bg-track-foam border border-transparent hover:border-track-dark rounded"
                      title="Delete Athlete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-track-dark/80 backdrop-blur-sm">
          <div className="bg-white border-8 border-track-dark shadow-[12px_12px_0px_#FF7A45] w-full max-w-2xl">
            <div className="p-6 border-b-8 border-track-dark bg-track-foam flex justify-between items-center">
              <h2 className="text-4xl editorial-heading-bebas text-track-dark">REGISTER NEW ATHLETE</h2>
              <button onClick={() => setIsModalOpen(false)} className="font-black text-track-dark text-xl hover:text-track-coral">X</button>
            </div>
            <form onSubmit={handleRegister} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Athlete ID</label>
                  <input required value={newAthlete.athlete_id} onChange={e => setNewAthlete({...newAthlete, athlete_id: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase" placeholder="e.g. ATH-1010" />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Full Name</label>
                  <input required value={newAthlete.name} onChange={e => setNewAthlete({...newAthlete, name: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase" placeholder="JOHN DOE" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Primary Event</label>
                  <input required value={newAthlete.event} onChange={e => setNewAthlete({...newAthlete, event: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase" placeholder="100M SPRINT" />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Island / Region</label>
                  <input required value={newAthlete.island} onChange={e => setNewAthlete({...newAthlete, island: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase" placeholder="KAVARATTI" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Personal Best</label>
                  <input required value={newAthlete.pb} onChange={e => setNewAthlete({...newAthlete, pb: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase" placeholder="10.5s" />
                </div>
                <div>
                  <label className="block text-sm font-black uppercase tracking-widest text-track-dark mb-2">Status</label>
                  <select value={newAthlete.status} onChange={e => setNewAthlete({...newAthlete, status: e.target.value})} className="w-full bg-track-foam border-4 border-track-dark p-3 font-bold uppercase appearance-none">
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INJURED">INJURED</option>
                    <option value="RESTING">RESTING</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 mt-6 border-t-4 border-track-dark">
                <button type="submit" className="bg-track-lagoon text-track-dark font-black text-lg uppercase px-8 py-3 border-4 border-track-dark shadow-[4px_4px_0px_#010F1A] hover:translate-y-1 hover:translate-x-1 hover:shadow-none transition-all">
                  SUBMIT REGISTRATION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
