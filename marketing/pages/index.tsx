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
import { useMobileDown } from 'hooks/useMediaQuery';
import type { GetServerSidePropsContext } from 'next';
// Hero Assets
import HubsMobileHero from '../public/hubs_hero_mobile.jpg';
import HubsHero from '../public/hubs_hero.jpg';
// Fifty Fifty Assets
import makeOwnFiftyFifty from '../public/fiftyfifty_make_own.png';
import makeOwnFiftyFiftyMobile from '../public/fiftyfifty_make_own_mobile.png';
import engagingFiftyfifty from '../public/fiftyfifty_engaging.png';
import engagingFiftyFiftyMobile from '../public/fiftyfifty_engaging_mobile.png';
import hubsFiftyfifty from '../public/fiftyfifty_hubs.png';
import hubsFiftyFiftyMobile from '../public/fiftyfifty_hubs_mobile.png';
import avatarsFiftyfifty from '../public/fiftyfifty_avatars.png';
import avatarsFiftyfiftyMobile from '../public/fiftyfifty_avatars_mobile.png';
import heart from '../public/heart.png';
// Tiles Assets
import spatialAudio from '../public/spatial_audio.jpg';
import import3dModel from '../public/import_3d_models.jpg';
import customizable from '../public/customizable.jpg';

const Home: NextPage = () => {
  const isMobile = useMobileDown();

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

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hubs - Private, virtual 3D worlds in your browser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Hero
          background={isMobile ? HubsMobileHero : HubsHero}
          title="A whole new world, from the comfort of your home"
          body="take control of your online communities with a fully open source virtual world platform that you can make your own."
          cta="Get Started"
          ctaLink="/#subscribe"
          heroAlt="A diverse group of friendly avatars, on a colorful island, waving their hands."
        />

        <TitleDescription
          title="A better way to connect online"
          description="No more videos in a grid of squares. Gather with your community online as avatars in a virtual space and communicate more naturally — no headset required."
        />

        <FiftyFifty
          imageMobile={engagingFiftyFiftyMobile}
          image={engagingFiftyfifty}
          imageAlt="Hubs landscaps with trees and sun and indoore example"
          title="The many ways to use Hubs"
        >
          <ul className="padding-left-15 u-text-left">
            <li>Host a virtual event</li>
            <li>Create a museum or digital gallery</li>
            <li>Build a space for your favorite hobbies</li>
            <li>Open a classroom to connect with your students</li>
            <li>Host a social hour for your team</li>
            <li>Have a meeting on a planet in outer space</li>
          </ul>
        </FiftyFifty>

        <FiftyFifty
          imageMobile={makeOwnFiftyFiftyMobile}
          image={makeOwnFiftyFifty}
          imageAlt="Avatars having a conversation in a dining hall"
          title="Make it your own"
          layout={FiftyFiftyLayoutE.RIGHT}
          body="Create a unique Hub by choosing environments and avatars that represent your community. Decorate using our world-building tool Spoke. 3D artists can build their own world from scratch using Blender."
        />

        <FiftyFifty
          imageMobile={avatarsFiftyfiftyMobile}
          image={avatarsFiftyfifty}
          imageAlt="Diverse display of avatars and fun graphics"
          title="Expressive avatars"
          body="Change your hair, your outfit, your vibe. Choose from a rich array
          of diverse avatars to show off how you’re feeling, or create your own range of different styles that let your personality shine through."
        />

        <TileSpotlight
          tiles={tiles}
          title="Hubs puts you back in control of your online social spaces"
          body="Your Hub is the portal to your online community. Create spaces for friends, family, co-workers, or communities — the choice is yours. With a subscription to Hubs, you choose who can access your space and take advantage of all that Hubs has to offer."
        />

        <FiftyFifty
          imageMobile={hubsFiftyFiftyMobile}
          image={hubsFiftyfifty}
          imageAlt="Avatars meeting and in open air auditorium"
          accentImage={heart}
          subTitle="Hubs is..."
          title="joyful, secure, yours"
          layout={FiftyFiftyLayoutE.RIGHT}
        >
          <p>
            We believe everyone should be able to create the (virtual) reality
            of their dreams.
          </p>
          <p>
            Hubs is the only virtual world platform that puts you in full
            control — by Mozilla, the company that created Firefox.
          </p>
        </FiftyFifty>

        <ValueProps values={values} />

        <div id="subscribe">
          <Subscribe />
        </div>

        <Testimonial />
      </main>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Home;
