import './App.css';
import Particles from './Particles';
import stmIcon from './stmIcon';
import RotatingText from './RotatingText'
import TechStack from './TechStack'
import SplashCursor from './SplashCursor'
import LogoLoop from './LogoLoop'
import Saab from './Saab'
import Ericsson from './Ericsson'
import Ownit from './Ownit'
import Nexer from './Nexer'
import Afry from './Afry'


const techLogos = [
    { node: <Saab />, title: "Saab"},
    { node: <Ericsson />, title: "Ericsson"},
    { node: <Nexer />, title: "Nexer"},
    { node: <Ownit />, title: "Ownit"},
    { node: <Afry />, title: "Afry"},
];

function App() {
    return (
        <div className="mainWrapper">
            <SplashCursor />
            <Particles
                particleColors={["#d9d6ee"]}
                particleCount={600}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={60}
                moveParticlesOnHover
                alphaParticles={false}
                disableRotation={true}
                pixelRatio={1}
            />
            <div className="contentContainer">
        <div className="hero">
            <div className="heroTextWrapper">
                <div className="heroTextWrapper2">
                    <h1>ANDRÉAS JANSSON</h1>
                    <div className="scrollTextBoxWrapper">
                        <div className="scrollTextBox">
                            <RotatingText
                                texts={['Software Engineer', 'Embedded', 'IoT']}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.07} splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={4000}
                            />
                    </div>
                </div>
                </div>
                <TechStack/>
            </div>
        </div>
            </div>

            <LogoLoop
                logos={techLogos}
                speed={40}
                direction="left"
                logoHeight={50}
                gap={150}
                hoverSpeed={50}
                scaleOnHover={false}
                fadeOut
                fadeOutColor="#151515"
                ariaLabel="Technology partners"
            />


            <div className="contentContainer">

                <div className="assignmentWrapper">
                    <p>Hello</p>
                </div>
            </div>
        </div>
    );
}

export default App;
