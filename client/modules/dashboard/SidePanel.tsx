import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SidePanel.module.scss';
import { SubscriptionT } from 'services/subscription.service';
import SubCard from '@Cards/SubCard/SubCard';
import { Icon, HubIcon, Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import TileButton from '@Shared/TileButton/TileButton';
import mozillaLogo from 'public/mozilla_logo.png';
import github from 'public/github.png';
import duck from 'public/duck.png';
import discord from 'public/discord.png';
import {
  HUB_ROOT_DOMAIN,
  FXA_PAYMENT_URL,
  PRODUCT_ID,
  PLAN_ID_EA,
} from 'config';
import { useMobileDown } from 'hooks/useMediaQuery';
import { enabledStarterPlan } from 'util/featureFlag';

export type SidePanelPropsT = {
  subdomain: string;
  subscription: SubscriptionT;
  classProp?: string;
  hasStarterPlan: boolean;
  hasSubscription: boolean;
};

const SidePanel = ({
  subdomain,
  subscription,
  classProp = '',
  hasStarterPlan,
  hasSubscription,
}: SidePanelPropsT) => {
  const isMobile = useMobileDown();
  const hasStarter = enabledStarterPlan() && hasStarterPlan;
  const hubUrl = `https://${subdomain}.${HUB_ROOT_DOMAIN}`;

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.tile_buttons}>
        <AdminPanelLink hubUrl={hubUrl} />
        <SpokeLink showSpokeLink={!isMobile && !hasStarter} hubUrl={hubUrl} />
      </div>

      {/* PRICE  */}
      {hasSubscription && (
        <SubCard subscription={subscription} classProp={styles.subcard} />
      )}

      {hasStarter && (
        <div className={styles.upgrade_container}>
          <div>
            <p className="body-md">Ready to take your hub to the next level?</p>
            <p className="body-md">
              Upgrade for a custom subdomain, more storage, and increased user
              capacity.
            </p>
          </div>
          <Button
            category={ButtonCategoriesE.SECONDARY_SOLID}
            text="Upgrade"
            label="Upgrade"
            onClick={() => {
              // TODO add region functionality here - RKW
              window.open(
                `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${PLAN_ID_EA}`
              );
            }}
          />
        </div>
      )}

      <SupportLinksGrid />
    </section>
  );
};

type SpokeLinkT = {
  hubUrl: string;
  showSpokeLink: boolean;
};
const SpokeLink = ({ hubUrl, showSpokeLink }: SpokeLinkT) => {
  return showSpokeLink ? (
    <TileButton
      color="--color-brand-2"
      icon={
        <HubIcon
          name="space"
          classProp={styles.space_icon}
          color="currentColor"
        />
      }
      link={`https://${hubUrl}/spoke/projects`}
      title="Scene Editor"
    />
  ) : (
    <></>
  );
};

type AdminPanelLinkT = {
  hubUrl: string;
};
const AdminPanelLink = ({ hubUrl }: AdminPanelLinkT) => {
  return (
    <TileButton
      color="--color-brand-4"
      icon={<Icon name="settings" color="currentColor" />}
      link={`https://${hubUrl}/admin`}
      title="Admin Panel"
    />
  );
};

const SupportLinksGrid = () => {
  return (
    <ExpansionPanel title="Support" expanded={true}>
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
  );
};

export default SidePanel;
