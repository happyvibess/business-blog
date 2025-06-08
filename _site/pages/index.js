import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';

export default function Home({ posts }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Business Blog</title>
        <meta name="description" content="Modern business insights and analysis" />
      </Head>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Business Blog</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.frontmatter.title}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.frontmatter.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  Read more →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a 
            href="https://www.buymeacoffee.com/happyvibess" 
            className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
          >
            ☕ Support Our Work
          </a>
        </div>
      </main>
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

