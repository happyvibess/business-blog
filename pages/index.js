import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Business Insights - Expert Analysis & Strategies</title>
        <meta name="description" content="Discover cutting-edge business insights, market trends, and strategic analysis for modern entrepreneurs and business leaders." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Business Insights for Modern Leaders</h1>
        <p className="text-xl text-gray-600 mb-8">Expert analysis, trends, and strategies for business success in today's dynamic landscape</p>
        <div className="flex justify-center gap-4">
          <Link href="#posts" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Read Latest Posts</Link>
          <a href="https://www.buymeacoffee.com/happyvibess" className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition">☕ Support Our Work</a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.slug} className="border rounded-lg overflow-hidden shadow-lg">
            {post.frontmatter.image && (
              <img 
                src={post.frontmatter.image} 
                alt={post.frontmatter.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.frontmatter.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.frontmatter.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={`/posts/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));
  
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

