import type { NextPage } from 'next';
import { useMemo } from 'react';
import Head from 'next/head';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty, { FiftyFiftyLayoutE } from '@Shared/FiftyFifty/FiftyFifty';
import TileSpotlight, { TilePropsT } from '@Shared/TileSpotlight/TileSpotlight';
import TitleDescription from '@Shared/TitleDescription/TitleDescription';
import Subscribe from '@Shared/Subscribe/Subscribe';
import ValueProps, {
  TilePropsT as ValuePropsT,
} from '@Shared/ValueProps/ValueProps';
import Testimonial from '@Shared/Testimonial/Testimonial';
import SpatialAudio from '../public/spatial_audio.jpg';
import Import3dModel from '../public/import_3d_models.jpg';
import HubsMobileHero from '../public/hubs_hero_mobile.jpg';
import HubsHero from '../public/hubs_hero.jpg';
import engagingFiftyfifty from '../public/engaging_fiftyfifty.png';
import hubsFiftyfifty from '../public/hubs_fiftyfifty.png';
import heart from '../public/heart.png';
import engaging_fiftyfifty_mobile from '../public/engaging_fiftyfifty_mobile.png';
import { useMobileDown } from 'hooks/useMediaQuery';

const Home: NextPage = () => {
  const isMobile = useMobileDown();

  /**
   * Tile Data
   * TODO - this will eventually come from a CMS
   */
  const tiles = useMemo(() => {
    const data: TilePropsT[] = [
      {
        image: SpatialAudio,
        imageAlt: 'spatial audio',
        title: 'Spatial Audio',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space — the volume changes based on how close or far away you are.',
      },
      {
        image: Import3dModel,
        imageAlt: 'import 3d model',
        title: 'Media Sharing',
        description:
          'mport media from across the web. Have fun sharing 3D models, PDFs, images, gifs, videos and audio with your guests.',
      },
      {
        image: Import3dModel,
        imageAlt: 'customizable',
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

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hubs - Private, virtual 3D spaces in your browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero
          background={isMobile ? HubsMobileHero : HubsHero}
          title="A whole new world, from the comfort of your home"
          body="ake control of your online communities with a fully open source virtual world platform that you can make your own."
          cta="Get Started"
          ctaLink="/#subscribe"
          heroAlt="A diverse group of friendly avatars, on a colorful island, waving their hands."
        />

        <TitleDescription
          title="A better way to connect online"
          description="No more videos in a grid of squares. Gather with your community online as avatars in a virtual space and communicate more naturally — no headset required."
        />

        <FiftyFifty
          imageMobile={engaging_fiftyfifty_mobile}
          image={engagingFiftyfifty}
          imageAlt="Engage Digital Worlds"
          accentImage={heart}
          title="Engaging Digital Worlds"
          body="Create a museum for your favorite hobbies, a classroom to connect with your students, a planet in outer space, or an office that serves as your company HQ. Hubs provides templates and scenes to get started with building out your vibrant virtual worlds.
          "
        />

        <FiftyFifty
          imageMobile={engaging_fiftyfifty_mobile}
          image={hubsFiftyfifty}
          imageAlt="Engage Digital Worlds"
          accentImage={heart}
          title="Engaging Digital Worlds"
          layout={FiftyFiftyLayoutE.RIGHT}
          body="Create a museum for your favorite hobbies, a classroom to connect with your students, a planet in outer space, or an office that serves as your company HQ. Hubs provides templates and scenes to get started with building out your vibrant virtual worlds.
          "
        />

        <FiftyFifty
          imageMobile={engaging_fiftyfifty_mobile}
          image={engagingFiftyfifty}
          imageAlt="Engage Digital Worlds"
          accentImage={heart}
          title="Engaging Digital Worlds"
          body="Create a museum for your favorite hobbies, a classroom to connect with your students, a planet in outer space, or an office that serves as your company HQ. Hubs provides templates and scenes to get started with building out your vibrant virtual worlds.
          "
        />

        <TileSpotlight
          tiles={tiles}
          title="Hubs puts you back in control of your online social spaces"
          body="Your Hub is the portal to your online community. Create spaces for friends, family, co-workers, or communities — the choice is yours. With a subscription to Hubs, you choose who can access your space and take advantage of all that Hubs has to offer."
        />

        <FiftyFifty
          imageMobile={engaging_fiftyfifty_mobile}
          image={engagingFiftyfifty}
          imageAlt="Engage Digital Worlds"
          accentImage={heart}
          title="Engaging Digital Worlds"
          body="Create a museum for your favorite hobbies, a classroom to connect with your students, a planet in outer space, or an office that serves as your company HQ. Hubs provides templates and scenes to get started with building out your vibrant virtual worlds.
          "
        />

        <ValueProps values={values} />

        <div id="subscribe">
          <Subscribe />
        </div>

        <Testimonial />
      </main>
    </div>
  );
};

export default Home;
