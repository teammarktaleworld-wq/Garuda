


// app/components/landing-page-comp/landingpagecontact.tsx

"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Bike,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

import {
  trackEnquirySubmit,
  trackTestDriveSubmit,
} from "@/lib/tracking";

/* ══════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════ */

const CARS = [
  "Tata Sierra",
  "Tata Sierra EV",
  "Tata Harrier",
  "Tata Safari",
  "Tata Curvv",
  "Tata Curvv EV",
  "Tata Nexon",
  "Tata Nexon EV",
  "Tata Punch",
  "Tata Punch EV",
  "Tata Altroz",
  "Tata Tiago",
  "Tata Tiago EV",
  "Tata Tigor",
] as const;

const OUTLETS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
] as const;

/* ══════════════════════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════════════════════ */

const fieldCls =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-[14px] " +
  "placeholder:text-gray-350 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " +
  "transition-all duration-150 appearance-none";

/* ══════════════════════════════════════════════════════
   VALIDATION
══════════════════════════════════════════════════════ */

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/* ══════════════════════════════════════════════════════
   SELECT
══════════════════════════════════════════════════════ */

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} pr-10 ${
          !value ? "text-gray-400" : "text-gray-900"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ERROR MESSAGE
══════════════════════════════════════════════════════ */

function ErrorMsg({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-1.5 text-red-500 text-[12.5px]">
      <AlertCircle size={13} className="flex-shrink-0" />
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════
   SUBMIT BUTTON
══════════════════════════════════════════════════════ */

function SubmitBtn({
  loading,
  label,
}: {
  loading: boolean;
  label: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13.5px] transition-colors duration-150 group shadow-sm"
    >
      {loading ? (
        <Loader2 size={17} className="animate-spin" />
      ) : (
        <>
          {label}

          <ArrowRight
            size={15}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </>
      )}
    </button>
  );
}

/* ══════════════════════════════════════════════════════
   CAR ENQUIRY FORM
══════════════════════════════════════════════════════ */

function CarEnquiryForm() {
  const router = useRouter();

  const init = {
    name: "",
    mobile: "",
    email: "",
    model: "",
    outlet: "",
  };

  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) return;

      setError("");

      /* ────────────────────────────────────────────────
         VALIDATION
      ───────────────────────────────────────────────── */

      if (!form.name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (form.mobile.replace(/\D/g, "").length < 10) {
        setError("Please enter a valid mobile number.");
        return;
      }

      if (
        form.email.trim() &&
        !isValidEmail(form.email)
      ) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!form.model) {
        setError("Please select a model.");
        return;
      }

      if (!form.outlet) {
        setError("Please select an outlet.");
        return;
      }

      setLoading(true);

      try {
        /* ──────────────────────────────────────────────
           SUBMIT TO BACKEND
        ────────────────────────────────────────────── */

        const res = await fetch("/api/contact/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            data?.error ?? "Submission failed."
          );
        }

        /* ──────────────────────────────────────────────
           GOOGLE ANALYTICS / GTM

           IMPORTANT:
           Track ONLY after backend success.
        ────────────────────────────────────────────── */

        trackEnquirySubmit(form.model);

        /* ──────────────────────────────────────────────
           REDIRECT TO ENQUIRY THANK-YOU PAGE

           IMPORTANT:
           type=enquiry
           NOT type=testdrive
        ────────────────────────────────────────────── */

        router.push(
          `/landing-page/thank-you?type=enquiry&model=${encodeURIComponent(
            form.model
          )}&outlet=${encodeURIComponent(form.outlet)}`
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );

        setLoading(false);
      }
    },
    [form, loading, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3.5"
    >
      {/* NAME + MOBILE */}

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Name *
          </label>

          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) =>
              set("name")(e.target.value)
            }
            placeholder="Your full name"
            className={fieldCls}
          />
        </div>

        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Mobile *
          </label>

          <input
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            value={form.mobile}
            onChange={(e) =>
              set("mobile")(e.target.value)
            }
            placeholder="+91 00000 00000"
            className={fieldCls}
          />
        </div>
      </div>

      {/* EMAIL */}

      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
          Email{" "}
          <span className="text-gray-400 font-normal">
            (optional)
          </span>
        </label>

        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) =>
            set("email")(e.target.value)
          }
          placeholder="you@example.com"
          className={fieldCls}
        />
      </div>

      {/* MODEL + OUTLET */}

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Model *
          </label>

          <Select
            value={form.model}
            onChange={set("model")}
            options={CARS}
            placeholder="Select model"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Outlet *
          </label>

          <Select
            value={form.outlet}
            onChange={set("outlet")}
            options={OUTLETS}
            placeholder="Select outlet"
          />
        </div>
      </div>

      {/* ERROR */}

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* SUBMIT */}

      <SubmitBtn
        loading={loading}
        label="Send Enquiry"
      />
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   TEST DRIVE FORM
══════════════════════════════════════════════════════ */

