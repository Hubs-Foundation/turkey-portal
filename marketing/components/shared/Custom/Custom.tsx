import { TitleDescriptionT, FiftyfiftyT, HeroT } from 'types';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty from '@Shared/FiftyFifty/FiftyFifty';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';
import EmailSignUp from '@Shared/EmailSignUp/EmailSignUp';
import Subscribe from '@Shared/Subscribe/Subscribe';
type CustomPropT = {
  data: HeroT | TitleDescriptionT | FiftyfiftyT;
};

enum SectionsNames {
  HERO = 'Hero',
  FIFTYFIFTY = 'Fiftyfifty',
  TITLE_DESCRIPTION = 'TitleDescription',
  SECTION_EMAIL_SIGNUP = 'SectionEmailSignUp',
  SUBSCRIBE = 'Subscribe',
  VALUE_PROPS = 'valueProps',
}

const Custom = ({ data }: CustomPropT) => {
  const heroData = data as HeroT;
  const FiftyfiftyData = data as FiftyfiftyT;
  const TitleDescriptionData = data as TitleDescriptionT;

  const render = (type: SectionsNames): JSX.Element => {
    switch (type) {
      case SectionsNames.HERO:
        return <Hero {...heroData} />;
      case SectionsNames.FIFTYFIFTY:
        return <FiftyFifty {...FiftyfiftyData} />;
      case SectionsNames.TITLE_DESCRIPTION:
        return <TitleDescription {...TitleDescriptionData} />;
      case SectionsNames.SECTION_EMAIL_SIGNUP:
        return <EmailSignUp />;
      case SectionsNames.SUBSCRIBE:
        // TODO add CMS content
        return (
          <div id="subscribe">
            <Subscribe />
          </div>
        );
      default:
        return <div className="error-message">Section does not exist</div>;
    }
  };

  return render(data.__typename as SectionsNames);
};

export default Custom;
