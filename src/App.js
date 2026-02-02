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
import AssignmentCard from './AssignmentCard'
import './AssignmentCard.css'
import TrackElementWithinViewport from './TrackItem'
import MagicBento from './MagicBento'


const techLogos = [
    { node: <Saab />, title: "Saab"},
    { node: <Ericsson />, title: "Ericsson"},
    { node: <Nexer />, title: "Nexer"},
    { node: <Ownit />, title: "Ownit"},
    { node: <Afry />, title: "Afry"},
];


const assignmentEricsson = " \n" +
    "Arbetade med utveckling och förbättring av Hardware testmanager, ett internt testverktyg för basstationsradio. Testmanager används för att verifiera högprestanda-gränssnitt som PCIe och CIPRI, samt interna och externa sensorer och övriga hårdvarugränssnitt. Systemet är utvecklat i C och C++ och körs på en Yocto-baserad Linuxmiljö, vilket kräver anpassning och konfiguration för målplattformen. Bidrog bland annat med att utveckla mjukvara för att identifiera och verifiera hårdvarufel i SoC:er, vilket förbättrade felanalys och förkortade felsökningstiden i produktions- och utvecklingsmiljö. Arbetet innefattade både lågnivå-programmering, felsökning nära hårdvara samt konfiguration av byggmiljö och Yocto-image.";

function App() {
    return (
        <div className="mainWrapper">
            <SplashCursor />
            <Particles
                particleColors={["#ffffff"]}
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
                    <div className="heroTextWrapper3">
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
            </div>

            <LogoLoop
                logos={techLogos}
                speed={40}
                direction="left"
                logoHeight={80}
                gap={100}
                hoverSpeed={50}
                scaleOnHover={false}
                fadeOut
                fadeOutColor="#151515"
                ariaLabel="Technology partners"
            />

            <div className="contentContainer">
            <AssignmentCard
                companyName="AFRY"
                date="2024–2026"
                title="Embedded / Software Engineer"
                items={[assignmentEricsson, "PCIE"]}
                logo={<Afry />}
                accent="#03bfb5"
            />
            <div  className="AssignmentCardSpacer"/>
            <AssignmentCard
                companyName="Saab"
                date="2022–2022"
                title="Embedded / Software Engineer"
                items={["Yocto/Embedded Linux", "Driver bring-up", "CI builds"]}
                logo={<Saab />}
                accent="#03bfb5"
            />
            <div  className="AssignmentCardSpacer"/>
            <AssignmentCard
                companyName="Ownit"
                date="2024–2026"
                title="Network Technician and Enterprise Support"
                items={["Yocto/Embedded Linux", "Driver bring-up", "CI builds"]}
                logo={<Ownit />}
                accent="#03bfb5"
            />

                <MagicBento
                    textAutoHide={true}
                    enableStars
                    enableSpotlight
                    enableBorderGlow={true}
                    enableTilt={false}
                    enableMagnetism={false}
                    clickEffect
                    spotlightRadius={400}
                    particleCount={12}
                    glowColor="#03bfb5"
                    disableAnimations={false}
                />

            </div>
        </div>
    );
}

export default App;
