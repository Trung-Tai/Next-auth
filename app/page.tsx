import Head from 'next/head';
import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const  Home: React.FC =  async () => {
  const session =  await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <Head>
        <title>Stock Market</title>
        <meta name="description" content="The World's Fastest Growing Crypto Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
      </main>
      <div className="bg-black py-8 sm:py-4 text-center text-sm text-white hover:text-white">
      </div>
    </div>
  );
};

export default Home;