import React from "react";
import Layout from "../SharedComponents/Layout";
import Chat from "../Components/Chat/Chat";
import Header from "../SharedComponents/Header";

export default function ChatPage() {
  return (
    <>
    <Header/>
      <Layout>
        <Chat />
      </Layout>
    </>
  );
}
