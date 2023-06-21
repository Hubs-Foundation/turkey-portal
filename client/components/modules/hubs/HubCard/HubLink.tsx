import { CopyButton } from '@mozilla/lilypad-ui';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import { HUB_ROOT_DOMAIN } from 'config';

type HubLinkPropsT = {
  subdomain: string;
  classProp?: string;
};

const HubLink = ({ subdomain, classProp = '' }: HubLinkPropsT) => {
  const subdomainRootdomain = `https://${subdomain}.${HUB_ROOT_DOMAIN}`;

  return (
    <div className={`flex ${classProp}`}>
      <ExternalLink
        target="_blank"
        href={subdomainRootdomain}
        classProp="mr-20"
      >
        {subdomainRootdomain}
      </ExternalLink>

      <CopyButton value={subdomainRootdomain} />
    </div>
  );
};

export default HubLink;
