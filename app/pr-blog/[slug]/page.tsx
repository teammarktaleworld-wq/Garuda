
// // garud-tata\app\pr-blog\[slug]\page.tsx
// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import Link from "next/link";
// import { ArrowLeft, Calendar, MapPin } from "lucide-react";

// import { prBlogData } from '@/app/config/prBlogData';
// import { getPRBlogBySlug } from '@/app/config/prBlogData';

// type PageProps = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// export function generateStaticParams() {
//   return prBlogData.map((article) => ({
//     slug: article.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const article = getPRBlogBySlug(slug);

//   if (!article) {
//     return {
//       title: "Article Not Found | Garud Tata Motors",
//     };
//   }

//   return {
//     title: `${article.title} | Garud Tata Motors`,
//     description: article.excerpt,
//     alternates: {
//       canonical: `/pr-blog/${article.slug}`,
//     },
//     openGraph: {
//       title: article.title,
//       description: article.excerpt,
//       type: "article",
//       publishedTime: "2026-09-01",
//       authors: ["Garud Tata Motors"],
//     },
//   };
// }

// export default async function PRBlogArticlePage({
//   params,
// }: PageProps) {
//   const { slug } = await params;

//   const article = getPRBlogBySlug(slug);

//   if (!article) {
//     notFound();
//   }

//   const paragraphs = article.content
//     .trim()
//     .split(/\n\s*\n/)
//     .map((item) => item.trim())
//     .filter(Boolean);

//   return (
//     <main className="min-h-screen bg-white">
//       {/* Hero */}
//       <section className="border-b border-gray-200 bg-gray-50">
//         <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
//           <Link
//             href="/pr-blog"
//             className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-red-600"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to PR & Blog
//           </Link>

//           <div className="mb-5">
//             <span className="rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600">
//               {article.category}
//             </span>
//           </div>

//           <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
//             {article.title}
//           </h1>

//           <div className="mt-7 flex flex-wrap gap-5 text-sm text-gray-500">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-4 w-4" />
//               {article.date}
//             </div>

//             <div className="flex items-center gap-2">
//               <MapPin className="h-4 w-4" />
//               {article.location}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Article */}
//       <section className="py-12 sm:py-16 lg:py-20">
//         <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
//           <div className="mb-10 rounded-2xl border border-gray-200 bg-gray-50 p-6">
//             <p className="text-base font-medium leading-7 text-gray-700">
//               {article.excerpt}
//             </p>
//           </div>

//           <article className="prose prose-gray max-w-none">
//             {paragraphs.map((paragraph, index) => {
//               const isHeading =
//                 paragraph.length < 90 &&
//                 !paragraph.endsWith(".") &&
//                 !paragraph.startsWith("•");

//               if (isHeading) {
//                 return (
//                   <h2
//                     key={index}
//                     className="mb-4 mt-10 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"
//                   >
//                     {paragraph}
//                   </h2>
//                 );
//               }

//               if (paragraph.startsWith("•")) {
//                 const items = paragraph
//                   .split("\n")
//                   .map((item) => item.replace(/^•\s*/, "").trim())
//                   .filter(Boolean);

//                 return (
//                   <ul
//                     key={index}
//                     className="my-5 list-disc space-y-2 pl-6 text-gray-700"
//                   >
//                     {items.map((item, itemIndex) => (
//                       <li key={itemIndex}>{item}</li>
//                     ))}
//                   </ul>
//                 );
//               }

//               return (
//                 <p
//                   key={index}
//                   className="mb-5 text-base leading-8 text-gray-700"
//                 >
//                   {paragraph}
//                 </p>
//               );
//             })}
//           </article>

//           {/* CTA */}
//           <div className="mt-14 rounded-2xl bg-gray-900 p-7 text-white sm:p-10">
//             <h2 className="text-2xl font-bold sm:text-3xl">
//               Explore Tata Cars with Garud Tata Motors
//             </h2>

//             <p className="mt-3 max-w-2xl leading-7 text-gray-300">
//               Visit your nearest Garud Tata Motors showroom to explore Tata
//               cars, enquire about available models and book a test drive.
//             </p>

//             <div className="mt-7 flex flex-col gap-3 sm:flex-row">
//               <a
//                 href="tel:9217371211"
//                 className="inline-flex items-center justify-center rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
//               >
//                 Call Garud Tata Motors
//               </a>