function TestDriveForm() {
  const router = useRouter();

  const init = {
    name: "",
    mobile: "",
    email: "",
    model: "",
    outlet: "",
    date: "",
  };

  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  /* ────────────────────────────────────────────────
     MINIMUM DATE = TOMORROW
  ───────────────────────────────────────────────── */

  const minDate = (() => {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  })();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (loading) return;

      setError("");

      /* ──────────────────────────────────────────────
         VALIDATION
      ────────────────────────────────────────────── */

      if (!form.name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (form.mobile.replace(/\D/g, "").length < 10) {
        setError("Please enter a valid mobile number.");
        return;
      }

      if (
        form.email.trim() &&
        !isValidEmail(form.email)
      ) {
        setError("Please enter a valid email address.");
        return;
      }

      if (!form.model) {
        setError("Please select a model.");
        return;
      }

      if (!form.outlet) {
        setError("Please select an outlet.");
        return;
      }

      setLoading(true);

      try {
        /* ──────────────────────────────────────────────
           SUBMIT TO BACKEND
        ────────────────────────────────────────────── */

        const res = await fetch(
          "/api/contact/testdrive",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(
            data?.error ?? "Submission failed."
          );
        }

        /* ──────────────────────────────────────────────
           GOOGLE ANALYTICS / GTM

           IMPORTANT:
           Track ONLY after backend success.
        ────────────────────────────────────────────── */

        trackTestDriveSubmit(form.model);

        /* ──────────────────────────────────────────────
           REDIRECT TO TEST DRIVE THANK-YOU PAGE
        ────────────────────────────────────────────── */

        router.push(
          `/landing-page/thank-you?type=testdrive&model=${encodeURIComponent(
            form.model
          )}&outlet=${encodeURIComponent(form.outlet)}`
        );
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );

        setLoading(false);
      }
    },
    [form, loading, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-3.5"
    >
      {/* NAME + MOBILE */}

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Name *
          </label>

          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) =>
              set("name")(e.target.value)
            }
            placeholder="Your full name"
            className={fieldCls}
          />
        </div>

        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Mobile *
          </label>

          <input
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            value={form.mobile}
            onChange={(e) =>
              set("mobile")(e.target.value)
            }
            placeholder="+91 00000 00000"
            className={fieldCls}
          />
        </div>
      </div>

      {/* EMAIL */}

      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
          Email{" "}
          <span className="text-gray-400 font-normal">
            (optional)
          </span>
        </label>

        <input
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) =>
            set("email")(e.target.value)
          }
          placeholder="you@example.com"
          className={fieldCls}
        />
      </div>

      {/* MODEL + OUTLET */}

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Model *
          </label>

          <Select
            value={form.model}
            onChange={set("model")}
            options={CARS}
            placeholder="Select model"
          />
        </div>

        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
            Outlet *
          </label>

          <Select
            value={form.outlet}
            onChange={set("outlet")}
            options={OUTLETS}
            placeholder="Select outlet"
          />
        </div>
      </div>

      {/* PREFERRED DATE */}

      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
          Preferred Date
        </label>

        <input
          type="date"
          min={minDate}
          value={form.date}
          onChange={(e) =>
            set("date")(e.target.value)
          }
          className={fieldCls}
        />
      </div>

      {/* ERROR */}

      {error && <ErrorMsg>{error}</ErrorMsg>}

      {/* SUBMIT */}

      <SubmitBtn
        loading={loading}
        label="Book Test Drive"
      />
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */

type TabId = "enquiry" | "testdrive";

const TABS: {
  id: TabId;
  label: string;
  icon: typeof Car;
}[] = [
  {
    id: "enquiry",
    label: "Car Enquiry",
    icon: Car,
  },
  {
    id: "testdrive",
    label: "Test Drive",
    icon: Bike,
  },
];

export default function Contact() {
  const [activeTab, setActiveTab] =
    useState<TabId>("enquiry");

  return (
    <section
      id="contact"
      className="scroll-mt-20 lg:scroll-mt-24 bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* ═══════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════ */}

        <div className="text-center mb-8">
          <h2 className="text-gray-900 font-extrabold text-[clamp(1.7rem,5vw,2.5rem)] tracking-tight mb-2">
            Get in touch
          </h2>

          <p className="text-gray-500 text-[14px] leading-relaxed">
            Enquire about a new car or book a test drive
            at your nearest outlet.
          </p>
        </div>

        {/* ═══════════════════════════════════════════
            CARD
        ═══════════════════════════════════════════ */}

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* ═════════════════════════════════════════
              TABS
          ═════════════════════════════════════════ */}

          <div className="flex border-b border-gray-100">
            {TABS.map((tab) => {
              const active =
                activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id)
                  }
                  className={`relative flex items-center gap-2 px-6 py-4 text-[13px] font-semibold flex-1 justify-center transition-colors duration-150 ${
                    active
                      ? "text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <tab.icon
                    size={14}
                    strokeWidth={2.2}
                  />

                  {tab.label}

                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ═════════════════════════════════════════
              FORM
          ═════════════════════════════════════════ */}

          <div className="p-5 sm:p-7">
            {activeTab === "enquiry" && (
              <CarEnquiryForm />
            )}

            {activeTab === "testdrive" && (
              <TestDriveForm />
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            FOOTER TEXT
        ═══════════════════════════════════════════ */}

        <p className="text-center text-gray-400 text-[11.5px] mt-4">
          We respond within 24 hours · Mon–Sun, 10 AM – 7 PM
        </p>
      </div>
    </section>
  );
}