// // garud-tata\app\components\PRBlog.tsx
// "use client";

// import Link from "next/link";
// import { ArrowRight, Calendar, MapPin, Newspaper } from "lucide-react";
// import { prBlogData } from "@/app/config/prBlogData";
// export default function PRBlog() {
//   return (
//     <section
//       id="pr-blog"
//       className="w-full bg-white py-16 md:py-20 lg:py-24"
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mx-auto mb-12 max-w-3xl text-center">
//           <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
//             <Newspaper className="h-4 w-4" />
//             PR & Blog
//           </div>

//           <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//             Latest News &{" "}
//             <span className="text-red-600">PR Updates</span>
//           </h2>

//           <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
//             Stay updated with the latest Tata Motors news, vehicle launches,
//             festive-season updates and automotive insights from Garud Tata
//             Motors.
//           </p>
//         </div>

//         {/* Articles */}
//         <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
//           {prBlogData.map((article) => (
//             <article
//               key={article.id}
//               className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
//             >
//               {/* Top Accent */}
//               <div className="h-1.5 w-full bg-red-600" />

//               <div className="flex flex-1 flex-col p-6">
//                 {/* Category */}
//                 <div className="mb-5 flex items-center justify-between">
//                   <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-600">
//                     {article.category}
//                   </span>

//                   <span className="text-xs font-medium text-gray-500">
//                     Garud Tata Motors
//                   </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-xl font-bold leading-8 text-gray-900 transition-colors duration-300 group-hover:text-red-600">
//                   {article.title}
//                 </h3>

//                 {/* Meta */}
//                 <div className="mt-5 flex flex-wrap gap-4 text-sm text-gray-500">
//                   <div className="flex items-center gap-1.5">
//                     <Calendar className="h-4 w-4" />
//                     <span>{article.date}</span>
//                   </div>

//                   <div className="flex items-center gap-1.5">
//                     <MapPin className="h-4 w-4" />
//                     <span>{article.location}</span>
//                   </div>
//                 </div>

//                 {/* Excerpt */}
//                 <p className="mt-5 line-clamp-4 text-sm leading-6 text-gray-600">
//                   {article.excerpt}
//                 </p>

//                 {/* Read More */}
//                 <div className="mt-auto pt-7">
//                   <Link
//                     href={`/pr-blog/${article.slug}`}
//                     className="inline-flex items-center gap-2 text-sm font-bold text-red-600 transition-all duration-300 hover:gap-3"
//                   >
//                     Read Full Article
//                     <ArrowRight className="h-4 w-4" />
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }











"use client";

import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Newspaper } from "lucide-react";
import { prBlogData } from "@/app/config/prBlogData";

export default function PRBlog() {
  return (
    <section id="pr-blog" className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto mb-14 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-3 py-1.5">
            <Newspaper className="h-3.5 w-3.5 text-[#0055A5]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#0055A5]">
              PR & Blog
            </span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Latest News &{" "}
            <span className="text-[#0055A5]">PR Updates</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-500">
            Stay updated with the latest Tata Motors news, vehicle launches,
            festive-season updates and automotive insights from Garud Tata Motors.
          </p>
        </div>

        {/* ── Article grid ── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prBlogData.map((article) => (
            <article
              key={article.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,85,165,0.10)] hover:border-[#0055A5]/20"
            >
              {/* Top accent line — same blue as navbar */}
              <div className="h-[3px] w-full bg-[#0055A5]" />

              <div className="flex flex-1 flex-col p-6">

                {/* Category + author */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-[#0055A5]/[0.08] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0055A5]">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400">
                    Garud Tata Motors
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold leading-6 text-gray-900 transition-colors duration-200 group-hover:text-[#0055A5]">
                  {article.title}
                </h3>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="h-3.5 w-3.5 text-[#0055A5]/60" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <MapPin className="h-3.5 w-3.5 text-[#0055A5]/60" />
                    {article.location}
                  </div>
                </div>

                {/* Excerpt */}
                <p className="mt-4 line-clamp-3 text-[13px] leading-6 text-gray-500">
                  {article.excerpt}
                </p>

                {/* Read more — mirrors navbar link style */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link
                    href={`/pr-blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0055A5] transition-all duration-200 hover:gap-2.5"
                  >
                    Read Full Article
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}