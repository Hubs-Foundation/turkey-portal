import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import SubCard from '@Cards/SubCard/SubCard';
import { Icon } from '@mozilla/lilypad-ui';
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
          link={`https://${FXA_SERVER}/settings`}
          title="Admin Panel"
        />

        {!isMobile && (
          <TileButton
            color="--color-brand-2"
            icon={
              <Icon
                name="space"
                classProp={styles.space_icon}
                color="currentColor"
              />
            }
            link={`https://${subdomain}.${HUB_ROOT_DOMAIN}/admin`}
            title="Space Editor"
          />
        )}

        <TileButton
          color="--color-brand-1"
          icon={<Icon name="plus" color="currentColor" />}
          link={`https://${subdomain}.${HUB_ROOT_DOMAIN}/admin`}
          title="Create Room"
        />
      </div>

      {/* PRICE  */}
      {/* note : make sure this is wrapped with a flag for only paid customers.  */}
      <SubCard subscription={subscription} classProp={styles.subcard} />

      {/* SUPPORT LINKS  */}
      <ExpansionPanel title="Support" classProp={styles.expansion_panel}>
        <div className={styles.support_links}>
          <SupportLink
            image={mozillaLogo}
            link="/test"
            title="Mozilla Support"
            body="Subscriptions and Firefox Accounts"
          />
          <SupportLink
            image={duck}
            link="/test"
            title="Hubs Docs"
            body="General Hubs support and guidance"
          />
          <SupportLink
            image={github}
            link="/test"
            title="GitHub Discussions"
            body="Developer support channel"
          />
          <SupportLink
            image={discord}
            link="/test"
            title="Hubs Community"
            body="Community!"
          />
        </div>
      </ExpansionPanel>
    </section>
  );
};

export default SidePanel;
