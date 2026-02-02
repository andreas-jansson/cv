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
import { ReactComponent as GithubSvg } from './svg/Github.svg';
import { ReactComponent as LinkedInSvg } from './svg/LinkedIn.svg';
import AssignmentEricsson from './assignmentDesc/EricssonDesc'
import AssignmentSaab from './assignmentDesc/SaabDesc'


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

            <div className="headerTextWrapper">
                <h2>My <span>Professional</span> Experience</h2>
            </div>

            <div className="contentContainer">
            <AssignmentCard
                companyName="Ericsson"
                date="2024–2026"
                title="Embedded Software Engineer"
                roleDesc={AssignmentEricsson.desc}
                skills={AssignmentEricsson.skill}
                accent="#03bfb5"
            />
            <div  className="AssignmentCardSpacer"/>
            <AssignmentCard
                companyName="Saab"
                date="2022–2022"
                title="Embedded Software Engineer"
                roleDesc={AssignmentSaab.desc}
                skills={AssignmentSaab.skill}
                accent="#03bfb5"
            />
            <div  className="AssignmentCardSpacer"/>
            <AssignmentCard
                companyName="Ownit"
                date="2013–2019"
                title="Network Technician and Enterprise Support"
                roleDesc={["Yocto/Embedded Linux", "Driver bring-up", "CI builds"]}
                accent="#03bfb5"
            />

            <div className="headerTextWrapper">
                <h2>Personal <span>Pro</span>jects</h2>
            </div>

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
            <div className="footer">
                <div className="footerName">
                    <p>Created by Andréas Jansson</p>
                </div>
                <div className="footerLinks">
                    <div className="footerLinksWrapper">
'                       <span><GithubSvg/></span> Github
                        <span/>
                        <span><LinkedInSvg/></span> LinkedIn
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
