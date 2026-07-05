import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import port1 from '../assets/portimg/port1.png';
import port2 from '../assets/portimg/port2.png';
import port3 from '../assets/portimg/port3.png';
import port4 from '../assets/portimg/port4.png';

import clo1 from '../assets/shop/clo1.png';
import clo2 from '../assets/shop/clo2.png';
import clo3 from '../assets/shop/clo3.png';
import clo4 from '../assets/shop/clo4.png';
import randing from '../assets/shop/randing.png';
import randing2 from '../assets/shop/randing2.png';
import poke1 from '../assets/shop/poke1.png';
import poke2 from '../assets/shop/poke2.png';
import poke3 from '../assets/shop/poke3.png';
import poke4 from '../assets/shop/poke4.png';
import ERD1 from '../assets/shop/ERD1.png';
import ERD2 from '../assets/shop/ERD2.png';
import ERD3 from '../assets/shop/ERD3.png';

export default function Projects() {
  const { user } = useAuth();
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  if (!user) {
    return (
      <div style={{ padding: '60px', textAlign: 'center' }}>
        <h2>You must be signed in to view your projects</h2>
        <p>Please sign in or create an account to see your portfolio projects.</p>
      </div>
    );
  }

  const items = [
    {
      img: port3,
      title: 'Landing Page',
      desc: (
        <>
          <p> landing page design <br />
          <a
            href="https://hyojin-keny.github.io/Landing-page/"
            target="_blank"
          >
            https://hyojin-keny.github.io/Landing-page/
          </a> </p>
        </>
      ),
      images: [randing, randing2],
    },
    {
      img: port2,
      title: 'E-commerce UI',
      desc: (
        <>
          <p> Blossom Clothing <br />
          <a
            href="https://shop-project-lyart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://shop-project-lyart.vercel.app
          </a> </p>
        </>
      ),
      images: [clo1, clo2, clo3, clo4],
    },
    {
      img: port1,
      title: 'UI Interaction Frontend Project',
      desc: (
        <>
          <p> Pokémon Search & Favorite App <br />
          <a
            href="https://hyojin-keny.github.io/Find-Poketmon/"
            target="_blank"
          >
            https://hyojin-keny.github.io/Find-Poketmon
          </a> </p>
        </>
      ),
      images: [poke1,poke2,poke3,poke4],
    },
    {
      img: port4,
      title: 'PL/SQL Programming',
      desc: (
        <>
          <p>E-commerce system <br />
          <a
            href="/COMP214 – Advanced Database Concepts.pdf"
            download
          >
            📄 Database system Report
          </a> </p>
        </>
      ),
      images: [ERD1,ERD2,ERD3],
    },
  ];

  const baseStyle = (i, url) => ({
    position: 'relative',
    width: '50%',
    height: '350px',
    float: 'left',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    transform: hovered === i ? 'scale(1.03)' : 'scale(1)',
    transition: '0.3s ease',
  });

  const overlay = (i) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: hovered === i ? '30px solid white' : '0px solid white',
    transition: '0.3s ease',
    top: 0,
    left: 0,
  });

  const textStyle = {
    position: 'absolute',
    color: 'white',
    marginTop: '80px',
    marginLeft: '50px',
    textAlign: 'left',
  };

  const modalBg = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  };

  const modalBox = {
    width: '500px',
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
  };

  return (
    <>
      {/* MAIN */}
      <div
        style={{
          height: '300px',
          background: 'linear-gradient(to bottom,#747070,#4c4848)',
          color: '#fff',
          padding: '20px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: 'auto' }}>
          <h1 style={{ marginTop: '100px' }}>My Project</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>

      {/* PORTFOLIO */}
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <h2>Portfolio</h2>

        <div style={{ maxWidth: '1200px', margin: 'auto', overflow: 'hidden' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={baseStyle(i, item.img)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                setSelected(item);
                setImgIndex(0);
              }}
            >
              <div style={overlay(i)} />
              <div style={textStyle}>
                <h4>{item.title}</h4>
                <p>Click to view project details</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div style={modalBg} onClick={() => setSelected(null)}>
          <div
            style={{ ...modalBox, position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X BUTTON */}
            <button
              onClick={() => setSelected(null)}
               style={{
                position: 'absolute',
                top: '8px',
                right: '10px',
                border: 'none',
                background: 'transparent',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              ×
            </button>

            <h2>{selected.title}</h2>

            <img
              src={selected.images[imgIndex]}
              alt=""
              style={{ width: '100%', marginTop: '10px' }}
            />

            <p style={{ marginTop: '10px' }}>{selected.desc}</p>

            {/* ARROWS */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px',
                alignItems: 'center',
              }}
            >
              <button
                onClick={() =>
                  setImgIndex((prev) =>
                    prev === 0 ? selected.images.length - 1 : prev - 1
                  )
                }
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6e6d6d'
                }}
              >
                ◀
              </button>

              <button
                onClick={() =>
                  setImgIndex((prev) =>
                    prev === selected.images.length - 1 ? 0 : prev + 1
                  )
                }
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6e6d6d'
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ textAlign: 'center', fontSize: '20px', padding: '20px' }}>
        © Lorem ipsum
      </div>
    </>
  );
}