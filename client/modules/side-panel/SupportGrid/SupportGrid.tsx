import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SupportGrid.module.scss';
import mozillaLogo from 'public/mozilla_logo.png';
import github from 'public/github.png';
import duck from 'public/duck.png';
import discord from 'public/discord.png';
import mailCircle from 'public/mail_circle.png';
import BookMeeting from '../BookMeeting/BookMeeting';

const SupportGrid = () => {
  return (
    <ExpansionPanel title="Support" expanded={true}>
      <section>
        <BookMeeting />

        <div className={styles.support_links}>
          <SupportLink
            image={mailCircle}
            link="https://support.mozilla.org/en-US/products/hubs"
            title="Mozilla Support"
            body="Subscriptions and Firefox Accounts"
          />
          {/* <SupportLink
            image={mozillaLogo}
            link="https://support.mozilla.org/en-US/products/hubs"
            title="Mozilla Support"
            body="Subscriptions and Firefox Accounts"
          /> */}
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
      </section>
    </ExpansionPanel>
  );
};

export default SupportGrid;
