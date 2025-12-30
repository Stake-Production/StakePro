'use client'


import BonusPage from './bonus/page'

export default function Home() {
  // const router = useRouter()

  // useEffect(() => {
  //   // Simulate loading time
  //   const timer = setTimeout(() => {
  //     router.push('/bonus')
  //   }, 2000)

  //   return () => clearTimeout(timer)
  // }, [router])

  return (
    // <div className="fixed inset-0 bg-[#21262C] flex items-center justify-center">
    //   <div className="text-center">
    //     <div className="stake-logo text-[72px] leading-none">
    //       <span className="text-[#4A525C]">Stak</span>
    //       <span className="text-white inline-flex items-baseline">
    //         e
    //         <svg
    //           className="ml-1 w-4 h-4 animate-spin inline-block align-baseline"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //         >
    //           <circle
    //             className="opacity-25"
    //             cx="12"
    //             cy="12"
    //             r="10"
    //             stroke="currentColor"
    //             strokeWidth="4"
    //           ></circle>
    //           <path
    //             className="opacity-75"
    //             fill="currentColor"
    //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    //           ></path>
    //         </svg>
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div>
      <BonusPage />
    </div>
  )
}
