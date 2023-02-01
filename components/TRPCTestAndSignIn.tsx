import React from 'react';
import _app from "../src/pages";

import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../src/utils/api";

function TRPCTestAndSignIn() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  return (
    
    <div className="flex flex-col items-center gap-2">
      <p className="text-2xl text-black">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
      <AuthShowcase />
    </div>
  );
}

export default TRPCTestAndSignIn

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-gray-300 px-10 py-3 font-semibold text-black no-underline transition hover:bg-gray-500"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
