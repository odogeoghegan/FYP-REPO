import { getProviders, useSession, signIn as SignIntoProvider } from 'next-auth/react'
import React from 'react'

type SignInProps = {
  providers: Record<string, { id: string; name: string }>
};

function SignIn({ providers }: SignInProps) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 px-14 text-center">
        <img className=" w-96 rounded-3xl" alt="logo" src="/Munchies-Brand-Logo.png" />
        <p className='pt-4'>WHOOOOO custom sign in page</p>
        <div className='mt-8'>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button className="p-3 bg-orange-500 rounded-lg text-black font-bold" onClick={() => {void SignIntoProvider(provider.id, { callbackUrl: "/" })}}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  }
}

export default SignIn