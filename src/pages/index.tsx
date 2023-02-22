import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import Header from "../../components/Header";
import TRPCTestAndSignIn from "../../components/TRPCTestAndSignIn";
import CreateModal from "../../components/CreateModal";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>My FYP</title>
        <link rel="icon" href="/Munchies-Icon-New-bgWhite.png" />
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <TRPCTestAndSignIn />

      <CreateModal/>
    </>
  );
};

export default Home;


