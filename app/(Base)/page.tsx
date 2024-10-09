'use client';
import React from 'react';
import TextArea from '@/components/TextArea';
import UserSelectPallete from '@/components/UserSelectPallete';
import ResetTestButton from '@/components/reset-test-button';
import { MdLanguage } from 'react-icons/md';
import useTimer from '@/helpers/utils/useTimer';
import { userConfigStore, wordStore } from '@/store';
import useKeydownGetter from '@/helpers/utils/useKeydownGetter';
import { IoIosColorPalette } from 'react-icons/io';
import ThemeChoose from '@/components/expo/theme-choose';
import { calculateAccuracy } from '@/helpers/utils/util';

export default function HomePage() {
   const { time } = userConfigStore((state) => state);
   const { correctEntries, incorrectEntries } = wordStore((state) => state);
   const { timer, run, reset } = useTimer(1, time);
   useKeydownGetter({ run, reset });
   const accuracy = calculateAccuracy(correctEntries, incorrectEntries);
   return (
      <div>
         <UserSelectPallete reset={reset} />
         <div className="flex items-center justify-between mt-16 sm:px-10 mb-4">
            <div className="text-2xl font-medium font-poppins text-accent">
               {/* <button
                  className={`flex font-bold items-center justify-center rounded py-2 mt-5 text-input w-48 ${
                     isRunning || isExited ? 'bg-background' : 'bg-foreground'
                  }`}
                  onClick={run}
                  disabled={isRunning || isExited}
               >
                  start
               </button> */}
               <div>{timer}</div>
            </div>
            <div className="flex gap-3">
               <p className=" font-poppins text-white">
                  correct:{' '}
                  <span className="text-2xl font-bold font-poppins text-green-500">
                     {correctEntries}
                  </span>
               </p>
               <p className=" font-poppins text-white">
                  wrong:{' '}
                  <span className="text-2xl font-bold font-poppins text-red-500">
                     {incorrectEntries}
                  </span>
               </p>{' '}
               <p className=" font-poppins text-white">
                  accuracy:{' '}
                  <span className="text-2xl font-bold font-poppins text-accent">
                     {accuracy}%
                  </span>
               </p>
            </div>

            <div className="flex items-center justify-center tracking-widest lowercase text-input gap-x-3">
               <MdLanguage />
               <p className="cursor-pointer">english</p>
            </div>
            <div>
               <div className="flex items-center gap-1 cursor-pointer text-input">
                  <IoIosColorPalette />
                  <ThemeChoose />
               </div>
            </div>
         </div>
         <TextArea />
         <ResetTestButton reset={reset} />
      </div>
   );
}
