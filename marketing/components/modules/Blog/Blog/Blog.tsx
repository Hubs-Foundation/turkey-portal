import styles from './Blog.module.scss';
import BlogPreview from '../BlogPreview/BlogPreview';
import { BlogT } from 'types';

type BlogPropsT = {
  blogData: BlogT;
};

const Blog = ({ blogData }: BlogPropsT) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <section className={styles.header}>
        <h1 className="heading-xxl">{blogData.name}</h1>
      </section>

      <section className={styles.preview_wrapper}>
        <div className={styles.preview_container}>
          {blogData.posts.map((post) => (
            <BlogPreview key={post.sys.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default Blog;
