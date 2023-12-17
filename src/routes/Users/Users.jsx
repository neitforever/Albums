import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Suspense } from "react";
import { Link, useLoaderData } from "react-router-dom";
import styles from "./Users.module.css";
import PersonIcon from "@mui/icons-material/Person";
export const loader = async () => {
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (r) => r.json()
  );
  return { users };
};
export default function Users() {
  const { users } = useLoaderData();
  return (
    <Suspense
      fallback={
        <Box>
          <Typography variant="h4">Loading...</Typography>
          <CircularProgress size={100} />
        </Box>
      }
    >
      <Box className={styles.usersList}>
        {users.map((user) => (
          <Box>
            <PersonIcon
              style={{ position: "relative", top: "5px", marginRight: "5px" }}
              fontSize="small"
              className={styles.personIcon}
            />
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              className={styles.userLink}
            >
              {user.name}
            </Link>
          </Box>
        ))}
      </Box>
    </Suspense>
  );
}
