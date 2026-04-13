import { motion } from 'framer-motion';

export default function RadarChart({ data }) {
  // SVG setup
  const size = 200;
  const center = size / 2;
  const radius = size / 2.5;
  const points = data.length;

  const getPosition = (index, value) => {
    const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  };

  // Generate web background rings
  const rings = [0.25, 0.5, 0.75, 1];
  
  // Data polygon points
  const polygonPoints = data.map((d, i) => getPosition(i, d.value));
  const polygonPath = polygonPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="drop-shadow-lg overflow-visible">
        {/* Background Rings */}
        {rings.map((ring, i) => {
          const ringPoints = data.map((_, idx) => getPosition(idx, ring * 100));
          const ringPath = ringPoints.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          return (
            <path
              key={`ring-${i}`}
              d={ringPath}
              className="fill-none stroke-brand-blue/10"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Axes */}
        {data.map((_, i) => {
          const endPoint = getPosition(i, 100);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              className="stroke-brand-blue/10"
              strokeWidth="0.5"
            />
          );
        })}

        {/* Data Polygon */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          d={polygonPath}
          className="fill-brand-blue/20 stroke-brand-blue drop-shadow-[0_0_8px_rgba(43,76,226,0.5)]"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Data Points */}
        {polygonPoints.map((p, i) => (
          <motion.circle
            key={`point-${i}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, type: "spring" }}
            cx={p.x}
            cy={p.y}
            r="4"
            className="fill-white stroke-brand-blue"
            strokeWidth="1.5"
          />
        ))}

        {/* Labels */}
        {data.map((d, i) => {
          const pos = getPosition(i, 130); // push label outward
          return (
            <text
              key={`label-${i}`}
              x={pos.x}
              y={pos.y}
              className="text-[6px] font-bold fill-gray-500 uppercase tracking-wider select-none text-anchor-middle alignment-baseline-middle"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
