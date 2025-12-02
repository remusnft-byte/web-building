import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProjectsPage() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white relative">
            <Link href="/" className="absolute top-8 left-8 text-black hover:scale-110 transition-transform z-50 flex items-center gap-2">
                <ArrowLeft size={32} />
                <span className="text-xl font-bold font-sans">Back</span>
            </Link>
            <h1 className="text-4xl font-bold text-black font-sans">Featured Projects</h1>
        </div>
    );
}
