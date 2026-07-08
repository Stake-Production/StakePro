'use client'

import React, { useState, useEffect } from 'react'
import StakeLogo from '../component/StakeLogo'

const mirrorSites = [
  { name: 'Stake.com', domain: 'stake.com', status: 'active' },
  { name: 'Stake.ac', domain: 'stake.ac', status: 'inactive' },
  { name: 'Stake.games', domain: 'stake.games', status: 'active' },
  { name: 'Stake.bet', domain: 'stake.bet', status: 'active' },
  { name: 'Stake.pet', domain: 'stake.pet', status: 'active' },
  { name: 'Stake1001.com', domain: 'stake1001.com', status: 'inactive' },
  { name: 'Stake1002.com', domain: 'stake1002.com', status: 'inactive' },
  { name: 'Stake1003.com', domain: 'stake1003.com', status: 'inactive' },
  { name: 'Stake1017.com', domain: 'stake1017.com', status: 'inactive' },
  { name: 'Stake1022.com', domain: 'stake1022.com', status: 'inactive' },
  { name: 'Stake.mba', domain: 'stake.mba', status: 'inactive' },
  { name: 'Stake.jp', domain: 'stake.jp', status: 'active' },
  { name: 'Stake.bz', domain: 'stake.bz', status: 'active' },
  { name: 'Staketr.com', domain: 'staketr.com', status: 'inactive' },
  { name: 'Stake.ceo', domain: 'stake.ceo', status: 'active' },
  { name: 'Stake.krd', domain: 'stake.krd', status: 'active' },
  { name: 'Stake1039.com', domain: 'stake1039.com', status: 'inactive' },
]

export default function BonusPage() {
  const [bonusParam, setBonusParam] = useState('BoostWeekly270626')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const bonus = params.get('bonus')
      if (bonus) {
        setBonusParam(bonus)
      }
    }
  }, [])

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open('/signin', '_blank')
  }

  return (
    <div className="min-h-screen bg-[#1F2E3A] pt-16 pb-10 px-4 sm:px-6 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <StakeLogo className="w-[84px] h-auto text-white" />
        </div>

        {/* Header Title */}
        <h2 className="text-[21px] font-extrabold text-white text-center mb-8 tracking-tight">
          Claim Your Bonus
        </h2>

        {/* Main Stake.com Link Row */}
        <div className="flex items-center justify-between gap-4 mb-14">
          <span className="text-[17px] font-extrabold text-white leading-none pl-4">
            Stake.com
          </span>
          <div className="bg-[#101C24] border border-[#1C2C39] rounded-[4px] py-[10px] px-4 w-[240px] sm:w-[260px] text-center shadow-md">
            <a
              href="/signin"
              onClick={handleLinkClick}
              className="text-[#8E9CA7] text-[12px] leading-relaxed break-all hover:text-white transition-colors block font-medium"
            >
              https://stake.com/?<br />
              bonus={bonusParam}
            </a>
          </div>
        </div>

        {/* Intro Text */}
        <p className="text-center text-[#D1D5DB] text-[13px] leading-relaxed mb-8 px-2 font-medium">
          If you are looking for the bonus link for an official Stake.com mirror site, then use one of the following:
        </p>

        {/* Mirror Sites List */}
        <div className="space-y-[10px] mb-12">
          {mirrorSites.map((site) => (
            <div key={site.domain} className="flex items-center justify-between gap-4 animate-slide-in">
              <span className="text-white text-[14px] font-extrabold flex items-center gap-2 whitespace-nowrap">
                <span
                  className={`w-[7px] h-[7px] rounded-full inline-block flex-shrink-0 ${
                    site.status === 'active' ? 'bg-[#4BDE80]' : 'bg-[#FE2247]'
                  }`}
                ></span>
                {site.name}
              </span>
              <div className="bg-[#101C24] border border-[#1C2C39] rounded-[4px] py-[10px] px-4 w-[240px] sm:w-[260px] text-center shadow-sm hover:border-[#3861FB] transition-all">
                <a
                  href="/signin"
                  onClick={handleLinkClick}
                  className="text-[#8E9CA7] text-[11px] leading-relaxed break-all hover:text-white transition-colors block font-medium"
                >
                  https://{site.domain}/?<br />
                  bonus={bonusParam}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What is a mirror site? Section */}
        <div className="bg-[#101C24] border border-[#1C2C39] rounded-[6px] p-6 shadow-lg mb-6">
          <h3 className="text-white font-extrabold text-[16px] mb-3">
            What is a mirror site?
          </h3>
          <p className="text-[#8E9CA7] text-[12.5px] leading-[1.6] font-medium">
            A mirror is a replica of an already existing site, used to reduce network traffic or improve the availability of the original site. The mirrors listed are direct copies of Stake.com and were made available via different url&apos;s to assist players who are having issues connecting to Stake.
          </p>
        </div>
      </div>
    </div>
  )
}
