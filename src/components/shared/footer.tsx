import { motion } from "framer-motion";
import Link from "next/link";
export default function Home() {
  return ( 
 
 <footer className="bg-blue-600 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6">
            Join our growing community of professionals and customers today.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/auth/signup?role=customer"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all"
            >
              Find Services
            </Link>
            <Link
              href="/auth/signup?role=vendor"
              className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-all"
            >
              Offer Services
            </Link>
          </div>
        </div>
      </footer>

      );
}
