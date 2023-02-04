import { TitleDescriptionT, FiftyfiftyT, HeroT } from 'types';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty from '@Shared/FiftyFifty/FiftyFifty';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';

type CustomPropT = {
  data: HeroT | TitleDescriptionT | FiftyfiftyT;
};

enum SectionsNames {
  HERO = 'Hero',
  FIFTYFIFTY = 'Fiftyfifty',
  TITLEDESCRIPTION = 'TitleDescription',
  // emailCapture
  // sectionEmailSignUp
  // subscribe
  // valueProps
}

const Custom = ({ data }: CustomPropT) => {
  const heroData = data as HeroT;
  const FiftyfiftyData = data as FiftyfiftyT;
  const TitleDescriptionData = data as TitleDescriptionT;

  const render = (type: SectionsNames) => {
    switch (type) {
      case SectionsNames.HERO:
        return <Hero {...heroData} />;
      case SectionsNames.FIFTYFIFTY:
        return <FiftyFifty {...FiftyfiftyData} />;
      case SectionsNames.TITLEDESCRIPTION:
        return <TitleDescription {...TitleDescriptionData} />;
    }
  };

  return render(data.__typename as SectionsNames);
};

export default Custom;
