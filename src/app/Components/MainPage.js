// Import Core
import React, { useState, useEffect } from 'react';

// Import Custom Components
import TopBar from './TopBar/TopBar';
import IntroSection from './Sections/IntroSection';
import AboutSection from './Sections/AboutSection';
import ExperienceSection from './Sections/ExperienceSection';
import SandboxSection from './Sections/SandboxSection';
import ContactSection from './Sections/ContactSection';

const spreadSpaceToComponents = windowWidth => {
  return { topBar: windowWidth };
};

const MainPage = () => {
  const [allocatedWidths, setAllocatedWidths] = useState(
    spreadSpaceToComponents(window.innerWidth)
  );

  const [scrollTo, setScrollTo] = useState({ id: '', bool: false });

  useEffect(() => {
    const updateWindowWidth = () =>
      setAllocatedWidths(spreadSpaceToComponents(window.innerWidth));
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  useEffect(() => {
    if (scrollTo.id.length !== 0) {
      window.scroll({
        top: document.getElementById(scrollTo.id).offsetTop
      });
    }
  }, [scrollTo.bool]);

  return (
    <div>
      <main>
        <IntroSection />
        <AboutSection />
        <ExperienceSection />
        <SandboxSection />
        <ContactSection />
      </main>
      <TopBar
        allocatedWidth={allocatedWidths.topBar}
        setScrollTo={id => setScrollTo({ id, bool: !scrollTo.bool })}
      />
    </div>
  );
};

export default MainPage;
