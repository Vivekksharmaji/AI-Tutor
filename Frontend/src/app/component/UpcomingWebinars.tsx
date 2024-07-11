'use client'

import Link from 'next/link';
import { HoverEffect } from "./ui/card-hover-effect";

const featuredWebinars = [
  {
    title: 'AI in Music Composition',
    description:
      'Explore how AI can assist in music composition, creating unique and innovative pieces.',
    link: '/',  
    slug: 'ai-in-music-composition',
    isFeatured: true,
  },
  {
    title: 'AI-Driven Music Theory Analysis',
    description:
      'Understand music theory with the help of AI-powered analysis tools.',
    link: '/',
    slug: 'ai-driven-music-theory-analysis',
    isFeatured: true,
  },
  {
    title: 'Personalized Instrument Practice with AI',
    description:
      'Leverage AI to get personalized practice routines and feedback for mastering your instrument.',
    link: '/',
    slug: 'personalized-instrument-practice-with-ai',
    isFeatured: true,
  },
  {
    title: 'AI Tools for Music Production',
    description:
      'Discover AI tools that can enhance your music production process.',
    link: '/',
    slug: 'ai-tools-for-music-production',
    isFeatured: true,
  },
  {
    title: 'Enhancing Live Performances with AI',
    description:
      'Learn how AI can improve your live performances through real-time feedback and adjustments.',
    link: '/',
    slug: 'enhancing-live-performances-with-ai',
    isFeatured: true,
  },
  {
    title: 'AI-Enhanced Digital Music Marketing',
    description:
      'Utilize AI to create effective digital marketing strategies for your music.',
    link: '/',
    slug: 'ai-enhanced-digital-music-marketing',
    isFeatured: true,
  },
];

const UpcomingWebinars = () => {

  return (
    <div className='py-12 bg-gray-900'>
      <div>
        <div className='text-center'>
          <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase'>FEATURED WEBINARS</h2>
          <p className='my-10 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl'>Enhance Your Musical Journey</p>
        </div>
      </div>
      <div className='px-10'>
        <HoverEffect items={featuredWebinars} />
      </div>
      <div className='text-center'>
        <Link href='/courses'>
          <button className='p-[3px] relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg' />
            <div className='px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent'>
              <p className='font-semibold text-lg'>View All Webinars</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingWebinars;
