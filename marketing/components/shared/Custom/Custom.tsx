import { TitleDescriptionT, FiftyfiftyT, HeroT } from 'types';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty from '@Shared/FiftyFifty/FiftyFifty';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';
import { useMobileDown } from 'hooks/useMediaQuery';

type CustomPropT = {
  data: HeroT | TitleDescriptionT | FiftyfiftyT;
};

const Custom = ({ data }: CustomPropT) => {
  const isMobile = useMobileDown();

  const heroData = data as HeroT;
  const FiftyfiftyData = data as FiftyfiftyT;
  const TitleDescriptionData = data as TitleDescriptionT;
  // const getSectionComponent = (data: TitleDescriptionT | FiftyfiftyT | HeroT) => {
  //   switch (data.__typename) {
  //     case 'Hero' :
  //       return (
  //
  //       )
  //       break;
  //     default:
  //       return (
  //         <div>Sectoin does not exist</div>
  //       )
  //   }
  // }

  return (
    <>
      {data.__typename === 'Hero' && (
        <Hero
          {...heroData}
          background={
            isMobile
              ? heroData.mobileImage.description
              : heroData.desktopImage.url
          }
        />
      )}

      {data.__typename === 'Fiftyfifty' && (
        <FiftyFifty
          {...FiftyfiftyData}
          image={FiftyfiftyData.image?.url}
          imageMobile={FiftyfiftyData.imageMobile?.url}
          accentImage={FiftyfiftyData.accentImage?.url}
        />
      )}

      {data.__typename === 'TitleDescription' && (
        <TitleDescription {...TitleDescriptionData} />
      )}
    </>
  );
};

export default Custom;
