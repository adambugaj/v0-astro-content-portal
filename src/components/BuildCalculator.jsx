import React, { useState, useMemo } from 'react';

const REGIONS = {
  Warszawa: 1.15,
  Kraków: 1.08,
  Poznań: 1.03,
  'Mniejsze miasta': 0.92
};

const TECH_BASE = {
  murowany: { min: 4500, max: 7000 },
  szkieletowy: { min: 3800, max: 5800 },
  modułowy: { min: 3200, max: 5200 }
};

const STAGES = [
  { key: 'raw', label: 'Roboty konstrukcyjne', pct: 0.35 },
  { key: 'dev', label: 'Roboty developerskie', pct: 0.45 },
  { key: 'finish', label: 'Wykończenie', pct: 0.20 }
];

export default function BuildCalculator() {
  const [area, setArea] = useState(120);
  const [region, setRegion] = useState('Warszawa');
  const [tech, setTech] = useState('murowany');
  const [garage, setGarage] = useState(true);
  const [basement, setBasement] = useState(false);
  const [oze, setOze] = useState(false);

  const multipliers = REGIONS;

  const result = useMemo(() => {
    const regionMult = multipliers[region] || 1;
    const base = TECH_BASE[tech] || TECH_BASE.murowany;

    const perM2Min = Math.round(base.min * regionMult);
    const perM2Max = Math.round(base.max * regionMult);

    const extra = (garage ? 45000 : 0) + (basement ? 90000 : 0) + (oze ? 25000 : 0);

    const totalMin = Math.round(perM2Min * area + extra);
    const totalMax = Math.round(perM2Max * area + extra);

    const stagesMin = STAGES.map((s) => ({ ...s, value: Math.round(totalMin * s.pct) }));
    const stagesMax = STAGES.map((s) => ({ ...s, value: Math.round(totalMax * s.pct) }));

    return { perM2Min, perM2Max, totalMin, totalMax, stagesMin, stagesMax };
  }, [area, region, tech, garage, basement, oze]);

  // Q1-Q3 2026 sample dataset (widełki za m²) per technology and region
  const QUARTER_DATA = {
    murowany: {
      Warszawa: [5200, 5400, 5600],
      Kraków: [4900, 5100, 5300],
      Poznań: [4700, 4900, 5050],
      'Mniejsze miasta': [4200, 4350, 4500]
    },
    szkieletowy: {
      Warszawa: [4400, 4550, 4700],
      Kraków: [4200, 4350, 4480],
      Poznań: [4000, 4150, 4300],
      'Mniejsze miasta': [3600, 3750, 3880]
    },
    modułowy: {
      Warszawa: [3800, 3950, 4100],
      Kraków: [3600, 3750, 3880],
      Poznań: [3450, 3580, 3700],
      'Mniejsze miasta': [3200, 3320, 3450]
    }
  };

  const quarterValues = QUARTER_DATA[tech]?.[region] || [0, 0, 0];

  function BarChart({ values, labels = ['Q1', 'Q2', 'Q3'] }) {
    const max = Math.max(...values, 1);
    const width = 360;
    const height = 120;
    const barWidth = Math.floor(width / values.length) - 16;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="160" className="mt-4">
        {values.map((v, i) => {
          const barH = Math.round((v / max) * (height - 30));
          const x = 16 + i * (barWidth + 16);
          const y = height - barH - 20;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={barH} rx="6" fill="#fb923c" opacity="0.95" />
              <text x={x + barWidth / 2} y={y - 6} fontSize="11" textAnchor="middle" fill="#374151">{v.toLocaleString()} zł</text>
              <text x={x + barWidth / 2} y={height - 6} fontSize="12" textAnchor="middle" fill="#6b7280">{labels[i]}</text>
            </g>
          );
        })}
        <text x="8" y="12" fontSize="12" fill="#6b7280">Średni koszt za m² — Q1–Q3 2026</text>
      </svg>
    );
  }

  return (
    <section className="py-12 bg-stone-50 rounded-2xl p-6 mb-12 border border-stone-200">
      <h2 className="text-2xl font-bold text-zinc-700 mb-6">Interaktywny Kalkulator Budowy (przykładowe widełki)</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <label className="block text-sm text-zinc-700">Region</label>
          <select className="w-full rounded-lg p-2 border" value={region} onChange={(e) => setRegion(e.target.value)}>
            {Object.keys(REGIONS).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <label className="block text-sm text-zinc-700">Technologia</label>
          <select className="w-full rounded-lg p-2 border" value={tech} onChange={(e) => setTech(e.target.value)}>
            <option value="murowany">Murowany</option>
            <option value="szkieletowy">Szkieletowy</option>
            <option value="modułowy">Modułowy</option>
          </select>

          <label className="block text-sm text-zinc-700">Powierzchnia (m²)</label>
          <input type="number" value={area} min={35} max={1000} onChange={(e) => setArea(Number(e.target.value) || 0)} className="w-full rounded-lg p-2 border" />

          <div className="space-y-2">
            <label className="flex items-center gap-3"><input type="checkbox" checked={garage} onChange={(e) => setGarage(e.target.checked)} /> Dodaj garaż (+45 000 zł)</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={basement} onChange={(e) => setBasement(e.target.checked)} /> Dodaj piwnicę (+90 000 zł)</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={oze} onChange={(e) => setOze(e.target.checked)} /> Instalacje OZE (+25 000 zł)</label>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl p-5 border">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-sm text-zinc-500">Koszt za m² (widełki)</p>
              <p className="text-2xl font-bold text-zinc-800">{result.perM2Min.toLocaleString()} zł — {result.perM2Max.toLocaleString()} zł</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-zinc-500">Szacunkowy koszt całkowity</p>
              <p className="text-3xl font-extrabold text-orange-600">{result.totalMin.toLocaleString()} zł — {result.totalMax.toLocaleString()} zł</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-zinc-600 mb-2">Orientacyjny rozkład kosztów (przykładowo)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-xs text-zinc-500">
                    <th className="pb-2">Etap</th>
                    <th className="pb-2">%</th>
                    <th className="pb-2">Min</th>
                    <th className="pb-2">Max</th>
                  </tr>
                </thead>
                <tbody>
                  {result.stagesMin.map((s, i) => (
                    <tr key={s.key} className="border-t">
                      <td className="py-2 text-zinc-700">{s.label}</td>
                      <td className="py-2 text-zinc-600">{Math.round(s.pct * 100)}%</td>
                <div className="mt-6">
                  <BarChart values={quarterValues} />
                  <p className="text-xs text-zinc-500 mt-2">Źródło: dane przykładowe — w produkcji podmienić na GUS / raporty branżowe (Q1–Q3 2026).</p>
                </div>
                      <td className="py-2 text-zinc-700">{s.value.toLocaleString()} zł</td>
                      <td className="py-2 text-zinc-700">{result.stagesMax[i].value.toLocaleString()} zł</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-zinc-600">Notatka:</p>
                <p className="text-sm text-zinc-700">Dane to przykładowe widełki. Dla treści premium rozważ dodanie wykresów z Q1–Q3 2026 oraz źródeł zewnętrznych (GUS, branżowe raporty).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
