import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { client, urlFor } from '../../lib/sanity'
import styles from './BlogPost.module.css'

const QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, publishedAt, mainImage, body,
  "author": author->name
}`

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

const ptComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">{children}</a>
    ),
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined) // undefined = loading, null = not found

  useEffect(() => {
    client.fetch(QUERY, { slug }).then(data => setPost(data || null))
  }, [slug])

  if (post === undefined) return (
    <div className={styles.page}><Navbar /><p className={styles.notfound}>Loading…</p><Footer /></div>
  )

  if (post === null) return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.notfound}>
        <h2>Post not found</h2>
        <p><Link to="/blog" className={styles.back}>← Back to Journal</Link></p>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className={styles.page}>
      <Navbar />

      {post.mainImage ? (
        <div className={styles.hero}>
          <img
            className={styles.heroImg}
            src={urlFor(post.mainImage).width(1200).height(420).url()}
            alt={post.title}
          />
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <p className={styles.meta}>
                {post.author && `${post.author} · `}{formatDate(post.publishedAt)}
              </p>
              <h1 className={styles.title}>{post.title}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.noHero}>
          <p className={styles.meta}>{post.author && `${post.author} · `}{formatDate(post.publishedAt)}</p>
          <h1 className={styles.title}>{post.title}</h1>
        </div>
      )}

      <div className={styles.backBar}>
        <Link to="/blog" className={styles.back}>← Back to Journal</Link>
      </div>
      <div className={styles.body}>
        {post.body && <PortableText value={post.body} components={ptComponents} />}
      </div>

      <Footer />
    </div>
  )
}
