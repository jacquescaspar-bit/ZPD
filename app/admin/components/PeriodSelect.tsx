interface PeriodSelectProps {
  value: "7d" | "30d" | "90d";
  onChange: (value: "7d" | "30d" | "90d") => void;
}

const PeriodSelect = ({ value, onChange }: PeriodSelectProps) => (
  <select
    className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
    value={value}
    onChange={(e) => onChange(e.target.value as "7d" | "30d" | "90d")}
  >
    <option value="7d">Last 7 days</option>
    <option value="30d">Last 30 days</option>
    <option value="90d">Last 90 days</option>
  </select>
);

export default PeriodSelect;
