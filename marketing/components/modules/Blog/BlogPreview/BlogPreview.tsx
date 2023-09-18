import styles from './BlogPreview.module.scss';
import { BlogPostPreviewT } from 'types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@mozilla/lilypad-ui';

type BlogPreviewPropsT = {
  post: BlogPostPreviewT;
};

const BlogPreview = ({ post }: BlogPreviewPropsT) => (
  <Link href={`/blog/${post.slug}`}>
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Image
            src={post.thumbnailImage.url}
            alt={post.imageAlt}
            width={550}
            height={550}
          />
        </div>
        <div className={styles.content}>
          <h3 className="heading-lg">{post.title}</h3>
          <p className="body-md-bold">{post.subtitle}</p>
          <p className="body-sm">{post.date}</p>
          <p className="body-md">{post.preview}</p>
          <div className={styles.cta}>
            <Button
              classProp="width-100"
              text="Read More"
              label="presentational"
              category="primary_outline"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default BlogPreview;
