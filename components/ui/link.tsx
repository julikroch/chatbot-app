import NextLink from 'next/link';
import * as React from 'react';
import { CommonPathnames } from '@/common/enums';

interface LinkProps {
  text: React.ReactNode;
  href: CommonPathnames;
  className?: string;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ text = '', href = CommonPathnames.Home, className, ...props }, ref) => (
    <NextLink href={href} ref={ref} className={className} {...props}>
      {text}
    </NextLink>
  ),
);

CustomLink.displayName = 'CustomLink';

export { CustomLink as Link };
