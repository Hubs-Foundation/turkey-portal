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

  const handleDiscordClick = () => {
    window.open('https://discord.gg/sBMqSjCndj');
  };

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <Image
            src={hubDuck}
            width={isDesktopDown ? 60 : 100}
            height={isDesktopDown ? 60 : 100}
            alt="Hub Yellow Duck"
          />
          <div className={styles.header_content}>
            <h4>Looking for your old rooms?</h4>
            {/* TODO - GET THIS LINK!!  */}
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

            <a onClick={handleDiscordClick} href="#" className={styles.link}>
              Join Our Discored
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mozilla/hubs/"
              className={styles.link}
            >
              Contribute to Our Code
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/whats-new"
              className={styles.link}
            >
              Latest News
            </a>
          </div>

          {/* RESOURCES  */}
          <div className={styles.link_block}>
            <h4>Resources</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mozilla.github.io/hackweek-avatar-maker/"
              className={styles.link}
            >
              Avatar Maker
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/labs/"
              className={styles.link}
            >
              Creator Labs
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/spoke/"
              className={styles.link}
            >
              Spoke
            </a>
          </div>

          {/* SUPPORT  */}
          <div className={styles.link_block}>
            <h4>Support</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/docs/welcome.html"
              className={styles.link}
            >
              Checkout Out Our Guides
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/docs/hubs-faq.html"
              className={styles.link}
            >
              FAQ
            </a>
          </div>

          {/* MORE  */}
          <div className={styles.link_block}>
            <h4>More</h4>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hubs.mozilla.com/cloud/"
              className={styles.link}
            >
              Hubs Cloud
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://mozillamr.myspreadshop.com/"
              className={styles.link}
            >
              Hubs Merch
            </a>
          </div>

          {/* SOCIAL */}
          <div className={styles.link_block}>
            <div className="u-body-md u-color-text-reverse">
              Follow @MozillaHubs
            </div>
            <div className="flex-justify-between margin-top-20">
              <a onClick={handleDiscordClick} href="#">
                <Image
                  width={isDesktopDown ? 36 : ''}
                  height={isDesktopDown ? 36 : ''}
                  src={discord}
                  alt="discord"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://twitter.com/MozillaHubs"
              >
                <Image
                  width={isDesktopDown ? 36 : ''}
                  height={isDesktopDown ? 36 : ''}
                  src={twitter}
                  alt="twitter"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/c/MozillaHubs"
              >
                <Image
                  width={isDesktopDown ? 36 : ''}
                  height={isDesktopDown ? 36 : ''}
                  src={youtube}
                  alt="youtube"
                />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.twitch.tv/mozillahubs"
              >
                <Image
                  width={isDesktopDown ? 36 : ''}
                  height={isDesktopDown ? 36 : ''}
                  src={twitch}
                  alt="twitch"
                />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.border} />

        {/* LINKS  */}
        <div className={styles.submenu_wrapper}>
          <div className={styles.submenu_links}>
            <a
              target="_blanks"
              className={styles.submenu_link}
              href="https://www.mozilla.org/en-US/privacy/hubs/"
            >
              Privacy Policy
            </a>
            <a
              target="_blanks"
              className={styles.submenu_link}
              href="https://www.mozilla.org/en-US/about/legal/terms/hubs/"
            >
              Terms of Use
            </a>
          </div>
          <Image width={130} src={mozillaLogo} alt="Mozilla Logo" />
        </div>
      </div>
    </section>
  );
};

export default Footer;
