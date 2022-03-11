import { PropsWithChildren } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

export function Link(props: PropsWithChildren<LinkProps>) {
  return (
    <MuiLink to={props.to} component={RouterLink} color="inherit">
      {props.children}
    </MuiLink>
  );
}

export default Link;
