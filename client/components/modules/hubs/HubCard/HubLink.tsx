import { CopyButton } from '@mozilla/lilypad-ui';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';

type HubLinkPropsT = {
  domain: string;
  subdomain: string;
  classProp?: string;
};

const HubLink = ({ domain, subdomain, classProp = '' }: HubLinkPropsT) => {
  const subdomainRootdomain = `https://${subdomain}.${domain}`;

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
