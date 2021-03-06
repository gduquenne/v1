// Import Core
import React, { useState, useEffect } from 'react';

// Import Custom Components
import ScrollToButton from './ScrollToButton';
import LanguageSelect from './LanguageSelect';

// Import Texts
import texts from '../../Texts/textTopBar';

// Import Images
import Github from '../../../../public/svg/github.svg';
import LinkedIn from '../../../../public/svg/linkedin.svg';

// Import Styles
import { makeStyles } from '@mui/styles';
import styleTopBar from '../../StyleSheets/styleTopBar';

const useStyles = props => makeStyles(() => styleTopBar(props));

const TopBar = ({ allocatedWidth, setScrollTo }) => {
  const classes = useStyles({ allocatedWidth })();

  const [currentSectionOnView, setCurrentSectionOnView] = useState(
    getCurrentViewSection()
  );

  useEffect(() => {
    const handleScroll = () => setCurrentSectionOnView(getCurrentViewSection());
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="topBar" className={classes.topBar}>
      <div className={classes.nameContainer}>Grégoire Duquenne</div>
      {displayIcons(classes)}
      <div className={classes.buttonsContainer}>
        {displayScrollToButtons(classes, setScrollTo, currentSectionOnView)}
        <div className={classes.buttonContainer}>
          <LanguageSelect />
        </div>
      </div>
    </div>
  );
};

const displayIcons = classes => (
  <>
    <a
      href="https://github.com/gduquenne"
      target="_blank"
      style={{ marginLeft: 20 }}
    >
      <Github className={classes.icon} />
    </a>
    <a
      href="https://www.linkedin.com/in/gr%C3%A9goire-duquenne-295027163/"
      target="_blank"
      style={{ marginLeft: 20 }}
    >
      <LinkedIn className={classes.icon} />
    </a>
  </>
);

const displayScrollToButtons = (classes, setScrollTo, currentSectionOnView) => {
  return ['intro', 'about', 'experience', 'sandbox', 'contact'].map(section =>
    displayScrollToButton(classes, setScrollTo, currentSectionOnView, section)
  );
};

const displayScrollToButton = (
  classes,
  setScrollTo,
  currentSectionOnView,
  sectionName
) => (
  <div key={sectionName} className={classes.buttonContainer}>
    <ScrollToButton
      setScrollTo={setScrollTo}
      isCurrentSectionOnView={currentSectionOnView === sectionName}
      text={texts[`${sectionName}Btn`]}
    />
  </div>
);

const getCurrentViewSection = () => {
  const topBar = document.getElementById('topBar');
  if (topBar) {
    const sections = document.getElementsByTagName('section');
    const { scrollY } = window;
    for (let i = 0; i < sections.length - 1; i++) {
      if (scrollY < sections[i + 1].offsetTop) {
        return sections[i].id;
      }
    }
    return sections[sections.length - 1].id;
  } else {
    return 'intro';
  }
};

export default TopBar;
