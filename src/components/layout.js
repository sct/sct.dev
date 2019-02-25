import React from 'react';
import { Link } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import { theme, GlobalStyle } from '../styles';
import { rhythm, scale } from '../utils/typography';

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <header>{header}</header>
            <main>{children}</main>
            <footer>
              <a
                href="https://twitter.com/sctx"
                target="_blank"
                rel="noopener noreferrer"
              >
                twitter
              </a>{' '}
              •{' '}
              <a
                href="https://github.com/sct"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>{' '}
              •{' '}
              <a
                href="https://instagram.com/sctlovescoffee"
                target="_blank"
                rel="noopener noreferrer"
              >
                instagram
              </a>
            </footer>
          </div>
        </>
      </ThemeProvider>
    );
  }
}

export default Layout;
