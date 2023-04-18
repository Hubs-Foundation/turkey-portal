import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import SubCard from '@Cards/SubCard/SubCard';
import { Icon, HubIcon } from '@mozilla/lilypad-ui';
import TileButton from '@Shared/TileButton/TileButton';
import mozillaLogo from 'public/mozilla_logo.png';
import github from 'public/github.png';
import duck from 'public/duck.png';
import discord from 'public/discord.png';
import { HUB_ROOT_DOMAIN, FXA_SERVER } from 'config';
import { useMobileDown } from 'hooks/useMediaQuery';

export type SidePanelPropsT = {
  subdomain: string;
  subscription: SubscriptionT;
  classProp?: string;
};

const SidePanel = ({
  subdomain,
  subscription,
  classProp = '',
}: SidePanelPropsT) => {
  const isMobile = useMobileDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      {/* TILE BUTTONS  */}
      <div className={styles.tile_buttons}>
        <TileButton
          color="--color-brand-4"
          icon={<Icon name="settings" color="currentColor" />}
          link={`https://${subdomain}.${HUB_ROOT_DOMAIN}/admin`}
          title="Admin Panel"
        />

        {!isMobile && (
          <TileButton
            color="--color-brand-2"
            icon={
              <HubIcon
                name="space"
                classProp={styles.space_icon}
                color="currentColor"
              />
            }
            link={`https://${subdomain}.${HUB_ROOT_DOMAIN}/spoke/projects`}
            title="Scene Editor"
          />
        )}
      </div>

      {/* PRICE  */}
      {subscription && (
        <SubCard subscription={subscription} classProp={styles.subcard} />
      )}

      {/* SUPPORT LINKS  */}
      <ExpansionPanel
        title="Support"
        expanded={true}
        classProp={styles.expansion_panel}
      >
        <div className={styles.support_links}>
          <SupportLink
            image={mozillaLogo}
            link="https://support.mozilla.org/en-US/products/hubs"
            title="Mozilla Support"
            body="Subscriptions and Firefox Accounts"
          />
          <SupportLink
            image={duck}
            link="https://hubs.mozilla.com/docs/welcome.html"
            title="Hubs Docs"
            body="General Hubs support and guidance"
          />
          <SupportLink
            image={github}
            link="https://github.com/mozilla/hubs/discussions"
            title="GitHub Discussions"
            body="Developer support channel"
          />
          <SupportLink
            image={discord}
            link="https://discord.com/invite/wHmY4nd"
            title="Hubs Community"
            body="Community!"
          />
        </div>
      </ExpansionPanel>
    </section>
  );
};

export default SidePanel;
