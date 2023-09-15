import ExpansionPanel from '@Shared/ExpansionPanel/ExpansionPanel';
import SupportLink from '@Shared/SupportLink/SupportLink';
import styles from './GettingStartedPanel.module.scss';
import clipboardCircle from 'public/clipboard_circle.png';
import playCircle from 'public/play_circle.png';

const GettingStartedPanel = () => {
  return (
    <ExpansionPanel title="Getting Started" expanded={true}>
      <section>
        <div className={styles.support_links}>
          <SupportLink
            title="Managing Your Hub's Content"
            image={clipboardCircle}
            href="https://hubs.mozilla.com/docs/setup-configuring-content.html"
            body="Learn how to use the Admin Panel and Scene Editor to control the media on your server."
          />

          <SupportLink
            title="Hubs Fundamentals"
            image={clipboardCircle}
            href="https://hubs.mozilla.com/docs/hubs-create-join-rooms.html "
            body="Read about Hubs' key features."
          />

          <SupportLink
            title="Hubs YouTube"
            image={playCircle}
            href="https://www.youtube.com/watch?v=tUw_c2Ng-ac&list=PLCxaiaRxTL6_V88JFYb6tOPkHCKjnH2BK&index=5 "
            body="Watch our Discover Hubs series to understand the essentials of using your subscription."
          />
        </div>
      </section>
    </ExpansionPanel>
  );
};

export default GettingStartedPanel;
