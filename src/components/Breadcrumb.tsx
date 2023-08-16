import styles from './Breadcrumb.module.scss';

import { Directory } from "../types/directory";
import { Fragment } from 'react';

export default function Breadcrumb({
  breadcrumb,
}: {
  breadcrumb: Directory[],
}) {
  const titles = breadcrumb.map(directory => directory.title);

  return (
    <p className={styles.breadcrumb}>
      {titles.reverse().map((title, index) => (
        <Fragment key={title}>
          <span>{title}</span>
          {index !== titles.length - 1 ? ' > ' : ''}
        </Fragment>
      ))}
    </p>
  );
}