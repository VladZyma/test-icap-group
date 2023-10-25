import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { userActions } from "./userSlice";

import styles from "./Pagination.module.css";

function Pagination({ prevPage, nextPage, total, dispatch }) {
  const [query, setQuery] = useSearchParams({ limit: "10", offset: "0" });

  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / query.get("limit"));

  function handlePrevPage() {
    setQuery((prev) => ({
      limit: prev.get("limit"),
      offset: +prev.get("offset") - 10,
    }));

    setPage((page) => page - 1);
  }

  function handleNextPage() {
    setQuery((prev) => ({
      limit: prev.get("limit"),
      offset: +prev.get("offset") + 10,
    }));

    setPage((page) => page + 1);
  }

  useEffect(() => {
    dispatch(
      userActions.getAllUsers({
        limit: query.get("limit"),
        offset: query.get("offset"),
      })
    );
  }, [query, dispatch]);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prevBtn}
        disabled={!prevPage}
        onClick={handlePrevPage}
      >
        &larr;
      </button>
      <span>
        {page} of {totalPages}
      </span>
      <button
        className={styles.nextBtn}
        disabled={!nextPage}
        onClick={handleNextPage}
      >
        &rarr;
      </button>
    </div>
  );
}

export default Pagination;
