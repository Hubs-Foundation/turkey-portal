import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SidePanel.module.scss';
import mozillaLogo from 'public/mozilla_logo.png';
import github from 'public/github.png';
import duck from 'public/duck.png';
import discord from 'public/discord.png';

export type SidePanelPropsT = {
  classProp?: string;
};

const SidePanel = ({ classProp = '' }: SidePanelPropsT) => {
  return (
    <section className={classProp}>
      <ExpansionPanel title="Support" classProp={styles.expansion_panel}>
        <div className={styles.link_widgets}>
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
