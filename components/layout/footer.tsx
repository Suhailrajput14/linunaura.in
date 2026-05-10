import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Shop: [
    { href: '/products?category=bedsheets', label: 'Bedsheets' },
    { href: '/products?category=king-size', label: 'King Size' },
    { href: '/products?category=queen-size', label: 'Queen Size' },
    { href: '/products?category=cotton', label: 'Cotton' },
    { href: '/products?category=silk-satin', label: 'Silk & Satin' },
    { href: '/products?category=printed', label: 'Printed' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Press' },
  ],
  Support: [
    { href: '#', label: 'Shipping & Returns' },
    { href: '#', label: 'FAQ' },
    { href: '#', label: 'Size Guide' },
    { href: '#', label: 'Care Instructions' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight">
              Linunaura
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Premium bedsheets crafted with the finest materials.
              Transform your bedroom into a sanctuary of comfort and style.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@linunaura.com
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Mumbai, India
              </span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">{title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Linunaura. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground">Terms</Link>
            <Link href="#" className="text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