//               <Link
//                 href="/"
//                 className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
//               >
//                 Explore Tata Cars
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }


















// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import Link from "next/link";
// import { ArrowLeft, Calendar, MapPin, Phone, MessageCircle, ChevronRight } from "lucide-react";

// import { prBlogData, getPRBlogBySlug } from "@/app/config/prBlogData";

// type PageProps = {
//   params: Promise<{ slug: string }>;
// };

// export function generateStaticParams() {
//   return prBlogData.map((article) => ({ slug: article.slug }));
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const article = getPRBlogBySlug(slug);
//   if (!article) return { title: "Article Not Found | Garud Tata Motors" };
//   return {
//     title: `${article.title} | Garud Tata Motors`,
//     description: article.excerpt,
//     alternates: { canonical: `/pr-blog/${article.slug}` },
//     openGraph: {
//       title: article.title,
//       description: article.excerpt,
//       type: "article",
//       publishedTime: "2026-09-01",
//       authors: ["Garud Tata Motors"],
//     },
//   };
// }

// export default async function PRBlogArticlePage({ params }: PageProps) {
//   const { slug } = await params;
//   const article = getPRBlogBySlug(slug);
//   if (!article) notFound();

//   const paragraphs = article.content
//     .trim()
//     .split(/\n\s*\n/)
//     .map((p) => p.trim())
//     .filter(Boolean);

//   return (
//     <main className="min-h-screen bg-white">

//       {/* ══════════════════════════════════════════════════════
//           HERO — pt-[76px] clears the fixed navbar
//       ══════════════════════════════════════════════════════ */}
//       <section className="bg-white border-b border-gray-100 pt-[76px]">
//         <div className="mx-auto max-w-5xl px-4 pt-10 pb-12 sm:px-6 lg:px-8">

//           {/* Back */}
//           <Link
//             href="/pr-blog"
//             className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-gray-400 hover:text-[#0055A5] transition-colors group"
//           >
//             <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
//             PR & Blog
//           </Link>

//           {/* Category badge — exact same shape as navbar badge */}
//           <div className="mb-5">
//             <span className="inline-flex items-center rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0055A5]">
//               {article.category}
//             </span>
//           </div>

//           {/* Title */}
//           <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
//             {article.title}
//           </h1>

//           {/* Meta */}
//           <div className="mt-5 flex flex-wrap gap-5">
//             <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
//               <Calendar className="h-4 w-4 text-[#0055A5]/60" />
//               {article.date}
//             </div>
//             <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
//               <MapPin className="h-4 w-4 text-[#0055A5]/60" />
//               {article.location}
//             </div>
//           </div>

//           {/* Blue rule — echoes navbar bottom border accent */}
//           <div className="mt-8 h-[2px] w-12 rounded-full bg-[#0055A5]" />
//         </div>
//       </section>

//       {/* ══════════════════════════════════════════════════════
//           ARTICLE BODY
//       ══════════════════════════════════════════════════════ */}
//       <section className="py-12 sm:py-16 lg:py-20 bg-white">
//         <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

//           {/* Excerpt card — matches showroom switcher dropdown bg */}
//           <div className="mb-10 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] px-6 py-5">
//             <p className="text-[15px] font-medium leading-7 text-gray-700">
//               {article.excerpt}
//             </p>
//           </div>

//           {/* Content */}
//           <article className="space-y-1">
//             {paragraphs.map((paragraph, index) => {
//               const isHeading =
//                 paragraph.length < 90 &&
//                 !paragraph.endsWith(".") &&
//                 !paragraph.startsWith("•");

//               if (isHeading) {
//                 return (
//                   <h2
//                     key={index}
//                     className="!mt-10 !mb-3 flex items-start gap-3 text-[18px] font-bold leading-snug text-gray-900"
//                   >
//                     {/* Left rule — same blue as navbar pill active state */}
//                     <span className="mt-1 flex-shrink-0 w-[3px] h-5 rounded-full bg-[#0055A5]" />
//                     {paragraph}
//                   </h2>
//                 );
//               }

//               if (paragraph.startsWith("•")) {
//                 const items = paragraph
//                   .split("\n")
//                   .map((item) => item.replace(/^•\s*/, "").trim())
//                   .filter(Boolean);

