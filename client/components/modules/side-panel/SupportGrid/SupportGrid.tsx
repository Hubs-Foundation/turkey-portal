import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SupportGrid.module.scss';
import mozillaLogo from 'public/mozilla_logo.png';

import mailCircle from 'public/mail_circle.png';
import messageCircle from 'public/message_circle.png';
import communityCircle from 'public/community_circle.png';
import BookMeeting from '../BookMeeting/BookMeeting';

const SupportGrid = () => {
  return (
    <ExpansionPanel title="Support" expanded={true}>
      <section>
        <BookMeeting />

        <div className={styles.support_links}>
          <SupportLink
            title="Email Us"
            image={mailCircle}
            // Firefox does not honor "_bank" on "mailtos"
            onClick={() => {
              window.open('mailto:hubs-feedback@mozilla.com');
            }}
            body="Contact us via email with your questions."
          />

          <SupportLink
            title="Message Us"
            image={messageCircle}
            href="https://discord.gg/hubs-498741086295031808 "
            body="Ask questions about using your subscription in our public support forum."
          />

          <SupportLink
            title="Mozilla Support"
            image={mozillaLogo}
            href="https://support.mozilla.org/en-US/products/hubs "
            body="Get help managing your subscription and firefox account."
          />

          <SupportLink
            title="Community Support"
            image={communityCircle}
            href="https://discord.gg/hubs-498741086295031808"
            body="Connect with the Hubs Community to get support with your questions."
          />
        </div>
      </section>
    </ExpansionPanel>
  );
};

export default SupportGrid;
