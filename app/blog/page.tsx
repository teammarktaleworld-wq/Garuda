// // app/pr-blog/page.tsx
// import type { Metadata } from "next";
// import PRBlog from "@/app/components/PRBlog";

// export const metadata: Metadata = {
//   title: "PR & Blog | Garud Tata Motors",
//   description:
//     "Latest news, PR updates, vehicle launches and automotive insights from Garud Tata Motors — authorised Tata Motors dealer across Delhi-NCR.",
//   alternates: {
//     canonical: "/pr-blog",
//   },
// };

// export default function PRBlogPage() {
//   return (
//     <main className="min-h-screen bg-white pt-20">
//       <PRBlog />
//     </main>
//   );
// }






import type { Metadata } from "next";

import PRBlog from "@/app/components/PRBlog";

export const metadata: Metadata = {
  title: "Blog | Garud Tata Motors",
  description:
    "Latest news, PR updates, Tata car launches, festive-season updates and automotive insights from Garud Tata Motors — authorised Tata Motors dealer across Delhi-NCR.",
  alternates: {
    canonical: "/blog",
  },
};

export default function PRBlogPage() {
  return (
    <main className="min-h-screen bg-white pt-[76px]">
      {/* Page header */}
      <div className="border-b border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0055A5]/60">
            Garud Tata Motors · Authorised Tata Dealer
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Blog
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            News, updates and insights from our showrooms across Delhi-NCR.
          </p>
        </div>
      </div>

      <PRBlog />
    </main>
  );
}