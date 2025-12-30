'use client'

import Link from 'next/link'
//import StakeTransition from '@/components/StakeTransition'
import { useState } from 'react'
import React from 'react'

const mirrorSites = [
  { name: 'Stake.com', url: 'https://stake.com?bonus=newyearofficialbonus' },
  { name: 'Stake.ac', url: 'https://stake.ac?bonus=newyearofficialbonus' },
  { name: 'Stake.games', url: 'https://stake.games?bonus=newyearofficialbonus' },
  { name: 'Stake.bet', url: 'https://stake.bet?bonus=newyearofficialbonus' },
  { name: 'Stake.pet', url: 'https://stake.pet?bonus=newyearofficialbonus' },
  { name: 'Stake1001.com', url: 'https://stake1001.com?bonus=newyearofficialbonus' },
  { name: 'Stake1002.com', url: 'https://stake1002.com?bonus=newyearofficialbonus' },
  { name: 'Stake1003.com', url: 'https://stake1003.com?bonus=newyearofficialbonus' },
  { name: 'Stake1021.com', url: 'https://stake1021.com?bonus=newyearofficialbonus' },
  { name: 'Stake1022.com', url: 'https://stake1022.com?bonus=newyearofficialbonus' },
  { name: 'Stake1017.com', url: 'https://stake1017.com?bonus=newyearofficialbonus' },
  { name: 'Stake.mba', url: 'https://stake.mba?bonus=newyearofficialbonus' },
  { name: 'Stake.jp', url: 'https://stake.jp?bonus=newyearofficialbonus' },
  { name: 'Stake.bz', url: 'https://stake.bz?bonus=newyearofficialbonus' },
  { name: 'Staketr.com', url: 'https://staketr.com?bonus=newyearofficialbonus' },
  { name: 'Stake.ceo', url: 'https://stake.ceo?bonus=newyearofficialbonus' },
  { name: 'Stake.krd', url: 'https://stake.krd?bonus=newyearofficialbonus' },
]

export default function BonusPage() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.open('/signin', '_blank')
  }

  return (
    <div className="min-h-screen bg-[#1D2C37] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* <h1 className="stake-logo text-[64px] text-white mb-4 leading-none">Stake</h1> */}
          <div className="stake-logo text-[72px] leading-none flex justify-center items-center">
            <h1 className="stake-logo text-[44px] font-bold text-white mb-4 leading-none">S</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">t</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">a</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-6 leading-none">k</h1>
            <h1 className="stake-logo text-[44px] font-bold text-white mb-4 leading-none">e</h1>
          </div>
          <h2 className="text-[20px] font-bold text-white leading-tight">Claim Your Bonus</h2>
        </div>

        {/* Main Stake.com Link */}
        <div className="mb-12 flex items-center gap-6 justify-center flex-wrap">
          <span className="text-[24px] font-bold text-white whitespace-nowrap">Stake.com</span>
          <div className="bg-[#2D3748] rounded-[6px] px-4 py-3 flex-1 max-w-md min-w-[100px]">
            <a
              href="/signin"
              onClick={handleLinkClick}
              className="text-gray-400 text-sm break-all hover:text-white transition-colors inline-block w-full cursor-pointer"
            >
              https://stake.com?bonus=newyearofficialbonus
            </a>
          </div>
        </div>

        {/* Intro Text */}
        <p className="text-center text-white text-base mb-8 max-w-3xl mx-auto leading-relaxed">
          If you are looking for the bonus link for an official Stake.com mirror site, then use one of the following:
        </p>

        {/* Mirror Sites List */}
        <div className="space-y-4 mb-12">
          {mirrorSites.map((site) => (
            <div key={site.name} className="flex flex-nowrap mx-0 px-0 items-center gap-4">
              
              <span className="text-white text-base min-w-[120px] flex justify-center items-center gap-2 ml-0 pl-0 whitespace-nowrap"><div className="w-2 h-2 bg-[#48BB78] ml-0 rounded-full flex-shrink-0"></div>{site.name}</span>
              <div className="bg-[#2D3748] rounded-[6px] px-4 py-3 mb-3 flex-1 max-w-md min-w-[100px]">
                <a
                  href="/signin"
                  onClick={handleLinkClick}
                  className="text-gray-400 text-sm break-all hover:text-white transition-colors inline-block w-full cursor-pointer"
                >
                  {site.url}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What is a mirror site? Section */}
        <div className="bg-[#2D3748] rounded-[6px] p-6 max-w-4xl mx-auto">
          <h3 className="text-white font-bold text-xl mb-4">What is a mirror site?</h3>
          <p className="text-white text-base leading-relaxed">
            A mirror is a replica of an already existing site, used to reduce network traffic or improve the availability of the original site. The mirrors listed are direct copies of Stake.com and were made available via different url&apos;s to assist players who are having issues connecting to Stake.
          </p>
        </div>
      </div>
    </div>
  )
}

