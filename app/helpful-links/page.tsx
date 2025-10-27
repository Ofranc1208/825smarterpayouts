import Link from 'next/link';
import dynamic from 'next/dynamic';

const LazyFABSpeedDial = dynamic(() => import('../components/FABSpeedDial'), { ssr: false });

export default function HelpfulLinks() {
  return (
    <>
      <div className="container py-5">
        <div className="card shadow-sm mx-auto" style={{ maxWidth: 540 }}>
          <div className="card-body text-center">
            <h2 className="mb-3 text-success fw-bold">Helpful Links</h2>
            <p className="mb-4">We couldn't find a page matching your search, but here are some helpful links to get you where you need to go:</p>
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item"><Link href="/pricing-calculator" className="text-success fw-semibold">Early Payout Calculator</Link></li>
              <li className="list-group-item"><Link href="/faqs" className="text-success fw-semibold">FAQs</Link></li>
              <li className="list-group-item"><Link href="/main" className="text-success fw-semibold">Home / Main Page</Link></li>
              <li className="list-group-item"><Link href="/contact" className="text-success fw-semibold">Contact Us</Link></li>
              <li className="list-group-item"><Link href="/testimonials" className="text-success fw-semibold">Testimonials</Link></li>
              <li className="list-group-item"><Link href="/resources" className="text-success fw-semibold">Resources</Link></li>
              <li className="list-group-item"><Link href="/about" className="text-success fw-semibold">About Us</Link></li>
            </ul>
            <p className="text-muted">Still need help? <Link href="/contact" className="text-decoration-underline">Contact our team</Link> and we'll be happy to assist you!</p>
          </div>
        </div>
      </div>
      <LazyFABSpeedDial />
    </>
  );
} 