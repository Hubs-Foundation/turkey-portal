import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SupportGrid.module.scss';
import { useIsStarter } from 'hooks/usePlans';
import mailCircle from 'public/mail_circle.png';
import messageCircle from 'public/message_circle.png';
import questionCircle from 'public/question_circle.png';
import BookMeeting from '../BookMeeting/BookMeeting';

const SupportGrid = () => {
  const isStarter = useIsStarter();
  return (
    <ExpansionPanel title="Support" expanded={true}>
      <section>
        {!isStarter && <BookMeeting />}

        <div className={styles.support_links}>
          <SupportLink
            title="Message Us"
            image={messageCircle}
            href="https://discord.gg/hubs-498741086295031808 "
            body="Ask questions about using your subscription in our public support forum."
          />

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
            title="Help"
            image={questionCircle}
            href="https://support.mozilla.org/en-US/products/hubs "
            body="Get help managing your subscription and mozilla account."
          />
        </div>
      </section>
    </ExpansionPanel>
  );
};

export default SupportGrid;
