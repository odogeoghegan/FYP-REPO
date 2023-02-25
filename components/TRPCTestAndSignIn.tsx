import React from 'react';
import _app from "../src/pages";

import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../src/utils/api";

function TRPCTestAndSignIn() {
  const hello = api.example.hello.useQuery({ text: "from Munchies Team" });
  return (
    
    <div className="flex flex-col items-center gap-2">
      <p className="text-2xl text-black">
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
      <AuthShowcase />
      <Form />
      <Posts />
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

const Form: React.FC = () => {
  const [message, setMessage] = React.useState("");
  const { data: session, status } = useSession();

  const utils = api.useContext();
  const postMessage = api.example.createTest.useMutation({
    onMutate: async (newEntry) => {
      await utils.example.getAllTest.cancel();
      utils.example.getAllTest.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.example.getAllTest.invalidate();
    },
  });

  return status === "authenticated" ? (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <input
        type="text"
        className="rounded-md border-2 border-zinc-800 bg-gray-300  px-4 py-2 focus:outline-none"
        placeholder="Your message..."
        minLength={2}
        maxLength={100}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button
        type="submit"
        className="rounded-md border-2 border-zinc-800 p-2 focus:outline-none"
      >
        Submit
      </button>
    </form>
  ) : null;
};

const Posts: React.FC = () => {
  const { data: post, isLoading } = api.example.getAllTest.useQuery();

  if (isLoading) {
    return <div>Fetching messages...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {post?.map((entry, index) => (
        <div key={index}>
          <p>{entry.message}</p>
          <span>- {entry.name}</span>
        </div>
      ))}
    </div>
  );
};



