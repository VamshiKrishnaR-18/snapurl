import { useState, useEffect, useCallback } from 'react'; // 1. Import useCallback
import { QRCodeCanvas } from 'qrcode.react';

export default function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [urls, setUrls] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // 2. Wrap fetchUrls in useCallback
  const fetchUrls = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/urls`);
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Failed to fetch URLs", error);
    }
  }, [apiUrl]); 

  // 3. Add fetchUrls safely to the effect dependency array
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUrls();
  }, [fetchUrls]);


  const handleShorten = async (e) => {
    e.preventDefault();
    setErrorMsg(''); 

    try {
      const response = await fetch(`${apiUrl}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl, customAlias })
      });
      
      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error); // Show the backend error message
        return;
      }

      setShortUrl(`${apiUrl}/${data.shortId}`);
      setOriginalUrl(''); 
      setCustomAlias(''); 
      fetchUrls(); 
    } catch (error) {
      console.error("Failed to shorten URL", error);
    }
  };

  // Helper to remove http:// for cleaner display text
  const displayUrl = apiUrl.replace(/^https?:\/\//, '');

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', fontFamily: 'sans-serif', color: '#fff' }}>
      <h1 style={{ textAlign: 'center' }}>🔗 SnapURL Dashboard</h1>
      
      {/* The Input Form */}
      <form onSubmit={handleShorten} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input 
          type="url" 
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Paste your massive link here..." 
          required 
          style={{ flex: 2, padding: '15px', fontSize: '16px', borderRadius: '5px', border: 'none', background: '#333', color: '#fff' }}
        />
        <input 
          type="text" 
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          placeholder="Custom Alias (optional)" 
          style={{ flex: 1, padding: '15px', fontSize: '16px', borderRadius: '5px', border: 'none', background: '#333', color: '#fff' }}
        />
        <button type="submit" style={{ padding: '15px 30px', fontSize: '16px', cursor: 'pointer', borderRadius: '5px', border: 'none', background: '#5a5a5a', color: '#fff' }}>
          Shorten
        </button>
      </form>

      {/* Error Message Display */}
      {errorMsg && <p style={{ color: '#ff4d4d', marginTop: '0', marginBottom: '20px' }}>{errorMsg}</p>}

      {/* The Result & QR Code */}
      {shortUrl && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '20px', background: '#222', borderRadius: '8px', marginBottom: '40px' }}>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '5px' }}>
            <QRCodeCanvas value={shortUrl} size={100} />
          </div>
          <div>
            <p style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#aaa' }}>Your Snap is ready!</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.5rem', color: '#4da6ff', textDecoration: 'none' }}>
              {shortUrl}
            </a>
          </div>
        </div>
      )}

      {/* The Analytics Dashboard */}
      <h2 style={{ borderBottom: '1px solid #444', paddingBottom: '10px' }}>Your Links</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {urls.map((url) => (
          <div key={url._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '15px', borderRadius: '8px' }}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
              <a href={`${apiUrl}/${url.shortId}`} target="_blank" rel="noopener noreferrer" style={{ color: '#4da6ff', textDecoration: 'none', fontSize: '1.1rem', display: 'block', marginBottom: '5px' }}>
                {displayUrl}/{url.shortId}
              </a>
              <span style={{ color: '#777', fontSize: '0.9rem' }}>{url.originalUrl}</span>
            </div>
            <div style={{ background: '#333', padding: '10px 15px', borderRadius: '5px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{url.clicks}</div>
              <div style={{ fontSize: '0.8rem', color: '#aaa', textTransform: 'uppercase' }}>Clicks</div>
            </div>
          </div>
        ))}
        {urls.length === 0 && <p style={{ color: '#777', textAlign: 'center' }}>No links created yet.</p>}
      </div>
    </div>
  );
}