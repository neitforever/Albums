import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Box, Divider, Typography } from "@mui/material";

export default function Layout() {
  return (
    <Box className={styles.container}>
      <header className={styles.header}>
        <Typography>
          <NavLink
            to="/albums/"
            end={true}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Albums
          </NavLink>
        </Typography>
        <Typography>
          <NavLink
            to="/users"
            end={true}
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Users
          </NavLink>
        </Typography>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer>
        <Divider className={styles.divider} />
        <Box className={styles.footer}>
          <Typography className={styles.footerCreatedBy}>
            Created by: Vlad Ptuashko
          </Typography>
          <Typography className={styles.footerYear}>BSU: 2023</Typography>
        </Box>
      </footer>
    </Box>
  );
}
