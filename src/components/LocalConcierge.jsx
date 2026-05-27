// src/components/LocalConcierge.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, MapPin, Sparkles, Compass } from 'lucide-react';

export default function LocalConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I am Vela, your local architectural guide. Ask me anything about our unique stays, local activities, or check-in policies!" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const presetQuestions = [
    { text: "Chamonix local guides?", label: "🏔️ Chamonix Activities" },
    { text: "How to get to Santorini Villa?", label: "🇬🇷 Santorini Travel" },
    { text: "What is your cancellation policy?", label: "🛡️ Cancellation Info" },
    { text: "Eco-friendly Bali stays?", label: "🎋 Bali Eco Info" }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setInputText('');
    setIsTyping(true);

    // Simulated Bot response after 1.2s
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();

      if (lower.includes('chamonix') || lower.includes('cabin') || lower.includes('france')) {
        reply = "Chamonix is spectacular! I highly recommend taking the Aiguille du Midi cable car for views of Mont Blanc. For dining, ask Jean-Pierre to recommend a local raclette spot. And don't forget to warm up in the cabin's outdoor wood-fired tub after skiing!";
      } else if (lower.includes('santorini') || lower.includes('villa') || lower.includes('greece')) {
        reply = "Ah, the Aegean Horizon! The sunset from the caldera is iconic. I suggest booking Calliope's recommended private yacht tour to the volcanic hot springs. For dinner, try Ammoudi Bay for fresh grilled octopus at water level.";
      } else if (lower.includes('bali') || lower.includes('dome') || lower.includes('ubud')) {
        reply = "The Bamboo Dome in Ubud is surrounded by misty ravines. You should visit the Tegallalang Rice Terraces early in the morning to beat the heat, and try the local organic morning smoothie bowls Wayan prepares.";
      } else if (lower.includes('cancellation') || lower.includes('policy') || lower.includes('refund')) {
        reply = "VelaStays values flexibility. All of our boutique properties offer free cancellation up to 48 hours before check-in. Inside your profile tab, you can cancel any reservation with a single click.";
      } else if (lower.includes('brooklyn') || lower.includes('loft')) {
        reply = "Brooklyn lofts are in the heart of urban history. Walk down to DUMBO for views of the Manhattan Bridge, browse books at Powerhouse Arena, and grab pizza at Juliana's. Check the vinyl player in the loft for classic jazz records!";
      } else {
        reply = "I'd love to help you find the perfect stay. VelaStays specializes in unique cabins, cliffside villas, industrial lofts, and organic bamboo structures. Let me know if you need destination-specific highlights!";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000
    }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          id="concierge-toggle-btn"
          onClick={() => setIsOpen(true)}
          className="anim-pulse-slow"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(224, 122, 95, 0.4)'
          }}
          title="Open Vela Concierge"
        >
          <MessageSquare size={26} />
        </button>
      )}

      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="glass-panel anim-scale-in" style={{
          width: '360px',
          height: '500px',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--hover-shadow)'
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--accent-gradient)',
            padding: '1.2rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Sparkles size={18} />
              <div>
                <h4 style={{ fontSize: '1rem', margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Vela Local Guide</h4>
                <span style={{ fontSize: '0.72rem', opacity: 0.85 }}>AI travel advisor</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(0,0,0,0.15)',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'var(--bg-primary)'
          }} className="custom-scrollbar">
            {messages.map((m, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  background: m.sender === 'user' ? 'var(--accent)' : 'var(--bg-secondary)',
                  color: m.sender === 'user' ? '#fff' : 'var(--text-primary)',
                  padding: '0.75rem 1rem',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  fontSize: '0.88rem',
                  lineHeight: 1.4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)'
                }}
              >
                {m.text}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: 'var(--bg-secondary)',
                padding: '0.6rem 1rem',
                borderRadius: '16px 16px 16px 2px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span className="dot-typing"></span>
                <span>Vela is searching recommendations...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{
            padding: '0.5rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-color)'
          }}>
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q.text)}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Form input */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '0.8rem 1rem',
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input 
              id="concierge-chat-input"
              type="text" 
              placeholder="Ask about local recommendations..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="input-field"
              style={{
                borderRadius: '20px',
                height: '36px',
                padding: '0 1rem',
                fontSize: '0.82rem',
                background: 'var(--bg-tertiary)'
              }}
            />
            <button 
              id="concierge-send-btn"
              type="submit"
              className="btn-icon"
              style={{
                width: '36px',
                height: '36px',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                flexShrink: 0
              }}
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Typing indicator dot styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .dot-typing {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-tertiary);
          animation: dotElastic 1s infinite linear;
        }
        @keyframes dotElastic {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); opacity: 0.5; }
        }
      `}} />
    </div>
  );
}
