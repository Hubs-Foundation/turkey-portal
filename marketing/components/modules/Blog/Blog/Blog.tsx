import styles from './Blog.module.scss';
import BlogPreview from '../BlogPreview/BlogPreview';

const Blog = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1 className="heading-xxl">What's New in Hubs</h1>
        </section>

        <section>
          <BlogPreview />
        </section>
      </div>
    </div>
  );
};

export default Blog;
