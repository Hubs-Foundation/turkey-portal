import { useMemo } from 'react';
import { TitleDescriptionT, FiftyfiftyT, HeroT } from 'types';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty from '@Shared/FiftyFifty/FiftyFifty';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';
import EmailSignUp from '@Shared/EmailSignUp/EmailSignUp';
import Subscribe from '@Shared/Subscribe/Subscribe';
import Testimonial from '@Shared/Testimonial/Testimonial';
import ValueProps, {
  TilePropsT as ValuePropsT,
} from '@Shared/ValueProps/ValueProps';
import TileSpotlight, { TilePropsT } from '@Shared/TileSpotlight/TileSpotlight';
// Tiles Assets
import spatialAudio from 'public/spatial_audio.jpg';
import import3dModel from 'public/import_3d_models.jpg';
import customizable from 'public/customizable.jpg';

type CustomPropT = {
  data: HeroT | TitleDescriptionT | FiftyfiftyT;
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

  /**
   * Tile Data
   * TODO - this will eventually come from a CMS
   */
  const tiles = useMemo(() => {
    const data: TilePropsT[] = [
      {
        image: spatialAudio,
        imageAlt: 'spatial audio replicating natural conversations',
        title: 'Spatial Audio',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space — the volume changes based on how close or far away you are.',
      },
      {
        image: import3dModel,
        imageAlt:
          'Import media and share 3D models, PDFs, images, gifs, videos and audio',
        title: 'Media Sharing',
        description:
          'Import media from across the web. Have fun sharing 3D models, PDFs, images, gifs, videos and audio with your guests.',
      },
      {
        image: customizable,
        imageAlt: 'customizable subdomain',
        title: 'Customizable',
        description:
          'Choose your subdomain and make your landing page shine. Included in your Hubs subscription is a customization toolkit for the landing page and Hubs client.',
      },
    ];
    return data;
  }, []);

  /**
   * Value Props Data
   * TODO - this will eventually come from a CMS
   */
  const values = useMemo(() => {
    const data: ValuePropsT[] = [
      {
        icon: 'shield',
        title: 'Private by design',
        description:
          'You control access to your Hubs, so worlds are only discoverable to people you share the link with. ',
      },
      {
        icon: 'cross-device',
        title: 'Works across devices',
        description:
          'Guests can join from any device with a modern browser — no downloads required.',
      },
      {
        icon: 'code',
        title: 'Open Source  ',
        description:
          'Hubs is built in the open — you can check out the source code here.',
      },
    ];
    return data;
  }, []);

  const render = (type: SectionsNamesE): JSX.Element => {
    switch (type) {
      case SectionsNamesE.HERO:
        return <Hero {...heroData} />;
      case SectionsNamesE.FIFTYFIFTY:
        return <FiftyFifty {...FiftyfiftyData} />;
      case SectionsNamesE.TITLE_DESCRIPTION:
        return <TitleDescription {...TitleDescriptionData} />;
      case SectionsNamesE.EMAIL_SIGNUP:
        return <EmailSignUp />;
      case SectionsNamesE.SUBSCRIBE:
        return (
          <div id="subscribe">
            <Subscribe />
          </div>
        );
      case SectionsNamesE.TILE_SPOTLIGHT:
        return (
          <TileSpotlight
            tiles={tiles}
            title="Hubs puts you back in control of your online social spaces"
            body="Your Hub is the portal to your online community. Create spaces for friends, family, co-workers, or communities — the choice is yours. With a subscription to Hubs, you choose who can access your space and take advantage of all that Hubs has to offer."
          />
        );
      case SectionsNamesE.VALUE_PROPS:
        return <ValueProps values={values} />;
      case SectionsNamesE.TESTIMONIAL:
        return <Testimonial />;
      default:
        return <div className="error-message">Section does not exist</div>;
    }
  };

  return render(data.__typename as SectionsNamesE);
};

export default Custom;
