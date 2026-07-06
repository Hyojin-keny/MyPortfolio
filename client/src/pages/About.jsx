import faceImage from '../assets/Me.png';

export default function About() {
  return (
    <div
      style={{
        padding: '60px 20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FAF8E6'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h1>About Me</h1>
        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#FFC107',
            margin: '0 auto 60px',
            borderRadius: '2px'
          }}
        ></div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '100px'
          }}
        >
          <img
            src={faceImage}
            alt="My portrait"
            width="300"
            style={{
              borderRadius: '50%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          />

          <div style={{ textAlign: 'left', maxWidth: '400px' }}>
            <p
              style={{
                fontSize: '1.7rem',
                marginBottom: '10px',
                fontWeight: 'bold'
              }}
            >
              Hyojin Kim
            </p>
            <p>Software Engineering Student</p>
            <div
              style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#000',
                margin: '10px 0'
              }}
            />
            <p>
              제 포트폴리오 웹사이트에 오신 걸 환영합니다!<br />
               작은 클릭 한 번으로 제 작업 세계를 만나보세요.
            </p>
            <div
              style={{
                width: '100%',
                height: '0.5px',
                backgroundColor: '#000',
                margin: '10px 0'
              }}
            />
             "Forgive Myself<br />
              the cure for a broken heart"<br />
            <br />
            <h3>Explore Me</h3>
            <a href="/resume.pdf" download>⬇️ Download My Resume</a><br />
            <a
                href="https://github.com/Hyojin-keny/MyPortfolio"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 GitHub
              </a>
          </div>
        </div>
      </div>
    </div>
  );
}
