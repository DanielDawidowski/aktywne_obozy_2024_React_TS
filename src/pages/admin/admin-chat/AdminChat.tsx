import React, { ReactElement } from "react";
import type { FC } from "react";
import AdminChatList from "./admin-chat-list/AdminChatList";
import AdminChatWindow from "./admin-chat-window/AdminChatWindow";
import Layout from "../../../components/layout/Layout";
import { useAppSelector } from "../../../redux-toolkit/hooks";
import { AdminChatStyles } from "./AdminChatStyles";
import transition from "../../../utils/transition";

const AdminChat: FC = (): ReactElement => {
  const { selectedChatUser } = useAppSelector((state) => state.chat);
  return (
    <Layout chat={false}>
      <AdminChatStyles>
        <aside>
          <AdminChatList />
        </aside>
        <main>{selectedChatUser && <AdminChatWindow />}</main>
      </AdminChatStyles>
    </Layout>
  );
};

export default transition(AdminChat);
