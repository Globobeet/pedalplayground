import Canvas from './_components/Canvas';
import Header from './_components/Header';
import Sidebar from './_components/Sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <div className="relative flex flex-1 bg-gray-100">
        <Sidebar />
        <Canvas />
      </div>
    </>
  );
}
