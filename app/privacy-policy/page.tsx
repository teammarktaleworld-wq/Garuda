import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Garud Tata",
  description:
    "Read the Privacy Policy of Garud Tata to understand how we collect, use and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-700">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="bg-[#0b1f3a]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Garud Tata
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-300">
              Your privacy is important to us. This policy explains how
              Garud Tata collects, uses and protects your information when
              you use our website and services.
            </p>

            <p className="mt-4 text-sm text-gray-400">
              Last Updated: August 29, 2026
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          BREADCRUMB
      ========================================================= */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="font-medium text-gray-500 transition hover:text-blue-600"
            >
              Home
            </Link>

            <span className="text-gray-400">/</span>

            <span className="font-medium text-gray-800">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* =====================================================
              TABLE OF CONTENTS
          ===================================================== */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#0b1f3a]">
                On This Page
              </h2>

              <nav className="space-y-2 text-sm">
                <TableLink href="#information" text="1. Information We Collect" />
                <TableLink href="#automatic" text="2. Information Collected Automatically" />
                <TableLink href="#when" text="3. When We Collect Information" />
                <TableLink href="#usage" text="4. How We Use Your Information" />
                <TableLink href="#whatsapp" text="5. Phone & WhatsApp" />
                <TableLink href="#cookies" text="6. Cookies" />
                <TableLink href="#google" text="7. Google Analytics & Ads" />
                <TableLink href="#tracking" text="8. Conversion Tracking" />
                <TableLink href="#sharing" text="9. Sharing Information" />
                <TableLink href="#security" text="10. Data Security" />
                <TableLink href="#retention" text="11. Data Retention" />
                <TableLink href="#third-party" text="12. Third-Party Services" />
                <TableLink href="#links" text="13. Third-Party Links" />
                <TableLink href="#children" text="14. Children's Privacy" />
                <TableLink href="#rights" text="15. Your Privacy Choices" />
                <TableLink href="#changes" text="16. Policy Changes" />
                <TableLink href="#contact" text="17. Contact Us" />
              </nav>
            </div>
          </aside>

          {/* =====================================================
              POLICY CONTENT
          ===================================================== */}
          <article className="max-w-4xl">
            {/* INTRODUCTION */}
            <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-[15px] leading-7 text-gray-700">
                At <strong>Garud Tata</strong>, we respect your privacy and
                are committed to protecting the personal information you
                provide when using our website. This Privacy Policy explains
                how we collect, use, store and protect information when you
                visit our website, submit an enquiry, contact us by phone or
                WhatsApp, or interact with our services.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-gray-700">
                By using our website, you acknowledge that you have read and
                understood this Privacy Policy.
              </p>
            </div>

            {/* SECTION 1 */}
            <PolicySection
              id="information"
              number="1"
              title="Information We Collect"
            >
              <p>
                When you interact with our website or submit an enquiry, we
                may collect information such as:
              </p>

              <BulletList
                items={[
                  "Your name",
                  "Mobile or phone number",
                  "Email address",

                  "City, location or preferred showroom",
                  "Vehicle or model you are interested in",
                  "Information submitted through enquiry forms",
                  "Test-drive or callback requirements",
                  "Any other information you voluntarily provide to us",
                ]}
              />
            </PolicySection>

            {/* SECTION 2 */}
            <PolicySection
              id="automatic"
              number="2"
              title="Information Collected Automatically"
            >
              <p>
                When you visit our website, certain technical information may
                be collected automatically. This information may include:
              </p>

              <BulletList
                items={[
                  "IP address",
                  "Browser type and version",
                  "Device type",
                  "Operating system",
                  "Pages visited",
                  "Website interaction information",
                  "Referring website or advertising source",
                  "Date and time of your visit",
                ]}
              />

              <p className="mt-5">
                This information helps us understand how visitors use our
                website and improve website performance and user experience.
              </p>
            </PolicySection>

            {/* SECTION 3 */}
            <PolicySection
              id="when"
              number="3"
              title="When Do We Collect Information?"
            >
              <p>We may collect information when you:</p>

              <BulletList
                items={[
                  "Fill out an enquiry form",
                  "Request a callback",
                  "Request information about a vehicle",
                  "Request a test drive",
                  "Contact us by phone",
                  "Contact us through WhatsApp",
                  "Visit or interact with our website",
                  "Interact with our online advertisements",
                  "Submit information through other communication channels provided on our website",
                ]}
              />
            </PolicySection>

            {/* SECTION 4 */}
            <PolicySection
              id="usage"
              number="4"
              title="How Do We Use Your Information?"
            >
              <p>
                We may use the information collected from you for purposes
                including:
              </p>

              <BulletList
                items={[
                  "Responding to your enquiries",
                  "Contacting you regarding your vehicle enquiry",
                  "Providing information about Tata Motors vehicles and services",
                  "Arranging a test drive",
                  "Arranging a callback",
                  "Providing vehicle quotations or offers",
                  "Helping you connect with the relevant showroom or sales representative",
                  "Responding to customer-service requests",
                  "Improving our website and services",
                  "Understanding website usage and visitor behaviour",
                  "Measuring the performance of our advertising campaigns",
                  "Preventing fraud, misuse or security issues",
                  "Complying with applicable laws and regulations",
                ]}
              />

              <p className="mt-5">
                We do not use your personal information for purposes unrelated
                to your enquiry unless permitted by applicable law or with
                your consent where required.
              </p>
            </PolicySection>

            {/* SECTION 5 */}
            <PolicySection
              id="whatsapp"
              number="5"
              title="Phone Calls and WhatsApp"
            >
              <p>
                Our website may provide options to contact us through
                telephone calls and WhatsApp.
              </p>

              <p className="mt-5">
                If you choose to contact us through these channels,
                information you provide may be used to respond to your
                enquiry and provide information about vehicles, offers,
                test drives, services or showroom-related assistance.
              </p>

              <p className="mt-5">
                Third-party communication services such as WhatsApp may
                process information according to their own terms and privacy
                policies.
              </p>
            </PolicySection>

            {/* SECTION 6 */}
            <PolicySection
              id="cookies"
              number="6"
              title="Cookies and Similar Technologies"
            >
              <p>
                Our website may use cookies and similar technologies to:
              </p>

              <BulletList
                items={[
                  "Maintain website functionality",
                  "Understand how visitors use our website",
                  "Improve website performance",
                  "Measure advertising effectiveness",
                  "Understand conversions and enquiries generated through advertisements",
                ]}
              />

              <p className="mt-5">
                You may control or disable cookies through your browser
                settings. However, disabling certain cookies may affect some
                website functionality.
              </p>
            </PolicySection>

            {/* SECTION 7 */}
            <PolicySection
              id="google"
              number="7"
              title="Google Analytics and Google Ads"
            >
              <p>
                We may use Google Analytics, Google Ads and related Google
                technologies to understand website traffic, measure
                advertising performance and track actions such as enquiries,
                calls or other conversions.
              </p>

              <p className="mt-5">
                These technologies may use cookies, advertising identifiers
                or similar technologies to measure interactions with our
                website and advertising campaigns.
              </p>

              <p className="mt-5">
                The information collected may include website visits, pages
                viewed, interactions and conversion-related information.
              </p>

              <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm leading-6 text-gray-600">
                  <strong className="text-gray-800">Important:</strong>{" "}
                  Garud Tata does not use Google AdSense advertising on this
                  website unless specifically stated otherwise.
                </p>
              </div>
            </PolicySection>

            {/* SECTION 8 */}
            <PolicySection
              id="tracking"
              number="8"
              title="Advertising and Conversion Tracking"
            >
              <p>
                We may use conversion tracking technologies to understand
                whether visitors who arrive through online advertisements
                complete actions such as:
              </p>

              <BulletList
                items={[
                  "Submitting an enquiry form",
                  "Clicking a WhatsApp button",
                  "Clicking a phone or call button",
                  "Requesting a callback",
                  "Requesting a test drive",
                ]}
              />

              <p className="mt-5">
                This information helps us understand the effectiveness of our
                advertising campaigns and improve our marketing activities.
              </p>
            </PolicySection>

            {/* SECTION 9 */}
            <PolicySection
              id="sharing"
              number="9"
              title="Sharing of Personal Information"
            >
              <p>
                We do not sell or rent your personal information.
              </p>

              <p className="mt-5">
                We may share relevant information with authorized personnel,
                dealership representatives, service providers or technology
                providers where reasonably necessary to:
              </p>

              <BulletList
                items={[
                  "Respond to your enquiry",
                  "Provide requested services",
                  "Process or manage your enquiry",
                  "Arrange a test drive or callback",
                  "Operate and maintain our website",
                  "Analyze website and advertising performance",
                  "Meet legal or regulatory requirements",
                ]}
              />

              <p className="mt-5">
                We may also disclose information where required by law or
                where necessary to protect our legal rights, customers,
                website or business.
              </p>
            </PolicySection>

            {/* SECTION 10 */}
            <PolicySection
              id="security"
              number="10"
              title="How Do We Protect Your Information?"
            >
              <p>
                We take reasonable technical and organizational measures to
                protect the information collected through our website against
                unauthorized access, misuse, alteration, disclosure or
                destruction.
              </p>

              <p className="mt-5">
                Our website may use HTTPS/SSL encryption to help protect
                information transmitted between your browser and our website.
              </p>

              <p className="mt-5">
                However, no method of transmission or electronic storage is
                completely secure, and we cannot guarantee absolute security.
              </p>
            </PolicySection>

            {/* SECTION 11 */}
            <PolicySection
              id="retention"
              number="11"
              title="Data Retention"
            >
              <p>
                We retain personal information only for as long as reasonably
                necessary for the purposes described in this Privacy Policy,
                including responding to enquiries, maintaining business
                records, resolving disputes and complying with applicable
                legal requirements.
              </p>

              <p className="mt-5">
                The retention period may vary depending on the type and
                purpose of the information.
              </p>
            </PolicySection>

            {/* SECTION 12 */}
            <PolicySection
              id="third-party"
              number="12"
              title="Third-Party Services"
            >
              <p>
                Our website may use third-party services for analytics,
                advertising, communication, hosting, website functionality
                and other business purposes.
              </p>

              <p className="mt-5">
                These third-party providers may process information according
                to their own privacy policies and terms.
              </p>

              <p className="mt-5">
                Examples may include services such as Google Analytics, Google
                Ads and WhatsApp.
              </p>

              <p className="mt-5">
                We recommend reviewing the privacy policies of third-party
                services that you choose to use.
              </p>
            </PolicySection>

            {/* SECTION 13 */}
            <PolicySection
              id="links"
              number="13"
              title="Third-Party Links"
            >
              <p>
                Our website may contain links to third-party websites or
                services.
              </p>

              <p className="mt-5">
                We are not responsible for the privacy practices, security or
                content of third-party websites.
              </p>

              <p className="mt-5">
                We recommend reviewing the privacy policy of any third-party
                website before providing personal information.
              </p>
            </PolicySection>

            {/* SECTION 14 */}
            <PolicySection
              id="children"
              number="14"
              title="Children's Privacy"
            >
              <p>
                Our website is not specifically directed toward children.
              </p>

              <p className="mt-5">
                We do not knowingly collect personal information from children
                for purposes unrelated to providing our services.
              </p>

              <p className="mt-5">
                If you believe that a child has provided personal information
                to us, please contact us so that appropriate action can be
                taken.
              </p>
            </PolicySection>

            {/* SECTION 15 */}
            <PolicySection
              id="rights"
              number="15"
              title="Your Privacy Choices"
            >
              <p>
                You may contact us regarding your personal information if you:
              </p>

              <BulletList
                items={[
                  "Believe information we hold about you is inaccurate",
                  "Want to request correction of your information",
                  "Have questions about how your information is being used",
                  "Want to raise a privacy-related concern",
                ]}
              />

              <p className="mt-5">
                Where applicable, we will handle such requests in accordance
                with applicable law.
              </p>
            </PolicySection>

            {/* SECTION 16 */}
            <PolicySection
              id="changes"
              number="16"
              title="Changes to This Privacy Policy"
            >
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our website, services, technology or applicable
                legal requirements.
              </p>

              <p className="mt-5">
                Any updated Privacy Policy will be published on this page with
                a revised <strong>Last Updated</strong> date.
              </p>
            </PolicySection>

            {/* SECTION 17 */}
            <PolicySection
              id="contact"
              number="17"
              title="Contact Us"
            >
              <p>
                If you have questions, concerns or requests regarding this
                Privacy Policy or the handling of your personal information,
                please contact us.
              </p>

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-lg font-bold text-[#0b1f3a]">
                  Garud Tata
                </h3>

                <div className="mt-4 space-y-3 text-sm">
                  <p>
                    <span className="font-semibold text-gray-900">
                      Sales:
                    </span>{" "}
                    <a
                      href="tel:9217371205"
                      className="text-blue-600 hover:underline"
                    >
                      +91 92173 71211
                    </a>
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Email:
                    </span>{" "}
                    <span className="text-gray-600">
                    garudtatadigital@gmail.com
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-gray-900">
                      Website:
                    </span>{" "}
                    <span className="text-gray-600">
                      Garud Tata
                    </span>
                  </p>
                </div>
              </div>
            </PolicySection>

            {/* =====================================================
                FINAL NOTE
            ===================================================== */}
            <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm leading-6 text-gray-500">
                This Privacy Policy is intended to describe our general
                practices regarding the collection and use of information
                through this website. Please ensure that the final policy
                reflects the actual data-processing practices of Garud Tata
                and any applicable legal requirements.
              </p>
            </div>

            {/* BACK HOME */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-[#0b1f3a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#15365f]"
              >
                ← Back to Home
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* ===============================================================
   POLICY SECTION COMPONENT
=============================================================== */

function PolicySection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 border-b border-gray-200 pb-10 mb-10 last:border-b-0"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b1f3a] text-sm font-bold text-white">
          {number}
        </span>

        <h2 className="pt-0.5 text-2xl font-bold leading-8 text-[#0b1f3a]">
          {title}
        </h2>
      </div>

      <div className="text-[15px] leading-7 text-gray-600">
        {children}
      </div>
    </section>
  );
}

/* ===============================================================
   BULLET LIST
=============================================================== */

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 pl-6">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="relative pl-1 before:absolute before:-left-5 before:top-[13px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#0b1f3a]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ===============================================================
   TABLE OF CONTENTS LINK
=============================================================== */

function TableLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="block rounded-md px-2 py-1.5 text-gray-600 transition hover:bg-white hover:text-blue-600"
    >
      {text}
    </a>
  );
}