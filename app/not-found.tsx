import { CommonPathnames } from '@/common/enums';
import { Link } from '@/components/ui';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">Oops!</h1>
      <p className="text-xl text-gray-700 mb-8">
        The page that you are looking for does not exist.
      </p>
      <Link href={CommonPathnames.Home} text="Home" />
    </div>
  );
}
