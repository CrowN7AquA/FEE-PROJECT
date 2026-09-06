import React, { useState } from 'react';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { label: 'GAME INFO', key: 'gameInfo' },
    { label: 'MEDIA', key: 'media' },
    { label: 'NEWS', key: 'news' },
    { label: 'SUPPORT', key: 'support' },
    { label: 'OUR SOCIALS', key: 'socials' },
    { label: 'ESPORTS 7', key: 'esports' },
    { label: 'MERCH 7', key: 'merch' },
    { label: 'MORE', key: 'more' },
  ];

  const dropdownContent = {
    gameInfo: ['Overview', 'Story', 'Characters', 'World Map', 'System Requirements'],
    media: ['Screenshots', 'Videos', 'Wallpapers', 'Soundtrack', 'Artworks'],
    news: ['Latest News', 'Patch Notes', 'Events', 'Developer Blogs', 'Community Updates'],
    support: ['FAQ', 'Tickets', 'Live Chat', 'Guides', 'Report Bug'],
    socials: ['Twitter', 'Facebook', 'Instagram', 'YouTube', 'Discord', 'TikTok'],
    esports: ['Tournaments', 'Leaderboards', 'Teams', 'Live Streams', 'VODs'],
    merch: ['Apparel', 'Collectibles', 'Posters', 'Digital Goods', 'Exclusive'],
    more: ['About Us', 'Careers', 'Press Kit', 'Partners', 'Legal', 'Privacy Policy'],
  };

  const handleMouseEnter = (key) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleClick = (label) => {
    alert(`Navigating to ${label} page...`);
    // Here you would implement actual navigation
  };

  return (
    <nav 
      style={{
        backgroundColor: '#1a1a2e',
        padding: '0 40px',
        borderBottom: '2px solid #e94560',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '60px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Logo / Brand (optional placeholder) */}
        <div
          style={{
            color: '#e94560',
            fontWeight: 'bold',
            fontSize: '20px',
            letterSpacing: '2px',
            marginRight: '20px',
          }}
        >
          NEWS
        </div>

        {/* Menu Items */}
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-around',
          }}
        >
          {menuItems.map((item) => (
            <div
              key={item.key}
              style={{
                position: 'relative',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={() => handleMouseEnter(item.key)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleClick(item.label)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  padding: '0 12px',
                  height: '100%',
                  letterSpacing: '1px',
                  transition: 'color 0.2s ease',
                  textTransform: 'uppercase',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e94560';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                {item.label}
                {/* Small arrow indicator for dropdown */}
                <span style={{ marginLeft: '4px', fontSize: '10px' }}>▼</span>
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === item.key && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#16213e',
                    minWidth: '200px',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    padding: '8px 0',
                    borderTop: '2px solid #e94560',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  {dropdownContent[item.key]?.map((subItem, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        alert(`Navigating to ${item.label} → ${subItem}...`);
                        setActiveDropdown(null);
                      }}
                      style={{
                        padding: '10px 20px',
                        color: '#ffffff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease, color 0.15s ease',
                        whiteSpace: 'nowrap',
                        borderBottom: index < dropdownContent[item.key].length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e94560';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                    >
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation for dropdown */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
          }
        `}
      </style>
    </nav>
  );
};

// Main App Component
const App = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f0f1a' }}>
      <Navbar />
      
      {/* Hero Section / News Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '0 20px',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
      }}>
        <h1 style={{ 
          fontSize: '42px', 
          color: '#e94560',
          borderBottom: '2px solid #e94560',
          paddingBottom: '15px',
          marginBottom: '30px',
        }}>
          Latest News
        </h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px' 
        }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={{
              backgroundColor: '#1a1a2e',
              padding: '20px',
              borderRadius: '8px',
              borderLeft: '4px solid #e94560',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(233, 69, 96, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '14px' }}>GAME NEWS</span>
                <span style={{ color: '#888', fontSize: '12px' }}>2 hours ago</span>
              </div>
              <h3 style={{ margin: '10px 0', fontSize: '18px' }}>Exciting Update {i}: New Features Announced</h3>
              <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <div style={{ marginTop: '15px', color: '#e94560', fontSize: '13px', fontWeight: 'bold' }}>
                Read More →
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / Credits */}
      <footer style={{
        marginTop: '60px',
        padding: '30px 20px',
        backgroundColor: '#1a1a2e',
        borderTop: '1px solid #2a2a4e',
        textAlign: 'center',
        color: '#666',
        fontSize: '13px',
        fontFamily: 'Arial, sans-serif',
      }}>
        <p>© 2026 News Site Prototype — Built with React</p>
        <p style={{ marginTop: '8px', color: '#444', fontSize: '11px' }}>
          Hover over any menu item to see dropdown | Click to simulate navigation
        </p>
      </footer>
    </div>
  );
};

export default App;
