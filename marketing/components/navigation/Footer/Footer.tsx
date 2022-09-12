import styles from './Footer.module.scss';
import HubsLogo, { LogoCategoryE } from '@Logos/HubsLogo/HubsLogo';
import Image from 'next/image';
import hubDuck from '../../../public/hub_duck.svg';
import mozillaLogo from '../../../public/mozilla_logo.svg';
import twitch from '../../../public/twitch.svg';
import youtube from '../../../public/youtube.svg';
import discord from '../../../public/discord.svg';
import twitter from '../../../public/twitter.svg';
import { useDesktopDown } from 'hooks/useMediaQuery';

type FooterPropsT = {
  classProp?: string;
};

const Footer = ({ classProp = '' }: FooterPropsT) => {
  const isDesktopDown = useDesktopDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <Image src={hubDuck}   width={isDesktopDown ? 60 : 100}
                height={isDesktopDown ? 60 : 100}/>
          <div className={styles.header_content}>
            <h3>Looking for your legacy rooms?</h3>
            {/* TODO - get link  */}
            <a className={styles.legacy_link} href="#">
              visit legacy/former hubs.mozilla.com site
            </a>
          </div>
        </div>

        {/* LINKS  */}
        <div className={styles.link_blocks}>
          {/* HUBS  */}
          <div className={styles.link_block}>
            <div className={styles.logo}>
              <HubsLogo category={LogoCategoryE.DARK} />
            </div>

            <a href="#" className={styles.link}>
              Join Our Discored
            </a>
            <a href="#" className={styles.link}>
              Contribute to Our Code
            </a>
            <a href="#" className={styles.link}>
              Latest News
            </a>
          </div>

          {/* RESOURCES  */}
          <div className={styles.link_block}>
            <h4>Resources</h4>
            <a href="#" className={styles.link}>
              Avatar Maker
            </a>
            <a href="#" className={styles.link}>
              Creator Labs
            </a>
            <a href="#" className={styles.link}>
              Spoke
            </a>
          </div>

          {/* SUPPORT  */}
          <div className={styles.link_block}>
            <h4>Support</h4>
            <a href="#" className={styles.link}>
              Checkout Out Our Guides
            </a>
            <a href="#" className={styles.link}>
              FAQ
            </a>
          </div>

          {/* MORE  */}
          <div className={styles.link_block}>
            <h4>More</h4>
            <a href="#" className={styles.link}>
              Hubs Cloud
            </a>
            <a href="#" className={styles.link}>
              Hubs Merch
            </a>
          </div>

          {/* SOCIAL */}
          <div className={styles.link_block}>
            <div className="u-body-md u-color-text-reverse">
              Follow @MozillaHubs
            </div>
            <div className="flex-justify-between margin-top-20">
              <Image
                width={isDesktopDown ? 36 : ''}
                height={isDesktopDown ? 36 : ''}
                src={discord}
              />
              <Image
                width={isDesktopDown ? 36 : ''}
                height={isDesktopDown ? 36 : ''}
                src={twitter}
              />
              <Image
                width={isDesktopDown ? 36 : ''}
                height={isDesktopDown ? 36 : ''}
                src={youtube}
              />
              <Image
                width={isDesktopDown ? 36 : ''}
                height={isDesktopDown ? 36 : ''}
                src={twitch}
              />
            </div>
          </div>
        </div>

        <div className={styles.border} />

        {/* LINKS  */}
        <div className={styles.submenu_wrapper}>
          <div className={styles.submenu_links}>
            <a className={styles.submenu_link} href="#">
              Privacy Policy
            </a>
            <a className={styles.submenu_link} href="#">
              Turms of Use
            </a>
          </div>
          <Image width={130} src={mozillaLogo} />
        </div>
      </div>
    </section>
  );
};

export default Footer;
