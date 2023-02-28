import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { createClient } from '@supabase/supabase-js';

import { api } from "../utils/api";
import Header from "../../components/Header";
import TRPCTestAndSignIn from "../../components/TRPCTestAndSignIn";
import CreatePostModal from "../../components/CreatePostModal";
import Feed from "../../components/Feed";



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

      {/* <TRPCTestAndSignIn /> */}

      <Feed />

      <CreatePostModal />
    </>
  );
};

export default Home;


