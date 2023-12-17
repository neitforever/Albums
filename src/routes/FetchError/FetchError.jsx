import { useRouteError } from "react-router-dom";
import styles from "./FetchError.module.css";

export default function BadFetch({ notExist }) {
  const error = useRouteError();
  return (
    <div className={styles.fetchErrorContainer}>
      <span className={styles.errorText}>
        {error ? `There no such ${notExist}` : "Unknown error"}
      </span>
    </div>
  );
}