//                 return (
//                   <ul key={index} className="!my-5 space-y-2 pl-1">
//                     {items.map((item, i) => (
//                       <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-gray-600">
//                         <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#0055A5] flex-shrink-0" />
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 );
//               }

//               return (
//                 <p key={index} className="!mb-5 text-[15px] leading-8 text-gray-600">
//                   {paragraph}
//                 </p>
//               );
//             })}
//           </article>

//           {/* ══════════════════════════════════════════════════
//               CTA — mirrors navbar desktop actions strip
//           ══════════════════════════════════════════════════ */}
//           <div className="mt-14 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] overflow-hidden">

//             {/* Blue top strip — same as card accent */}
//             <div className="h-[3px] bg-[#0055A5]" />

//             <div className="p-7 sm:p-8">
//               <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0055A5]/60 mb-2">
//                 Garud Tata Motors · Authorised Dealer
//               </p>

//               <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
//                 Explore Tata Cars Across Delhi-NCR
//               </h2>

//               <p className="mt-2 text-[14px] leading-6 text-gray-500">
//                 Visit your nearest showroom — Palam, Narela or Najafgarh — to
//                 compare models and book a test drive.
//               </p>

//               {/* Showroom pills — same shape as navbar city badge */}
//               <div className="mt-5 flex flex-wrap gap-2">
//                 {[
//                   { label: "Palam",     href: "/Tata-Motors-Palam" },
//                   { label: "Narela",    href: "/Tata-Motors-Narela" },
//                   { label: "Najafgarh", href: "/Tata-Motors-Najafgarh" },
//                 ].map((s) => (
//                   <Link
//                     key={s.href}
//                     href={s.href}
//                     className="inline-flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#0055A5] hover:bg-[#0055A5]/[0.06] transition-colors"
//                   >
//                     <MapPin size={10} strokeWidth={2.5} />
//                     {s.label}
//                     <ChevronRight size={10} strokeWidth={2.5} />
//                   </Link>
//                 ))}
//               </div>

//               {/* Action buttons — mirror navbar desktop actions */}
//               <div className="mt-6 flex flex-col gap-3 sm:flex-row">

//                 {/* Call — same pill style as navbar phone button */}
//                 <a
//                   href="tel:+919217371211"
//                   className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <Phone size={14} className="text-[#0055A5]" strokeWidth={2.5} />
//                   <span>
//                     <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1 font-bold">Sales</span>
//                     +91 92173 71211
//                   </span>
//                 </a>

//                 {/* WhatsApp — same green pill as navbar */}
//                 <a
//                   href="https://wa.me/919217371211?text=Hello%21%20I%20would%20like%20to%20enquire%20about%20a%20new%20Tata%20car%20at%20Garud%20Tata."
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2.5 text-[13px] font-semibold text-green-700 shadow-sm hover:bg-green-100 transition-colors"
//                 >
//                   <MessageCircle size={14} strokeWidth={2.5} />
//                   WhatsApp
//                 </a>

