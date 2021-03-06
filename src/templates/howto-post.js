import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";

function HowToPostTemplate({
  data,
  pageContext: { previous, next },
  location,
}) {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const slug = post.fields.slug.slice(1, post.fields.slug.length - 1);
  const editUrl = `https://github.com/excalidraw/excalidraw-howto/edit/master/${post.fileAbsolutePath.substr(
    post.fileAbsolutePath.indexOf("content/howto")
  )}`;
  const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://howto.excalidraw.com${post.fields.slug}`
  )}`;
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <p style={{ fontFamily: "var(--ui-font)", marginBottom: 0 }}>
        <a href={discussUrl}>Discuss on Twitter</a>
        {" • "}
        <a href={editUrl}>Edit on GitHub</a>
      </p>
      {previous || next ? (
        <>
          <hr
            style={{
              margin: `${rhythm(1)} 0`,
            }}
          />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </>
      ) : null}
    </Layout>
  );
}

export default HowToPostTemplate;

export const pageQuery = graphql`
  query HowToPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fileAbsolutePath
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`;
