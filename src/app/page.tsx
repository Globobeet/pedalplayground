import Canvas from './_components/Canvas';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-foreground relative flex flex-1">
        <Sidebar />
        <Canvas />
      </div>
    </>
  );
}
