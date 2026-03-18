"use client";
import Image from "next/image";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX, FiCalendar, FiFilm, FiExternalLink, FiArrowRight } from "react-icons/fi";
import { SiYoutube } from "react-icons/si";
import videosData from "../public/data/videos.json";
import Link from "next/link";

type ThumbnailEntry = {
  url: string;
  date: string;
};

type VideoType = {
  id: string;
  title: string;
  channelName: string;
  thumbnails: ThumbnailEntry[];
};

const videos = videosData as VideoType[];
const sortedVideos = videos.sort((a, b) => a.id.localeCompare(b.id));

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  return (
    <Dialog.Root open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center">
            <h1 className="text-6xl font-black tracking-tighter mb-6 italic">
              Thumb<span className="logo-gradient">Back</span>
            </h1>
            <p className="text-slate-500 text-xl max-w-lg mx-auto font-semibold leading-relaxed">
              Track every thumbnail change for any video and discover what works.
            </p>
            <div className="mt-8 h-1 w-12 bg-indigo-600 mx-auto rounded-full" />
          </header>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedVideos.map((video) => (
            <VideoCard key={video.id} video={video} onSelect={setSelectedVideo} />
          ))}
          </div>
        </div>
      </main>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50 animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl h-[85vh] bg-white rounded-4xl shadow-xl z-50 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="px-6 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
    <div className="flex items-start gap-4 pr-12 sm:pr-0">
      <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
        <FiFilm size={24} />
      </div>
      <div>
        <Dialog.Title className="text-xl font-bold line-clamp-2 sm:line-clamp-1 text-slate-900">
          {selectedVideo?.title}
        </Dialog.Title>
        <Dialog.Description className="mt-0.5 flex items-baseline gap-1 cursor-default select-none">
          <span className="text-slate-300 font-light text-sm">@</span>
          <span className="text-slate-500 font-bold text-[11px] uppercase tracking-wider">
            {selectedVideo?.channelName}
          </span>
        </Dialog.Description>
      </div>
    </div>

    <div className="flex items-center justify-between sm:justify-end gap-2">
      <Link 
        href={`https://www.youtube.com/watch?v=${selectedVideo?.id}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-grow sm:flex-grow-0 whitespace-nowrap flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 font-bold text-sm"
      >
        <SiYoutube size={20} />
        <span>Watch Video</span>
        <FiExternalLink size={14} />
      </Link>
      
      {/* デスクトップ用区切り線 (モバイルでは隠す) */}
      <div className="hidden sm:block w-px h-8 bg-slate-100 mx-2" />

      {/* 閉じるボタン - モバイルでは右上に絶対配置 */}
      <div className="absolute top-6 right-6 sm:static">
        <Dialog.Close className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all bg-white/50 backdrop-blur-sm">
          <FiX size={24} />
        </Dialog.Close>
      </div>
    </div>

  </div>
</div>

          <div className="flex-grow overflow-y-auto p-8 sm:p-12 bg-[#FBFCFE]">
            <div className="relative max-w-2xl mx-auto pl-10 border-l-2 border-slate-100 space-y-20">
              {selectedVideo?.thumbnails.map((thumb, index) => (
                <div key={index} className="relative group/item">
                  <div className={`absolute -left-[51px] top-0 h-5 w-5 rounded-full border-[3px] border-[#FBFCFE] ring-4 ring-transparent ${index === 0 ? 'bg-indigo-600 ring-indigo-100' : 'bg-slate-300'}`} />
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md ${index === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {index === 0 ? 'Current' : `Version ${selectedVideo.thumbnails.length - index}`}
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-tighter">
                        <FiCalendar /> {thumb.date}
                      </div>
                    </div>
                    <div className="group/img relative aspect-video overflow-hidden shadow-lg border border-slate-200 bg-white transition-transform hover:scale-[1.02] duration-500">
                      <Image src={thumb.url} alt="Thumbnail" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function VideoCard({ video, onSelect }: { video: VideoType; onSelect: (video: VideoType) => void }) {
  return (
    <button
      onClick={() => onSelect(video)}
      className="group relative flex flex-col h-full text-left bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2.5 transition-all duration-500 ease-out"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={video.thumbnails[0].url}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="absolute bottom-4 right-4 px-3.5 py-1.5 text-[11px] font-bold text-slate-800 bg-white/95 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 flex items-center gap-1.5">
          <FiCalendar /> {video.thumbnails.length} versions
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5">{video.channelName}</span>
        <h2 className="text-lg font-extrabold text-slate-950 leading-snug group-hover:text-indigo-700 transition-colors duration-300 line-clamp-2">
          {video.title}
        </h2>

        <div className="mt-auto pt-7 flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last tracked
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {video.thumbnails[0].date}
            </span>
          </div>

          <div className="flex-shrink-0 h-11 w-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-inner group-hover:shadow-indigo-200 group-hover:rotate-[-10deg]">
            <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </button>
  );
}