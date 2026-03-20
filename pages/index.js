import Link from 'next/link';
export default function Home() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      <h1>Mission Control</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
        <div style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', background: '#252525' }}>
          <h2>Calendar</h2>
          <Link href="/calendar" style={{ color: '#4da6ff' }}>View →</Link>
        </div>
        <div style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', background: '#252525' }}>
          <h2>Memory</h2>
          <Link href="/memory" style={{ color: '#4da6ff' }}>View →</Link>
        </div>
        <div style={{ border: '1px solid #333', padding: '1.5rem', borderRadius: '8px', background: '#252525' }}>
          <h2>Notes</h2>
          <Link href="/notes" style={{ color: '#4da6ff' }}>View →</Link>
        </div>
      </div>
    </div>
  );
}
