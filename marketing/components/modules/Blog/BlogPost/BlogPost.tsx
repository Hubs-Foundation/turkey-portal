import { BlogPostT } from 'types';
import styles from './BlogPost.module.scss';
import Bar from '@Shared/Bar/Bar';
import Image from 'next/image';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
type BlogPostPropsT = {
  rootLink?: string;
  post: BlogPostT;
};

const BlogPost = ({ post, rootLink = 'Blog' }: BlogPostPropsT) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.bread_crumb}>
            <Link className="primary-link" href="/blog">
              {rootLink}
            </Link>
            <span className="body-sm"> {'>'} </span>
            <Link className="primary-link" href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </div>
          <Bar />
          <h1 className="heading-xl mb-18-dt mb-8-mb">{post.title}</h1>
          <div className={styles.attributes}>
            <p>{post.subtitle}</p>
            <p>{post.date}</p>
          </div>
        </div>

        <div className={styles.image}>
          <Image
            src={post.featuredImage.url}
            height={550}
            width={1200}
            alt={post.imageAlt}
          />
        </div>

        <div className={styles.post}>
          {documentToReactComponents(post.post.json)}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
