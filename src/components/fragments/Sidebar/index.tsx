import React from "react";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}>Admin Panel</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`${styles.sidebar__top__lists__item} ${
                pathname === list.url &&
                styles.sidebar__top__lists__item__active
              }`}
            >
              <i className={`bx ${list.icon}`} />
              <h4 className={styles.sidebar__top__lists__item__title}>
                {list.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
