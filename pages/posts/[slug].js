import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Head from 'next/head';
import Link from 'next/link';

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
            ← Back to all posts
          </Link>
          
          {post.frontmatter.image && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {post.frontmatter.title}
          </h1>

          <div className="flex gap-2 mb-8">
            {post.frontmatter.tags.map((tag) => (
              <span 
                key={tag}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <a 
              href="https://www.buymeacoffee.com/happyvibess"
              className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              ☕ Support Our Work
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join('posts', `${slug}.md`),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      post: {
        slug,
        frontmatter,
        content: contentHtml,
        excerpt: content.slice(0, 200) + '...'
      }
    }
  };
}

