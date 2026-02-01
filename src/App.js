import './App.css';
import Particles from './Particles';

function App() {
  return (
    <div className="hero">
        <Particles
            particleColors={["#ffffff"]}
            particleCount={400}
            particleSpread={30}
            speed={0.1}
            particleBaseSize={80}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={true}
            pixelRatio={1}
        />
        <div className="heroText">
            <h1>sdfsdfdsfs</h1>
        </div>
    </div>
  );
}

export default App;
