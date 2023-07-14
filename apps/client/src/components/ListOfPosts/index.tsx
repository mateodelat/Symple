import { LikeButton } from '../LikeButton'
import styles from './LIstOfPosts.module.scss'

const fetchPosts = async (): Promise<any> => {
  return await fetch('https://jsonplaceholder.typicode.com/posts', {
    next: {
      revalidate: 10
    }
  })
    .then(async res => await res.json())
}

export const ListOfPosts = async (): Promise<any> => {
  const posts: any[] = await fetchPosts()
  return posts.slice(0, 10).map(post => (
    <article key={post.id} className={styles.post}>
      <h2 style={{ color: '#09f' }}>{post.title}</h2>
      <p>{post.body}</p>
      <LikeButton id={post.id} />
    </article>
  ))
}
