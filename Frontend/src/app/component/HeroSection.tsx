import Link from 'next/link';
import { Spotlight } from './ui/Spotlight';
import { Button } from "./ui/moving-border";

const herosection = () => {
  return (
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col justify-center items-center relative overflow-hidden mx-auto py-10 md:py-0'>
     <div className='p-4 relative z-10 w-full text-center'>
     <Spotlight
        className="-top-40 lg:left-1/3 left-10 md:left-60 md:-top-20 "
        fill="white"
      />
        <h1 className='mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400'>
           AI TUTOR 
        </h1>
       <p className='mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto'>
        AI-Powered Education Tutor tool
       </p>
       <div className='mt-20'>
        <Link href={"/courses"}>
            
            <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
       Explore Course
      </Button>
        </Link>

       </div>
     </div>
    </div>
  )
}

export default herosection
