import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: '100m', time: 10.12 },
  { name: '200m', time: 20.45 },
  { name: '400m', time: 44.92 },
  { name: '800m', time: 104.2 },
  { name: '1500m', time: 215.4 }
];

export default function AnalyticsShowcase() {
  return (
    <section id="analytics" className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Precision Data <br/>
              <span className="text-track-lagoon">At Your Fingertips</span>
            </h2>
            <p className="text-xl text-track-foam/70 mb-8 leading-relaxed">
              Visualize performance trends across seasons. Our analytics engine automatically detects anomalies, highlights personal bests, and compares athletes against historical records.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time split analysis",
                "Historical performance comparisons",
                "Automated PB/SB detection",
                "Custom report generation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-track-foam/90">
                  <div className="w-2 h-2 rounded-full bg-track-coral"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 rounded-2xl border border-track-lagoon/30 shadow-2xl relative"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-track-coral/20 rounded-full blur-2xl"></div>
              <h3 className="text-xl font-heading font-bold mb-6 text-track-foam">Season Progression Overview</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#012B44" vertical={false} />
                    <XAxis dataKey="name" stroke="#F8FAFC" opacity={0.5} tick={{fill: '#F8FAFC', opacity: 0.7}} axisLine={false} tickLine={false} />
                    <YAxis stroke="#F8FAFC" opacity={0.5} tick={{fill: '#F8FAFC', opacity: 0.7}} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: '#023D61'}} 
                      contentStyle={{ backgroundColor: '#010F1A', borderColor: '#00C8C8', borderRadius: '8px' }}
                      itemStyle={{ color: '#00C8C8' }}
                    />
                    <Bar dataKey="time" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00C8C8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00C8C8" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
