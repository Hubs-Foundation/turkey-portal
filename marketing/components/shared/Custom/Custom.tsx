import { TitleDescriptionT, FiftyfiftyT, HeroT, TileSpotlightT } from 'types';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty from '@Shared/FiftyFifty/FiftyFifty';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';
import EmailSignUp from '@Shared/EmailSignUp/EmailSignUp';
import Subscribe from '@Shared/Subscribe/Subscribe';
import Testimonial from '@Shared/Testimonial/Testimonial';
import ValueProps from '@Shared/ValueProps/ValueProps';
import TileSpotlight from '@Shared/TileSpotlight/TileSpotlight';

type CustomPropT = {
  data: HeroT | TitleDescriptionT | FiftyfiftyT | TileSpotlightT;
};

enum SectionsNamesE {
  HERO = 'Hero',
  FIFTYFIFTY = 'Fiftyfifty',
  TITLE_DESCRIPTION = 'TitleDescription',
  EMAIL_SIGNUP = 'EmailSignUp',
  SUBSCRIBE = 'Subscribe',
  VALUE_PROPS = 'ValueProps',
  TILE_SPOTLIGHT = 'TileSpotlight',
  TESTIMONIAL = 'Testimonial',
}

const Custom = ({ data }: CustomPropT) => {
  const heroData = data as HeroT;
  const FiftyfiftyData = data as FiftyfiftyT;
  const TitleDescriptionData = data as TitleDescriptionT;
  const TileSpotlightData = data as TileSpotlightT;

  const render = (type: SectionsNamesE): JSX.Element => {
    switch (type) {
      case SectionsNamesE.HERO:
        return <Hero {...heroData} />;
      case SectionsNamesE.FIFTYFIFTY:
        return <FiftyFifty {...FiftyfiftyData} />;
      case SectionsNamesE.TITLE_DESCRIPTION:
        return <TitleDescription {...TitleDescriptionData} />;
      case SectionsNamesE.EMAIL_SIGNUP:
        return (
          <div id="email-signup">
            <EmailSignUp />
          </div>
        );
      case SectionsNamesE.SUBSCRIBE:
        return (
          <div id="subscribe">
            <Subscribe />
          </div>
        );
      case SectionsNamesE.TILE_SPOTLIGHT:
        return <TileSpotlight {...TileSpotlightData} />;
      case SectionsNamesE.VALUE_PROPS:
        return <ValueProps />;
      case SectionsNamesE.TESTIMONIAL:
        return <Testimonial />;
      default:
        return <div className="error-message">Section does not exist</div>;
    }
  };

  return render(data.__typename as SectionsNamesE);
};

export default Custom;
