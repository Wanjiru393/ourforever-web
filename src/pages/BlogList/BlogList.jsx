import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { client, urlFor } from '../../lib/sanity'
import styles from './BlogList.module.css'

const QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, publishedAt, excerpt, mainImage
}`

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogList() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    client.fetch(QUERY).then(setPosts).catch(() => setPosts([]))
  }, [])

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.hero}>
        <h1>Wedding Journal</h1>
        <p>Stories, ideas & inspiration for your perfect day.</p>
      </div>

      {posts === null ? (
        <p className={styles.empty}>Loading…</p>
      ) : posts.length === 0 ? (
        <div className={styles.empty}>
          <h2>No posts yet</h2>
          <p>Check back soon for wedding inspiration.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {posts.map(post => (
            <Link key={post._id} to={`/blog/${post.slug.current}`} className={styles.card}>
              {post.mainImage ? (
                <img
                  className={styles.cardImg}
                  src={urlFor(post.mainImage).width(640).height(360).url()}
                  alt={post.title}
                />
              ) : (
                <div className={styles.cardImgPlaceholder}>✦</div>
              )}
              <div className={styles.cardBody}>
                <p className={styles.cardMeta}>{formatDate(post.publishedAt)}</p>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                {post.excerpt && <p className={styles.cardExcerpt}>{post.excerpt}</p>}
                <span className={styles.readMore}>Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Footer />
    </div>
  )
}
