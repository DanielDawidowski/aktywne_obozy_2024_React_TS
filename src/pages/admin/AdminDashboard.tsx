import React, { ReactElement } from "react";
import type { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { AdminDashboardStyles, AdminNavStyles, AdminMainStyles } from "./Admin.styles";
import transition from "../../utils/transition";

const AdminDashboard: FC = (): ReactElement => {
  return (
    <Layout chat={false}>
      <AdminDashboardStyles>
        <AdminNavStyles>
          <nav>
            <ul>
              <li>
                <Link to="/admin/event/create">Stwórz wyjazd</Link>
              </li>
              <li>
                <Link to="/admin/clients">Zgłoszenia</Link>
              </li>
              <li>
                <Link to="/admin/events/list">Wyjazdy</Link>
              </li>
            </ul>
          </nav>
        </AdminNavStyles>
        <AdminMainStyles>
          <Outlet />
        </AdminMainStyles>
      </AdminDashboardStyles>
    </Layout>
  );
};

export default transition(AdminDashboard);
