import { useState, useEffect, useMemo } from 'react';
import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './SupportGrid.module.scss';
import { useIsProfessionalUp } from 'hooks/usePlans';
import { PlansE } from 'types/General';
import mailCircle from 'public/mail_circle.png';
import messageCircle from 'public/message_circle.png';
import questionCircle from 'public/question_circle.png';
import BookMeeting from '../BookMeeting/BookMeeting';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';

type PlanContactInfoT = {
  email: string;
  calendar: string;
};

type ContactDataT = {
  [key in PlansE]: PlanContactInfoT;
};

const SupportGrid = () => {
  const account = useSelector(selectAccount);
  const isProfessionalUp = useIsProfessionalUp();
  const [contactData, setContactData] = useState<PlanContactInfoT>({
    email: '',
    calendar: '',
  });

  const contactsData: ContactDataT = useMemo(() => {
    const defualtContactData: PlanContactInfoT = {
      email: 'mailto:hubs-feedback@mozilla.com',
      calendar: '',
    };
    return {
      business: {
        email: 'mailto:hubs-business@mozilla.com',
        calendar: 'https://calendly.com/mhmorran/hubs-subscription-support',
      },
      professional: {
        email: 'mailto:hubs-professional@mozilla.com',
        calendar: 'https://calendly.com/mhmorran/hubs-subscription-support',
      },
      personal: defualtContactData,
      starter: defualtContactData,
      standard: defualtContactData,
    };
  }, []);

  useEffect(() => {
    setContactData(contactsData[account.planName as PlansE]);
  }, [contactsData, account]);

  return (
    <ExpansionPanel title="Support" expanded={true}>
      <section>
        {isProfessionalUp && <BookMeeting href={contactData.calendar} />}
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
              window.open(contactData.email);
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
