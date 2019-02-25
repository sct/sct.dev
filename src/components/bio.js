import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;

        return (
          <div
            style={{
              display: `flex`,
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
            <p>
              Hi{' '}
              <span role="img" aria-label="waving hand">
                👋
              </span>{' '}
              I'm{' '}
              <a
                href={`https://twitter.com/${social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {author}
              </a>
              . This is my internet space for things.
              <br />I am a{' '}
              <a
                href="https://github.com/sct"
                target="_blank"
                rel="noopener noreferrer"
              >
                software engineer
              </a>{' '}
              that lives and works in Tokyo, Japan{' '}
              <span role="img" aria-label="Japanese Flag">
                🇯🇵
              </span>{' '}
              I'm addicted to coffee{' '}
              <span role="img" aria-label="coffee cup">
                ☕️
              </span>{' '}
              and I love{' '}
              <a
                href="https://instagram.com/sctlovescoffee"
                target="_blank"
                rel="noopener noreferrer"
              >
                taking pictures
              </a>{' '}
              <span role="img" aria-label="camera">
                📸
              </span>
            </p>
          </div>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
