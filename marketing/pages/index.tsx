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
import Mock from '../public/mock_fiftyfifty.jpg';
import HubsMobileHero from '../public/hubs_hero_mobile.jpg';
import HubsHero from '../public/hubs_hero.jpg';
import engagingFiftyfifty from '../public/engaging_fiftyfifty.png';
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
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space - the volume changes based on how close or far away you are.',
      },
      {
        image: Import3dModel,
        imageAlt: 'import 3d model',
        title: 'Media Sharing',
        description:
          'Import media from across the web. Have fun sharing 3D models, pdfs, images, gifs, videos and audio with your guests.',
      },
      {
        image: Mock,
        imageAlt: 'mock',
        title: 'Tile Three',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space - the volume changes based on how close or far away you are.',
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
          'Your Hubs spaces are private by design and discoverable only to people you share the link with.',
      },
      {
        icon: 'cross-device',
        title: 'Works across devices',
        description:
          'Guests can join from most devices with a modern browser - desktop computers, mobile devices, and VR headsets. No downloads required.',
      },
      {
        icon: 'code',
        title: 'Open Source  ',
        description:
          'Hubs is built in the open, check out our source code here',
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
          body="Take control of your online communities with a fully open source virtual world platform that you can make your own"
          cta="Get Started"
          ctaLink="/#subscribe"
          heroAlt="A diverse group of friendly avatars, on a colorful island, waving their hands."
        />

        <TitleDescription
          title="We're bringing the best of face-to-face interactions to the web:"
          description="No more videos in a grid of squares. Connect with your community online in virtual spaces as avatars to communicate more naturally."
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
          body="Your Hub is the portal to your online community. Create spaces for friends, family, co-workers - the choice is yours. 
          With a subscription to Hubs, you choose who can access your space and take advantage of all Hubs has to offer.
          "
        />

        <ValueProps values={values} />
        <div id="subscribe">
          <Subscribe />
        </div>

        {/* <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          imageAlt="TODO alt text for image"
          title="Customizable"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. "
        /> */}

        <Testimonial />

        {/* <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          imageAlt="TODO alt text for image"
          layout={FiftyFiftyLayoutE.RIGHT}
          title="Customizable"
          subTitle="Hubs is..."
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. "
        />
        <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          imageAlt="TODO alt text for image"
          title="Customizable"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. " 
        />
        */}
      </main>
    </div>
  );
};

export default Home;
