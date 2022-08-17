import { CopyButton } from '@mozilla/lilypad';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import { HUB_ROOT_DOMAIN } from 'config';

type HubLinkPropsT = {
  subdomain: string;
  classProp?: string;
};

const HubLink = ({ subdomain, classProp = '' }: HubLinkPropsT) => {
  return (
    <div className={`flex ${classProp}`}>
      <ExternalLink
        target="_blank"
        href={`${subdomain}.${HUB_ROOT_DOMAIN}`}
        classProp="margin-right-20"
      >
        {subdomain}.{HUB_ROOT_DOMAIN}
      </ExternalLink>

      <CopyButton value={`${subdomain}.${HUB_ROOT_DOMAIN}`} />
    </div>
  );
};

export default HubLink;
