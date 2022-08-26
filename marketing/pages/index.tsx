import type { NextPage } from 'next';
import { useCallback, useMemo } from 'react';
import Head from 'next/head';
import Hero from '@Shared/Hero/Hero';
import FiftyFifty, { FiftyFiftyLayoutE } from '@Shared/FiftyFifty/FiftyFifty';
import TileSpotlight, { TilePropsT } from '@Shared/TileSpotlight/TileSpotlight';
import Tiers, { TierPropsT } from '@Shared/Tiers/Tiers';
import { useMobileDown } from 'hooks/useMediaQuery';

const Home: NextPage = () => {
  const isMobile = useMobileDown();
  const onCtaClick = useCallback(() => {
    console.log('scroll or w.e');
  }, []);

  /**
   * Mock Tile Data
   */
  const tiles = useMemo(() => {
    const data: TilePropsT[] = [
      {
        image: '/mock_fiftyfifty.jpg',
        title: 'Tile One',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space - the volume changes based on how close or far away you are.',
      },
      {
        image: '/mock_fiftyfifty.jpg',
        title: 'Tile Two',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space - the volume changes based on how close or far away you are.',
      },
      {
        image: '/mock_fiftyfifty.jpg',
        title: 'Tile Three',
        description:
          'Replicate natural conversations with spatialized 3D audio. Break out into groups and then reconvene in the same space - the volume changes based on how close or far away you are.',
      },
    ];
    return data;
  }, []);

  /**
   * Mock Tier Data
   */
  const tiers = useMemo(() => {
    const data: TierPropsT[] = [
      {
        image: '/mock_tier.png',
        title: 'Free',
        subtitle: '(Coming Soon)',
        info: 'Want to be notified when our free offering is available?',
        link: 'Join the mailing list',
        linkUrl: '/#',
        cta: '',
        ctaUrl: '',
      },
      {
        image: '/mock_tier.png',
        title: 'Early Access',
        subtitle: '',
        info: 'Want to be notified when our free offering is available?',
        price: '$20',
        link: '',
        linkUrl: '',
        cta: 'Sign in/ Sign up',
        ctaUrl: '/#',
      },
      {
        image: '/mock_tier.png',
        title: 'Business',
        subtitle: '(Coming Soon)',
        info: 'Want to be notified when our free offering is available?',
        link: 'Contact Us',
        linkUrl: '/#',
        cta: '',
        ctaUrl: '',
      },
    ];
    return data;
  }, []);

  return (
    <div className="page_wrapper">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TileSpotlight
          tiles={tiles}
          title="Hubs puts you back in control of your online social spaces"
          body="Your Hub is the portal to your online community. Create spaces for friends, family, co-workers - the choice is yours. 
          With a subscription to Hubs, you choose who can access your space and take advantage of all Hubs has to offer.
          "
        />

        <Hero
          background={isMobile ? '/HubsHeroMobile.png' : '/HubsHero.png'}
          title="A whole new world, from the comfort of your home"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          cta="Get Started"
          ctaLink="/#subscriptions"
          ctaClick={onCtaClick}
        />

        <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          title="Customizable"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. "
        />
        <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          layout={FiftyFiftyLayoutE.RIGHT}
          title="Customizable"
          subTitle="Hubs is..."
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. "
        />
        <FiftyFifty
          image="/mock_fiftyfifty.jpg"
          title="Customizable"
          body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing bibendum est ultricies integer. Nullam vehicula ipsum a arcu cursus vitae. "
        />

        <Tiers tiers={tiers} />
      </main>
    </div>
  );
};

export default Home;
