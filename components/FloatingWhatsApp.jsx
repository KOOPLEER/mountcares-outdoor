'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, Compass, Tent, Utensils } from 'lucide-react';

export default function LandingPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const featuredProducts = [
    // ... your products array
  ];

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col selection:bg-brand-cyan selection:text-white">
      {/* Your Navbar, Hero, and other sections */}
    </div>
  );
}

// ❌ Make sure there are NO other "export default" lines below this point in the file.