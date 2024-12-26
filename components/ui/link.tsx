import { CommonPathnames } from '@/common/enums';
import * as React from 'react';
import NextLink from 'next/link';

interface LinkProps {
  text: React.ReactNode;
  href: CommonPathnames;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ text = '', href = CommonPathnames.Home, ...props }, ref) => (
    <NextLink href={href} ref={ref} {...props}>
      {text}
    </NextLink>
  ),
);

CustomLink.displayName = 'CustomLink';

export { CustomLink as Link };
