import { BlogPostT } from 'types';
import styles from './BlogPost.module.scss';
import Bar from '@Shared/Bar/Bar';
import Image from 'next/image';
import Link from 'next/link';
import { RoutesE } from 'types/Routes';
import { useRouter } from 'next/router';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from '@mozilla/lilypad-ui';
type BlogPostPropsT = {
  rootLink?: string;
  post: BlogPostT;
};

const BlogPost = ({ post, rootLink = 'Blog' }: BlogPostPropsT) => {
  const router = useRouter();
  const onBackClick = () => {
    router.push(RoutesE.BLOG);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <section className={styles.header}>
          <div className={styles.bread_crumb}>
            <Button
              icon="chevron-left"
              category="primary_outline"
              size="small"
              onClick={onBackClick}
              classProp={styles.back_button}
            />
            <Link className="primary-link" href={RoutesE.BLOG}>
              {rootLink}
            </Link>
            <span className="body-sm">&nbsp; {'>'}&nbsp; </span>
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
        </section>

        <section className={styles.image}>
          <Image
            src={post.featuredImage.url}
            height={550}
            width={1200}
            alt={post.imageAlt}
          />
        </section>

        <section className={styles.post}>
          {documentToReactComponents(post.post.json)}
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