//                 {/* Get Offer — same solid blue CTA as navbar */}
//                 <Link
//                   href="/"
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0055A5] hover:bg-[#004488] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] transition-all"
//                 >
//                   Explore Cars
//                   <ArrowLeft size={14} strokeWidth={2.5} className="rotate-180" />
//                 </Link>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// }













// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Calendar,
//   MapPin,
//   Phone,
//   MessageCircle,
//   ChevronRight,
// } from "lucide-react";

// import { prBlogData, getPRBlogBySlug } from "@/app/config/prBlogData";

// type PageProps = {
//   params: Promise<{ slug: string }>;
// };

// export function generateStaticParams() {
//   return prBlogData.map((article) => ({
//     slug: article.slug,
//   }));
// }

// export async function generateMetadata({
//   params,
// }: PageProps): Promise<Metadata> {
//   const { slug } = await params;
//   const article = getPRBlogBySlug(slug);

//   if (!article) {
//     return {
//       title: "Article Not Found | Garud Tata Motors",
//     };
//   }

//   return {
//     title: `${article.title} | Garud Tata Motors`,
//     description: article.excerpt,

//     alternates: {
//       canonical: `/pr-blog/${article.slug}`,
//     },

//     openGraph: {
//       title: article.title,
//       description: article.excerpt,
//       type: "article",
//       publishedTime: "2026-09-01",
//       authors: ["Garud Tata Motors"],
//       images: [
//         {
//           url: article.image,
//           alt: article.title,
//         },
//       ],
//     },
//   };
// }

// export default async function PRBlogArticlePage({
//   params,
// }: PageProps) {
//   const { slug } = await params;

//   const article = getPRBlogBySlug(slug);

//   if (!article) {
//     notFound();
//   }

//   const paragraphs = article.content
//     .trim()
//     .split(/\n\s*\n/)
//     .map((p) => p.trim())
//     .filter(Boolean);

//   return (
//     <main className="min-h-screen bg-white">

//       {/* =====================================================
//           HERO
//       ===================================================== */}
//       <section className="bg-white border-b border-gray-100 pt-[76px]">
//         <div className="mx-auto max-w-5xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">

//           {/* Back */}
//           <Link
//             href="/pr-blog"
//             className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-gray-400 hover:text-[#0055A5] transition-colors group"
//           >
//             <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />

//             PR & Blog
//           </Link>

//           {/* Category */}
//           <div className="mb-5">
//             <span className="inline-flex items-center rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0055A5]">
//               {article.category}
//             </span>
//           </div>

//           {/* Title */}
//           <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
//             {article.title}
//           </h1>

//           {/* Meta */}
//           <div className="mt-5 flex flex-wrap gap-5">

//             <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
//               <Calendar className="h-4 w-4 text-[#0055A5]/60" />

//               {article.date}
//             </div>

//             <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
//               <MapPin className="h-4 w-4 text-[#0055A5]/60" />

//               {article.location}
//             </div>

//           </div>

//           {/* Blue rule */}
//           <div className="mt-8 h-[2px] w-12 rounded-full bg-[#0055A5]" />
//         </div>

//         {/* =====================================================
//             COVER IMAGE
//         ===================================================== */}
//         <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
//           <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">

//             <img
//               src={article.image}
//               alt={article.title}
//               className="w-full h-[260px] sm:h-[360px] lg:h-[420px] object-cover"
//             />

//           </div>
//         </div>

//         {/* Bottom spacing */}
//         <div className="pb-12" />
//       </section>

//       {/* =====================================================
//           ARTICLE BODY
//       ===================================================== */}
//       <section className="py-12 sm:py-16 lg:py-20 bg-white">
//         <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

//           {/* Excerpt */}
//           <div className="mb-10 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] px-6 py-5">
//             <p className="text-[15px] font-medium leading-7 text-gray-700">
//               {article.excerpt}
//             </p>
//           </div>

//           {/* =================================================
//               CONTENT
//           ================================================= */}
//           <article className="space-y-1">

//             {paragraphs.map((paragraph, index) => {

//               const isHeading =
//                 paragraph.length < 90 &&
//                 !paragraph.endsWith(".") &&
//                 !paragraph.startsWith("•");

//               {/* Heading */}
//               if (isHeading) {
//                 return (
//                   <h2
//                     key={index}
//                     className="!mt-10 !mb-3 flex items-start gap-3 text-[18px] font-bold leading-snug text-gray-900"
//                   >
//                     <span className="mt-1 flex-shrink-0 w-[3px] h-5 rounded-full bg-[#0055A5]" />

//                     {paragraph}
//                   </h2>
//                 );
//               }

//               {/* Bullet list */}
//               if (paragraph.startsWith("•")) {

//                 const items = paragraph
//                   .split("\n")
//                   .map((item) =>
//                     item.replace(/^•\s*/, "").trim()
//                   )
//                   .filter(Boolean);

//                 return (
//                   <ul
//                     key={index}
//                     className="!my-5 space-y-2 pl-1"
//                   >
//                     {items.map((item, i) => (
//                       <li
//                         key={i}
//                         className="flex items-start gap-3 text-[15px] leading-7 text-gray-600"
//                       >
//                         <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#0055A5] flex-shrink-0" />

//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 );
//               }

//               {/* Paragraph */}
//               return (
//                 <p
//                   key={index}
//                   className="!mb-5 text-[15px] leading-8 text-gray-600"
//                 >
//                   {paragraph}
//                 </p>
//               );
//             })}

//           </article>

//           {/* =================================================
//               CTA CARD
//           ================================================= */}
//           <div className="mt-14 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] overflow-hidden">

//             {/* Top line */}
//             <div className="h-[3px] bg-[#0055A5]" />

//             <div className="p-7 sm:p-8">

//               <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0055A5]/60 mb-2">
//                 Garud Tata Motors · Authorised Dealer
//               </p>

//               <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
//                 Explore Tata Cars Across Delhi-NCR
//               </h2>

//               <p className="mt-2 text-[14px] leading-6 text-gray-500">
//                 Visit your nearest showroom — Palam, Narela or Najafgarh —
//                 to compare models and book a test drive.
//               </p>

//               {/* =================================================
//                   SHOWROOM PILLS
//               ================================================= */}
//               <div className="mt-5 flex flex-wrap gap-2">

//                 {[
//                   {
//                     label: "Palam",
//                     href: "/Tata-Motors-Palam",
//                   },
//                   {
//                     label: "Narela",
//                     href: "/Tata-Motors-Narela",
//                   },
//                   {
//                     label: "Najafgarh",
//                     href: "/Tata-Motors-Najafgarh",
//                   },
//                 ].map((s) => (
//                   <Link
//                     key={s.href}
//                     href={s.href}
//                     className="inline-flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#0055A5] hover:bg-[#0055A5]/[0.06] transition-colors"
//                   >
//                     <MapPin
//                       size={10}
//                       strokeWidth={2.5}
//                     />

//                     {s.label}

//                     <ChevronRight
//                       size={10}
//                       strokeWidth={2.5}
//                     />
//                   </Link>
//                 ))}

//               </div>

//               {/* =================================================
//                   ACTION BUTTONS
//               ================================================= */}
//               <div className="mt-6 flex flex-col gap-3 sm:flex-row">

//                 {/* Sales */}
//                 <a
//                   href="tel:+919217371211"
//                   className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
//                 >
//                   <Phone
//                     size={14}
//                     className="text-[#0055A5]"
//                     strokeWidth={2.5}
//                   />

//                   <span>
//                     <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1 font-bold">
//                       Sales
//                     </span>

//                     +91 92173 71211
//                   </span>
//                 </a>

//                 {/* WhatsApp */}
//                 <a
//                   href="https://wa.me/919217371211?text=Hello%21%20I%20would%20like%20to%20enquire%20about%20a%20new%20Tata%20car%20at%20Garud%20Tata."
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2.5 text-[13px] font-semibold text-green-700 shadow-sm hover:bg-green-100 transition-colors"
//                 >
//                   <MessageCircle
//                     size={14}
//                     strokeWidth={2.5}
//                   />

//                   WhatsApp
//                 </a>

//                 {/* Explore Cars */}
//                 <Link
//                   href="/"
//                   className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0055A5] hover:bg-[#004488] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] transition-all"
//                 >
//                   Explore Cars

//                   <ArrowRight
//                     size={14}
//                     strokeWidth={2.5}
//                   />
//                 </Link>

//               </div>

//             </div>
//           </div>

//         </div>
//       </section>

//     </main>
//   );
// }





















import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

import { prBlogData, getPRBlogBySlug } from "@/app/config/prBlogData";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return prBlogData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getPRBlogBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Garud Tata Motors",
    };
  }

  return {
    title: `${article.title} | Garud Tata Motors`,
    description: article.excerpt,

    alternates: {
      canonical: `/pr-blog/${article.slug}`,
    },

    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: "2026-09-01",
      authors: ["Garud Tata Motors"],
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function PRBlogArticlePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const article = getPRBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  const paragraphs = article.content
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="bg-white border-b border-gray-100 pt-[76px]">
        <div className="mx-auto max-w-5xl px-4 pt-10 pb-0 sm:px-6 lg:px-8">

          {/* Back */}
          <Link
            href="/pr-blog"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-gray-400 hover:text-[#0055A5] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />

            PR & Blog
          </Link>

          {/* Category */}
          <div className="mb-5">
            <span className="inline-flex items-center rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0055A5]">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap gap-5">

            <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
              <Calendar className="h-4 w-4 text-[#0055A5]/60" />

              {article.date}
            </div>

            <div className="flex items-center gap-1.5 text-[13px] text-gray-400">
              <MapPin className="h-4 w-4 text-[#0055A5]/60" />

              {article.location}
            </div>

          </div>

          {/* Blue rule */}
          <div className="mt-8 h-[2px] w-12 rounded-full bg-[#0055A5]" />
        </div>

        {/* =====================================================
            COVER IMAGE
        ===================================================== */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">

            <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[420px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
                className="object-cover"
              />
            </div>

          </div>
        </div>

        {/* Bottom spacing */}
        <div className="pb-12" />
      </section>

      {/* =====================================================
          ARTICLE BODY
      ===================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          {/* Excerpt */}
          <div className="mb-10 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] px-6 py-5">
            <p className="text-[15px] font-medium leading-7 text-gray-700">
              {article.excerpt}
            </p>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}
          <article className="space-y-1">

            {paragraphs.map((paragraph, index) => {

              const isHeading =
                paragraph.length < 90 &&
                !paragraph.endsWith(".") &&
                !paragraph.startsWith("•");

              {/* Heading */}
              if (isHeading) {
                return (
                  <h2
                    key={index}
                    className="!mt-10 !mb-3 flex items-start gap-3 text-[18px] font-bold leading-snug text-gray-900"
                  >
                    <span className="mt-1 flex-shrink-0 w-[3px] h-5 rounded-full bg-[#0055A5]" />

                    {paragraph}
                  </h2>
                );
              }

              {/* Bullet list */}
              if (paragraph.startsWith("•")) {

                const items = paragraph
                  .split("\n")
                  .map((item) =>
                    item.replace(/^•\s*/, "").trim()
                  )
                  .filter(Boolean);

                return (
                  <ul
                    key={index}
                    className="!my-5 space-y-2 pl-1"
                  >
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-[15px] leading-7 text-gray-600"
                      >
                        <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#0055A5] flex-shrink-0" />

                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              {/* Paragraph */}
              return (
                <p
                  key={index}
                  className="!mb-5 text-[15px] leading-8 text-gray-600"
                >
                  {paragraph}
                </p>
              );
            })}

          </article>

          {/* =================================================
              CTA CARD
          ================================================= */}
          <div className="mt-14 rounded-2xl border border-[#0055A5]/15 bg-[#0055A5]/[0.04] overflow-hidden">

            {/* Top line */}
            <div className="h-[3px] bg-[#0055A5]" />

            <div className="p-7 sm:p-8">

              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#0055A5]/60 mb-2">
                Garud Tata Motors · Authorised Dealer
              </p>

              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Explore Tata Cars Across Delhi-NCR
              </h2>

              <p className="mt-2 text-[14px] leading-6 text-gray-500">
                Visit your nearest showroom — Palam, Narela or Najafgarh —
                to compare models and book a test drive.
              </p>

              {/* =================================================
                  SHOWROOM PILLS
              ================================================= */}
              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  {
                    label: "Palam",
                    href: "/Tata-Motors-Palam",
                  },
                  {
                    label: "Narela",
                    href: "/Tata-Motors-Narela",
                  },
                  {
                    label: "Najafgarh",
                    href: "/Tata-Motors-Najafgarh",
                  },
                ].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#0055A5] hover:bg-[#0055A5]/[0.06] transition-colors"
                  >
                    <MapPin
                      size={10}
                      strokeWidth={2.5}
                    />

                    {s.label}

                    <ChevronRight
                      size={10}
                      strokeWidth={2.5}
                    />
                  </Link>
                ))}

              </div>

              {/* =================================================
                  ACTION BUTTONS
              ================================================= */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                {/* Sales */}
                <a
                  href="tel:+919217371211"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <Phone
                    size={14}
                    className="text-[#0055A5]"
                    strokeWidth={2.5}
                  />

                  <span>
                    <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1 font-bold">
                      Sales
                    </span>

                    +91 92173 71211
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919217371211?text=Hello%21%20I%20would%20like%20to%20enquire%20about%20a%20new%20Tata%20car%20at%20Garud%20Tata."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-2.5 text-[13px] font-semibold text-green-700 shadow-sm hover:bg-green-100 transition-colors"
                >
                  <MessageCircle
                    size={14}
                    strokeWidth={2.5}
                  />

                  WhatsApp
                </a>

                {/* Explore Cars */}
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0055A5] hover:bg-[#004488] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] transition-all"
                >
                  Explore Cars

                  <ArrowRight
                    size={14}
                    strokeWidth={2.5}
                  />
                </Link>

              </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}