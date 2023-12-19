import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SupportGrid.module.scss';
import {
  useIsProfessionalUp,
  useIsBusiness,
  useIsProfessional,
} from 'hooks/usePlans';
import mailCircle from 'public/mail_circle.png';
import messageCircle from 'public/message_circle.png';
import questionCircle from 'public/question_circle.png';
import BookMeeting from '../BookMeeting/BookMeeting';

const SupportGrid = () => {
  const isProfessionalUp = useIsProfessionalUp();
  const isBusiness = useIsBusiness();
  const isProfessional = useIsProfessional();
  const businessCal = 'https://calendly.com/mhmorran/onboarding/busi';
  const professionalCal = 'https://calendly.com/mhmorran/onboarding/pers';

  const meetingHref = () => {
    let href = '';
    if (isBusiness) href = businessCal;
    if (isProfessional) href = professionalCal;
    return href;
  };

  return (
    <ExpansionPanel title="Support" expanded={true}>
      <section>
        {isProfessionalUp && <BookMeeting href={meetingHref()} />}
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
            body="Get help managing your subscription and account."
          />
        </div>
      </section>
    </ExpansionPanel>
  );
};

export default SupportGrid;
